"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Zap, Code, Copy, Download, RefreshCw } from "lucide-react"
import CodeEditor from "./code-editor"

interface AIGeneratedSolution {
  code: string
  explanation: string
  complexity: {
    time: string
    space: string
  }
  optimizations: string[]
  alternativeApproaches: string[]
}

export default function AICodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSolution, setGeneratedSolution] = useState<AIGeneratedSolution | null>(null)

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI processing with realistic steps
    const steps = [
      "🧠 Analyzing problem requirements...",
      "📊 Identifying optimal data structures...",
      "⚡ Generating algorithm logic...",
      "🔍 Optimizing for performance...",
      "✨ Adding code documentation...",
      "🎯 Finalizing solution...",
    ]

    for (const step of steps) {
      console.log(step)
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    // Generate mock solution based on prompt analysis
    const mockSolution: AIGeneratedSolution = {
      code: generateMockCode(prompt, selectedLanguage),
      explanation: `This solution uses an efficient approach to solve the problem. The algorithm leverages ${getDominantDataStructure(prompt)} for optimal performance. The implementation follows best practices for ${selectedLanguage} and includes proper error handling.`,
      complexity: {
        time: getTimeComplexity(prompt),
        space: getSpaceComplexity(prompt),
      },
      optimizations: [
        "Early termination conditions added",
        "Memory usage optimized with in-place operations",
        "Cache-friendly data access patterns implemented",
      ],
      alternativeApproaches: [
        "Recursive approach with memoization",
        "Iterative solution with two-pointer technique",
        "Divide and conquer implementation",
      ],
    }

    setGeneratedSolution(mockSolution)
    setIsGenerating(false)
  }

  const generateMockCode = (prompt: string, language: string): string => {
    const templates = {
      javascript: `// AI-Generated Solution
// Problem: ${prompt.slice(0, 50)}...
// Language: JavaScript
// Difficulty: ${difficulty}

function solveProblem(input) {
    // Input validation
    if (!input || input.length === 0) {
        return null;
    }
    
    // Initialize variables
    let result = [];
    let visited = new Set();
    
    // Main algorithm logic
    for (let i = 0; i < input.length; i++) {
        if (!visited.has(input[i])) {
            // Process element
            result.push(processElement(input[i]));
            visited.add(input[i]);
        }
    }
    
    return result;
}

function processElement(element) {
    // Element processing logic
    return element * 2; // Example transformation
}

// Test the solution
const testInput = [1, 2, 3, 4, 5];
console.log(solveProblem(testInput));`,

      python: `# AI-Generated Solution
# Problem: ${prompt.slice(0, 50)}...
# Language: Python
# Difficulty: ${difficulty}

def solve_problem(input_data):
    """
    Solves the given problem using an optimized approach.
    
    Args:
        input_data: The input data to process
        
    Returns:
        The solution result
    """
    # Input validation
    if not input_data:
        return None
    
    # Initialize variables
    result = []
    visited = set()
    
    # Main algorithm logic
    for item in input_data:
        if item not in visited:
            # Process element
            result.append(process_element(item))
            visited.add(item)
    
    return result

def process_element(element):
    """Process individual element."""
    return element * 2  # Example transformation

# Test the solution
if __name__ == "__main__":
    test_input = [1, 2, 3, 4, 5]
    print(solve_problem(test_input))`,

      java: `// AI-Generated Solution
// Problem: ${prompt.slice(0, 50)}...
// Language: Java
// Difficulty: ${difficulty}

import java.util.*;

public class Solution {
    public List<Integer> solveProblem(int[] input) {
        // Input validation
        if (input == null || input.length == 0) {
            return new ArrayList<>();
        }
        
        // Initialize variables
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        
        // Main algorithm logic
        for (int item : input) {
            if (!visited.contains(item)) {
                // Process element
                result.add(processElement(item));
                visited.add(item);
            }
        }
        
        return result;
    }
    
    private int processElement(int element) {
        // Element processing logic
        return element * 2; // Example transformation
    }
    
    // Test the solution
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] testInput = {1, 2, 3, 4, 5};
        System.out.println(solution.solveProblem(testInput));
    }
}`,
    }

    return templates[language as keyof typeof templates] || templates.javascript
  }

  const getDominantDataStructure = (prompt: string): string => {
    const lower = prompt.toLowerCase()
    if (lower.includes("sort") || lower.includes("order")) return "arrays and comparison operations"
    if (lower.includes("array") || lower.includes("list")) return "arrays and comparison operations"
    if (lower.includes("graph") || lower.includes("tree") || lower.includes("node"))
      return "graph data structures and traversal algorithms"
    if (lower.includes("hash") || lower.includes("map") || lower.includes("dictionary"))
      return "hash tables and mapping structures"
    if (lower.includes("stack") || lower.includes("queue") || lower.includes("heap"))
      return "specialized data structures"
    if (lower.includes("string") || lower.includes("pattern") || lower.includes("text"))
      return "string processing algorithms"
    if (lower.includes("dynamic") || lower.includes("memo") || lower.includes("dp"))
      return "dynamic programming techniques"
    return "optimized algorithmic approaches"
  }

  const getTimeComplexity = (prompt: string): string => {
    const lower = prompt.toLowerCase()
    if (lower.includes("sort")) return "O(n log n)"
    if (lower.includes("search") && lower.includes("binary")) return "O(log n)"
    if (lower.includes("nested") || lower.includes("matrix")) return "O(n²)"
    if (lower.includes("recursive") || lower.includes("tree")) return "O(n)"
    if (lower.includes("graph") || lower.includes("bfs") || lower.includes("dfs")) return "O(V + E)"
    return "O(n)"
  }

  const getSpaceComplexity = (prompt: string): string => {
    const lower = prompt.toLowerCase()
    if (lower.includes("in-place") || lower.includes("constant")) return "O(1)"
    if (lower.includes("recursive") || lower.includes("stack")) return "O(n)"
    if (lower.includes("hash") || lower.includes("map")) return "O(n)"
    if (lower.includes("matrix") || lower.includes("2d")) return "O(n²)"
    return "O(n)"
  }

  const copyCode = () => {
    if (generatedSolution) {
      navigator.clipboard.writeText(generatedSolution.code)
    }
  }

  const downloadCode = () => {
    if (generatedSolution) {
      const extension = selectedLanguage === "javascript" ? "js" : selectedLanguage === "python" ? "py" : "java"
      const blob = new Blob([generatedSolution.code], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-generated-solution.${extension}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const regenerateCode = () => {
    setGeneratedSolution(null)
    generateCode()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* AI Code Generator Header */}
      <Card className="bg-gradient-to-r from-black/60 via-purple-900/40 to-black/60 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 animate-pulse" />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-3xl font-bold">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
              className="mr-4"
            >
              <Brain className="h-8 w-8 text-purple-400" />
            </motion.div>
            AI Code Generator
          </CardTitle>
          <p className="text-gray-400 mt-2">
            Describe your problem and let AI generate optimized solutions with detailed explanations
          </p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-black/60 backdrop-blur-xl border-purple-500/30 shadow-xl shadow-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-400 text-xl flex items-center">
              <Sparkles className="h-6 w-6 mr-3" />
              Problem Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block text-gray-300">Describe your algorithm problem</label>
              <Textarea
                placeholder="Example: Find the longest palindromic substring in a given string. The solution should be efficient and handle edge cases like empty strings and single characters..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-black/50 border-purple-500/30 text-white placeholder-gray-400 min-h-32 backdrop-blur-xl focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-3 block text-gray-300">Programming Language</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white backdrop-blur-xl hover:border-purple-400 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-500/30 backdrop-blur-xl">
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block text-gray-300">Difficulty Level</label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="bg-black/50 border-purple-500/30 text-white backdrop-blur-xl hover:border-purple-400 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-500/30 backdrop-blur-xl">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={generateCode}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white border-0 py-4 text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500"
              >
                {isGenerating ? (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-3"
                    >
                      <Brain className="h-5 w-5" />
                    </motion.div>
                    Generating AI Solution...
                  </motion.div>
                ) : (
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 mr-3" />
                    Generate Code with AI
                  </div>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Generated Solution Section */}
        <Card className="bg-black/60 backdrop-blur-xl border-cyan-500/30 shadow-xl shadow-cyan-500/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-cyan-400 text-xl flex items-center">
                <Code className="h-6 w-6 mr-3" />
                Generated Solution
              </CardTitle>
              {generatedSolution && (
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
                    onClick={regenerateCode}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedSolution ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <CodeEditor language={selectedLanguage} value={generatedSolution.code} onChange={() => {}} />

                {/* Complexity Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                    <span className="text-sm text-gray-300">Time Complexity:</span>
                    <Badge variant="outline" className="border-green-400/50 text-green-400 bg-green-500/10 font-mono">
                      {generatedSolution.complexity.time}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <span className="text-sm text-gray-300">Space Complexity:</span>
                    <Badge variant="outline" className="border-blue-400/50 text-blue-400 bg-blue-500/10 font-mono">
                      {generatedSolution.complexity.space}
                    </Badge>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-400/30">
                  <h4 className="text-purple-400 font-semibold mb-2 flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Explanation
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{generatedSolution.explanation}</p>
                </div>

                {/* Optimizations */}
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-4 rounded-lg border border-orange-400/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Optimizations Applied</h4>
                  <ul className="space-y-1">
                    {generatedSolution.optimizations.map((opt, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <span className="text-orange-400 mr-2">•</span>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alternative Approaches */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-400/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Alternative Approaches</h4>
                  <ul className="space-y-1">
                    {generatedSolution.alternativeApproaches.map((approach, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <span className="text-cyan-400 mr-2">•</span>
                        {approach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Brain className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Ready to Generate</h3>
                <p className="text-gray-400 mb-4">
                  Describe your algorithm problem and let AI create an optimized solution
                </p>
                <p className="text-sm text-gray-500">
                  Include details like input format, expected output, and any constraints
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
