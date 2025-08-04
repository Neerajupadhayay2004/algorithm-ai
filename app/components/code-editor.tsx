"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Square,
  RotateCcw,
  Download,
  Maximize2,
  Minimize2,
  CheckCircle,
  XCircle,
  Clock,
  MemoryStickIcon as Memory,
  Target,
  Code2,
  Terminal,
  FileText,
  Lightbulb,
} from "lucide-react"
import { executeCode, runTestCases, validateAlgorithm } from "../actions/code-execution"
import { algorithmDatabase } from "../lib/algorithm-database"
import { useToast } from "@/hooks/use-toast"

interface CodeEditorProps {
  algorithmId?: number
  initialCode?: string
  initialLanguage?: string
  onCodeChange?: (code: string) => void
}

export default function CodeEditor({
  algorithmId,
  initialCode = "",
  initialLanguage = "javascript",
  onCodeChange,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState(initialLanguage)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<any>(null)
  const [testResults, setTestResults] = useState<any[]>([])
  const [customInput, setCustomInput] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [theme, setTheme] = useState("dark")
  const [showHints, setShowHints] = useState(false)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  const algorithm = algorithmId ? algorithmDatabase.find((a) => a.id === algorithmId) : null

  useEffect(() => {
    if (algorithm && algorithm.code[language]) {
      setCode(algorithm.code[language])
    }
  }, [algorithm, language])

  useEffect(() => {
    onCodeChange?.(code)
  }, [code, onCodeChange])

  const handleExecute = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to execute",
        variant: "destructive",
      })
      return
    }

    setIsExecuting(true)
    setExecutionResult(null)

    try {
      const result = await executeCode(code, language, customInput)
      setExecutionResult(result)

      if (result.success) {
        toast({
          title: "Execution Successful",
          description: `Code executed in ${result.executionTime}ms`,
        })
      } else {
        toast({
          title: "Execution Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "Failed to execute code",
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handleRunTests = async () => {
    if (!algorithm || !code.trim()) {
      toast({
        title: "Error",
        description: "Please select an algorithm and enter code",
        variant: "destructive",
      })
      return
    }

    setIsExecuting(true)
    setTestResults([])

    try {
      const testCases = algorithm.testCases.filter((tc) => !tc.hidden)
      const results = await runTestCases(code, language, testCases)
      setTestResults(results)

      const passedCount = results.filter((r) => r.passed).length
      toast({
        title: "Tests Completed",
        description: `${passedCount}/${results.length} tests passed`,
      })
    } catch (error) {
      toast({
        title: "Test Error",
        description: "Failed to run tests",
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const handleValidate = async () => {
    if (!algorithm || !code.trim()) {
      toast({
        title: "Error",
        description: "Please select an algorithm and enter code",
        variant: "destructive",
      })
      return
    }

    setIsValidating(true)
    setValidationResult(null)

    try {
      const result = await validateAlgorithm(algorithm.id, code, language)
      setValidationResult(result)

      if (result.isValid) {
        toast({
          title: "Validation Successful",
          description: `Score: ${result.score}% - Your solution is correct!`,
        })
      } else {
        toast({
          title: "Validation Failed",
          description: `Score: ${result.score}% - Keep improving!`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate solution",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleReset = () => {
    if (algorithm && algorithm.code[language]) {
      setCode(algorithm.code[language])
      setExecutionResult(null)
      setTestResults([])
      setValidationResult(null)
      toast({
        title: "Code Reset",
        description: "Code has been reset to the original implementation",
      })
    }
  }

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${algorithm?.name.replace(/\s+/g, "_") || "algorithm"}.${getFileExtension(language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Code Saved",
      description: "Code has been downloaded to your device",
    })
  }

  const getFileExtension = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return "js"
      case "python":
        return "py"
      case "java":
        return "java"
      case "cpp":
      case "c++":
        return "cpp"
      case "go":
        return "go"
      case "rust":
        return "rs"
      case "typescript":
        return "ts"
      default:
        return "txt"
    }
  }

  const getLanguageTemplate = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return `// JavaScript Algorithm Implementation
function algorithm(input) {
    // Your implementation here
    return result;
}

// Example usage
const input = [64, 34, 25, 12, 22, 11, 90];
console.log(algorithm(input));`
      case "python":
        return `# Python Algorithm Implementation
def algorithm(input_data):
    """
    Your implementation here
    """
    return result

# Example usage
if __name__ == "__main__":
    input_data = [64, 34, 25, 12, 22, 11, 90]
    print(algorithm(input_data))`
      case "java":
        return `// Java Algorithm Implementation
public class Algorithm {
    public static int[] algorithm(int[] input) {
        // Your implementation here
        return result;
    }
    
    public static void main(String[] args) {
        int[] input = {64, 34, 25, 12, 22, 11, 90};
        System.out.println(Arrays.toString(algorithm(input)));
    }
}`
      case "cpp":
        return `// C++ Algorithm Implementation
#include <iostream>
#include <vector>

std::vector<int> algorithm(std::vector<int> input) {
    // Your implementation here
    return result;
}

int main() {
    std::vector<int> input = {64, 34, 25, 12, 22, 11, 90};
    auto result = algorithm(input);
    
    for (int num : result) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`
      default:
        return "// Start coding here..."
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-slate-900" : ""}`}
    >
      <Card className="bg-slate-900/95 backdrop-blur-xl border-slate-700 h-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center text-cyan-400">
                <Code2 className="h-5 w-5 mr-2" />
                Code Editor
                {algorithm && (
                  <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-400/50">{algorithm.name}</Badge>
                )}
              </CardTitle>
              {algorithm && <p className="text-sm text-gray-400 mt-1">{algorithm.description}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800">
              <TabsTrigger value="editor" className="data-[state=active]:bg-slate-700">
                Editor
              </TabsTrigger>
              <TabsTrigger value="input" className="data-[state=active]:bg-slate-700">
                Input
              </TabsTrigger>
              <TabsTrigger value="output" className="data-[state=active]:bg-slate-700">
                Output
              </TabsTrigger>
              <TabsTrigger value="tests" className="data-[state=active]:bg-slate-700">
                Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              {/* Editor Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isExecuting ? <Square className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    {isExecuting ? "Running..." : "Run"}
                  </Button>

                  {algorithm && (
                    <>
                      <Button
                        size="sm"
                        onClick={handleRunTests}
                        disabled={isExecuting}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Test
                      </Button>

                      <Button
                        size="sm"
                        onClick={handleValidate}
                        disabled={isValidating}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {isValidating ? "Validating..." : "Validate"}
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSave}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Save
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowHints(!showHints)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Hints
                  </Button>
                </div>
              </div>

              {/* Hints Panel */}
              <AnimatePresence>
                {showHints && algorithm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
                  >
                    <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      Hints
                    </h4>
                    <ul className="text-sm text-yellow-300 space-y-1">
                      {algorithm.hints.map((hint, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Code Editor */}
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Enter your ${language} code here...`}
                  className={`font-mono bg-slate-800 border-slate-600 text-slate-100 min-h-[400px] resize-none`}
                  style={{ fontSize: `${fontSize}px` }}
                />

                {/* Line numbers could be added here */}
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(Number.parseInt(value))}>
                    <SelectTrigger className="w-16 h-8 bg-slate-700 border-slate-600 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="12">12px</SelectItem>
                      <SelectItem value="14">14px</SelectItem>
                      <SelectItem value="16">16px</SelectItem>
                      <SelectItem value="18">18px</SelectItem>
                      <SelectItem value="20">20px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCode(getLanguageTemplate(language))}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Template
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCode("")}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Clear
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="input" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Custom Input (JSON format)</label>
                <Textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter input data, e.g., [64, 34, 25, 12, 22, 11, 90] or [[1, 2, 3], 2]"
                  className="font-mono bg-slate-800 border-slate-600 text-slate-100 min-h-[200px]"
                />
              </div>

              {algorithm && (
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Example Inputs:</h4>
                  <div className="space-y-2">
                    {algorithm.examples.map((example, index) => (
                      <div key={index} className="bg-slate-800 p-3 rounded-lg">
                        <div className="text-xs text-slate-400 mb-1">Example {index + 1}:</div>
                        <code className="text-green-400 text-sm">{example.input}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setCustomInput(example.input)}
                          className="ml-2 text-xs text-slate-400 hover:text-slate-200"
                        >
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="output" className="space-y-4">
              {executionResult ? (
                <div className="space-y-4">
                  {/* Execution Status */}
                  <div
                    className={`p-4 rounded-lg border ${
                      executionResult.success
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {executionResult.success ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mr-2" />
                        )}
                        <span
                          className={`font-semibold ${executionResult.success ? "text-green-400" : "text-red-400"}`}
                        >
                          {executionResult.success ? "Execution Successful" : "Execution Failed"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {executionResult.executionTime}ms
                        </div>
                        {executionResult.memoryUsage && (
                          <div className="flex items-center">
                            <Memory className="h-4 w-4 mr-1" />
                            {executionResult.memoryUsage}KB
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Output */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center">
                      <Terminal className="h-4 w-4 mr-1" />
                      Output
                    </h4>
                    <pre className="bg-slate-800 p-4 rounded-lg text-sm text-slate-100 overflow-auto max-h-64">
                      {executionResult.output || "No output"}
                    </pre>
                  </div>

                  {/* Error */}
                  {executionResult.error && (
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-2">Error</h4>
                      <pre className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-sm text-red-300 overflow-auto max-h-64">
                        {executionResult.error}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Run your code to see the output here</p>
                </div>
              )}

              {/* Validation Results */}
              {validationResult && (
                <div className="mt-6 space-y-4">
                  <div
                    className={`p-4 rounded-lg border ${
                      validationResult.isValid
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-yellow-500/10 border-yellow-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">Validation Results</h4>
                      <Badge
                        className={`${
                          validationResult.isValid
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                        }`}
                      >
                        Score: {validationResult.score}%
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                        {validationResult.passedTests} passed
                      </div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-400 mr-1" />
                        {validationResult.totalTests - validationResult.passedTests} failed
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Feedback</h4>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      {validationResult.feedback.map((feedback: string, index: number) => (
                        <p key={index} className="text-sm text-slate-300 mb-1">
                          {feedback}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tests" className="space-y-4">
              {algorithm ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">Test Cases</h4>
                    <Button
                      size="sm"
                      onClick={handleRunTests}
                      disabled={isExecuting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Run All Tests
                    </Button>
                  </div>

                  {testResults.length > 0 && (
                    <div className="grid gap-4">
                      {testResults.map((result, index) => (
                        <Card
                          key={index}
                          className={`bg-slate-800 border ${
                            result.passed ? "border-green-500/30" : "border-red-500/30"
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                {result.passed ? (
                                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-400 mr-2" />
                                )}
                                <span className="font-medium text-white">Test Case {index + 1}</span>
                              </div>
                              <div className="flex items-center text-sm text-slate-400">
                                <Clock className="h-4 w-4 mr-1" />
                                {result.executionTime}ms
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-slate-400">Input: </span>
                                <code className="text-blue-300 bg-slate-900 px-2 py-1 rounded">{result.input}</code>
                              </div>
                              <div>
                                <span className="text-slate-400">Expected: </span>
                                <code className="text-green-300 bg-slate-900 px-2 py-1 rounded">{result.expected}</code>
                              </div>
                              <div>
                                <span className="text-slate-400">Actual: </span>
                                <code
                                  className={`${
                                    result.passed ? "text-green-300" : "text-red-300"
                                  } bg-slate-900 px-2 py-1 rounded`}
                                >
                                  {result.actual}
                                </code>
                              </div>
                              {result.error && (
                                <div>
                                  <span className="text-red-400">Error: </span>
                                  <code className="text-red-300 bg-slate-900 px-2 py-1 rounded">{result.error}</code>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Available Test Cases */}
                  <div>
                    <h5 className="text-md font-medium text-slate-300 mb-3">Available Test Cases</h5>
                    <div className="grid gap-3">
                      {algorithm.testCases.map((testCase, index) => (
                        <Card key={index} className="bg-slate-800 border-slate-700">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-white">Test Case {index + 1}</span>
                              {testCase.hidden && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 text-xs">
                                  Hidden
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-1 text-xs">
                              <div>
                                <span className="text-slate-400">Input: </span>
                                <code className="text-blue-300">{testCase.input}</code>
                              </div>
                              <div>
                                <span className="text-slate-400">Expected: </span>
                                <code className="text-green-300">{testCase.expected}</code>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an algorithm to see test cases</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
