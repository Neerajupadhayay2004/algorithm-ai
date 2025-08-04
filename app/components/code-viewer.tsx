"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Download, Maximize2, Minimize2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeViewerProps {
  code: string
  language: string
  filename: string
  title?: string
}

export default function CodeViewer({ code, language, filename, title }: CodeViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { toast } = useToast()

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard",
    })
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Code Downloaded",
      description: `File ${filename} has been downloaded`,
    })
  }

  const getSyntaxHighlighting = (code: string, lang: string) => {
    // Simple syntax highlighting for demo purposes
    // In production, you'd use a proper syntax highlighter like Prism.js or highlight.js

    const keywords = {
      javascript: [
        "function",
        "const",
        "let",
        "var",
        "if",
        "else",
        "for",
        "while",
        "return",
        "class",
        "import",
        "export",
      ],
      python: ["def", "class", "if", "else", "elif", "for", "while", "return", "import", "from", "as", "try", "except"],
      java: [
        "public",
        "private",
        "static",
        "class",
        "interface",
        "if",
        "else",
        "for",
        "while",
        "return",
        "import",
        "package",
      ],
      cpp: ["#include", "class", "public", "private", "if", "else", "for", "while", "return", "namespace", "using"],
    }

    let highlightedCode = code
    const langKeywords = keywords[lang as keyof typeof keywords] || []

    // Highlight keywords
    langKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g")
      highlightedCode = highlightedCode.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`)
    })

    // Highlight strings
    highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
    highlightedCode = highlightedCode.replace(/'([^']*)'/g, "<span class=\"text-green-400\">'$1'</span>")

    // Highlight comments
    if (lang === "javascript" || lang === "java" || lang === "cpp") {
      highlightedCode = highlightedCode.replace(/\/\/(.*)$/gm, '<span class="text-gray-500 italic">//$1</span>')
      highlightedCode = highlightedCode.replace(
        /\/\*([\s\S]*?)\*\//g,
        '<span class="text-gray-500 italic">/*$1*/</span>',
      )
    } else if (lang === "python") {
      highlightedCode = highlightedCode.replace(/#(.*)$/gm, '<span class="text-gray-500 italic">#$1</span>')
    }

    // Highlight numbers
    highlightedCode = highlightedCode.replace(/\b\d+\b/g, '<span class="text-cyan-400">$&</span>')

    return highlightedCode
  }

  return (
    <div
      className={`bg-slate-900/90 rounded-lg border border-white/20 overflow-hidden ${isFullscreen ? "fixed inset-4 z-50" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-slate-800/50 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-400 ml-4">{filename}</span>
          {title && <span className="text-sm text-purple-400">• {title}</span>}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={copyCode}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={downloadCode}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className={`overflow-auto ${isFullscreen ? "h-[calc(100vh-120px)]" : "max-h-[60vh]"}`}>
        <pre className="p-4 text-sm">
          <code
            className="text-white whitespace-pre-wrap font-mono leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: getSyntaxHighlighting(code, language),
            }}
          />
        </pre>
      </div>

      {/* Line numbers (optional) */}
      <div className="absolute left-0 top-12 bottom-0 w-12 bg-slate-800/30 border-r border-white/10 hidden lg:block">
        <div className="p-4 text-xs text-gray-500 font-mono">
          {code.split("\n").map((_, index) => (
            <div key={index} className="leading-relaxed">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
