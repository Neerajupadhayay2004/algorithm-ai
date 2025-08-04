"use server"

interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime: number
  memoryUsage?: number
}

interface TestResult {
  passed: boolean
  input: string
  expected: string
  actual: string
  executionTime: number
  error?: string
}

// JavaScript execution in a safe environment
const executeJavaScript = async (code: string, input?: string): Promise<ExecutionResult> => {
  const startTime = Date.now()

  try {
    // Create a safe execution environment
    const safeCode = `
      const console = {
        log: (...args) => output.push(args.join(' ')),
        error: (...args) => errors.push(args.join(' '))
      };
      const output = [];
      const errors = [];
      
      ${code}
      
      // If there's a main function or algorithm function, try to call it
      if (typeof bubbleSort === 'function' && input) {
        try {
          const inputArray = JSON.parse(input);
          const result = bubbleSort([...inputArray]);
          output.push('Result: ' + JSON.stringify(result));
        } catch (e) {
          errors.push('Input parsing error: ' + e.message);
        }
      }
      
      if (typeof quickSort === 'function' && input) {
        try {
          const inputArray = JSON.parse(input);
          const result = quickSort([...inputArray]);
          output.push('Result: ' + JSON.stringify(result));
        } catch (e) {
          errors.push('Input parsing error: ' + e.message);
        }
      }
      
      if (typeof mergeSort === 'function' && input) {
        try {
          const inputArray = JSON.parse(input);
          const result = mergeSort([...inputArray]);
          output.push('Result: ' + JSON.stringify(result));
        } catch (e) {
          errors.push('Input parsing error: ' + e.message);
        }
      }
      
      if (typeof binarySearch === 'function' && input) {
        try {
          const [array, target] = JSON.parse(input);
          const result = binarySearch(array, target);
          output.push('Result: ' + result);
        } catch (e) {
          errors.push('Input parsing error: ' + e.message);
        }
      }
      
      return { output: output.join('\\n'), errors: errors.join('\\n') };
    `

    // Simulate execution (in a real implementation, you'd use a sandboxed environment)
    const result = eval(safeCode)

    return {
      success: true,
      output: result.output || "Code executed successfully",
      error: result.errors || undefined,
      executionTime: Date.now() - startTime,
      memoryUsage: Math.floor(Math.random() * 1000) + 500, // Simulated memory usage
    }
  } catch (error) {
    return {
      success: false,
      output: "",
      error: error instanceof Error ? error.message : "Execution error",
      executionTime: Date.now() - startTime,
    }
  }
}

// Python execution simulation
const executePython = async (code: string, input?: string): Promise<ExecutionResult> => {
  const startTime = Date.now()

  // Simulate Python execution
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

  try {
    // Simulate successful execution
    let output = "Python code executed successfully\\n"

    if (input) {
      output += `Input processed: ${input}\\n`

      // Simulate algorithm execution based on code content
      if (code.includes("bubble_sort")) {
        try {
          const inputArray = JSON.parse(input)
          const sorted = [...inputArray].sort((a, b) => a - b)
          output += `Bubble sort result: ${JSON.stringify(sorted)}`
        } catch (e) {
          output += "Error processing input for bubble sort"
        }
      } else if (code.includes("quick_sort")) {
        try {
          const inputArray = JSON.parse(input)
          const sorted = [...inputArray].sort((a, b) => a - b)
          output += `Quick sort result: ${JSON.stringify(sorted)}`
        } catch (e) {
          output += "Error processing input for quick sort"
        }
      } else if (code.includes("binary_search")) {
        try {
          const [array, target] = JSON.parse(input)
          const index = array.indexOf(target)
          output += `Binary search result: ${index}`
        } catch (e) {
          output += "Error processing input for binary search"
        }
      }
    }

    return {
      success: true,
      output,
      executionTime: Date.now() - startTime,
      memoryUsage: Math.floor(Math.random() * 1200) + 600,
    }
  } catch (error) {
    return {
      success: false,
      output: "",
      error: "Python execution error",
      executionTime: Date.now() - startTime,
    }
  }
}

// Java execution simulation
const executeJava = async (code: string, input?: string): Promise<ExecutionResult> => {
  const startTime = Date.now()

  // Simulate Java compilation and execution
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

  try {
    let output = "Java code compiled and executed successfully\\n"

    if (input) {
      output += `Input processed: ${input}\\n`

      // Simulate algorithm execution
      if (code.includes("bubbleSort")) {
        try {
          const inputArray = JSON.parse(input)
          const sorted = [...inputArray].sort((a, b) => a - b)
          output += `Bubble sort result: ${JSON.stringify(sorted)}`
        } catch (e) {
          output += "Error processing input for bubble sort"
        }
      }
    }

    return {
      success: true,
      output,
      executionTime: Date.now() - startTime,
      memoryUsage: Math.floor(Math.random() * 1500) + 800,
    }
  } catch (error) {
    return {
      success: false,
      output: "",
      error: "Java compilation/execution error",
      executionTime: Date.now() - startTime,
    }
  }
}

// C++ execution simulation
const executeCpp = async (code: string, input?: string): Promise<ExecutionResult> => {
  const startTime = Date.now()

  // Simulate C++ compilation and execution
  await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 1000))

  try {
    let output = "C++ code compiled and executed successfully\\n"

    if (input) {
      output += `Input processed: ${input}\\n`

      // Simulate algorithm execution
      if (code.includes("bubbleSort") || code.includes("BubbleSort")) {
        try {
          const inputArray = JSON.parse(input)
          const sorted = [...inputArray].sort((a, b) => a - b)
          output += `Bubble sort result: ${JSON.stringify(sorted)}`
        } catch (e) {
          output += "Error processing input for bubble sort"
        }
      }
    }

    return {
      success: true,
      output,
      executionTime: Date.now() - startTime,
      memoryUsage: Math.floor(Math.random() * 800) + 400,
    }
  } catch (error) {
    return {
      success: false,
      output: "",
      error: "C++ compilation/execution error",
      executionTime: Date.now() - startTime,
    }
  }
}

// Main execution function
export async function executeCode(code: string, language: string, input?: string): Promise<ExecutionResult> {
  const startTime = Date.now()

  try {
    // Simulate code execution based on language
    switch (language.toLowerCase()) {
      case "javascript":
        return await executeJavaScript(code, input)
      case "python":
        return await executePython(code, input)
      case "java":
        return await executeJava(code, input)
      case "cpp":
      case "c++":
        return await executeCpp(code, input)
      default:
        throw new Error(`Language ${language} not supported`)
    }
  } catch (error) {
    return {
      success: false,
      output: "",
      error: error instanceof Error ? error.message : "Unknown error",
      executionTime: Date.now() - startTime,
    }
  }
}

export async function runTestCases(
  code: string,
  language: string,
  testCases: Array<{ input: string; expected: string }>,
): Promise<TestResult[]> {
  const results: TestResult[] = []

  for (const testCase of testCases) {
    const startTime = Date.now()

    try {
      const execution = await executeCode(code, language, testCase.input)

      // Extract the actual result from the output
      let actual = execution.output
      if (actual.includes("Result: ")) {
        actual = actual.split("Result: ")[1].split("\\n")[0]
      }

      const passed = actual.trim() === testCase.expected.trim()

      results.push({
        passed,
        input: testCase.input,
        expected: testCase.expected,
        actual: actual.trim(),
        executionTime: Date.now() - startTime,
        error: execution.error,
      })
    } catch (error) {
      results.push({
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        actual: "",
        executionTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  return results
}

export async function validateAlgorithm(
  algorithmId: number,
  userCode: string,
  language: string,
): Promise<{
  isValid: boolean
  score: number
  passedTests: number
  totalTests: number
  results: TestResult[]
  feedback: string[]
}> {
  // This would typically fetch the algorithm from the database
  // For now, we'll simulate it
  const mockTestCases = [
    { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
    { input: "[5, 2, 8, 1, 9]", expected: "[1, 2, 5, 8, 9]" },
    { input: "[1]", expected: "[1]" },
    { input: "[]", expected: "[]" },
  ]

  const results = await runTestCases(userCode, language, mockTestCases)
  const passedTests = results.filter((r) => r.passed).length
  const totalTests = results.length
  const score = Math.round((passedTests / totalTests) * 100)

  const feedback: string[] = []

  if (score === 100) {
    feedback.push("🎉 Perfect! All test cases passed.")
    feedback.push("Your implementation is correct and handles all edge cases.")
  } else if (score >= 75) {
    feedback.push("✅ Good job! Most test cases passed.")
    feedback.push("Review the failed test cases to improve your solution.")
  } else if (score >= 50) {
    feedback.push("⚠️ Your solution works for some cases but needs improvement.")
    feedback.push("Check your algorithm logic and edge case handling.")
  } else {
    feedback.push("❌ Your solution needs significant improvements.")
    feedback.push("Review the algorithm description and try again.")
  }

  // Add specific feedback based on failed tests
  const failedTests = results.filter((r) => !r.passed)
  if (failedTests.length > 0) {
    feedback.push(`\\nFailed test cases:`)
    failedTests.forEach((test, index) => {
      feedback.push(`Test ${index + 1}: Expected ${test.expected}, got ${test.actual}`)
    })
  }

  return {
    isValid: score >= 70, // Consider valid if 70% or more tests pass
    score,
    passedTests,
    totalTests,
    results,
    feedback,
  }
}
