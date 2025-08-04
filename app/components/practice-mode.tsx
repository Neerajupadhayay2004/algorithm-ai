"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  CheckCircle,
  XCircle,
  Trophy,
  Code,
  Brain,
  Gamepad2,
  Timer,
  Award,
  Sparkles,
  Cpu,
  BookOpen,
  TrendingUp,
  Send,
  Lightbulb,
  FlaskConical,
  Star,
  Flame,
} from "lucide-react"
import CodeEditor from "./code-editor"
import { executeCode } from "../actions/code-execution"

const practiceProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    detailedDescription: `You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

Follow-up: Can you come up with an algorithm that is less than O(n²) time complexity?`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    hints: [
      "Try using a hash map to store the numbers you've seen so far.",
      "For each number, check if its complement (target - current) exists in the hash map.",
      "If it exists, return the indices. If not, add the current number to the hash map.",
    ],
    solution: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      python: `def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        
        map.put(nums[i], i);
    }
    
    return new int[0];
}`,
    },
    timeLimit: 300,
    points: 100,
    solved: false,
    attempts: 0,
    bestTime: null,
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]", hidden: false },
      { input: "[3,2,4], 6", expected: "[1,2]", hidden: false },
      { input: "[3,3], 6", expected: "[0,1]", hidden: false },
      { input: "[1,5,7,2], 9", expected: "[1,2]", hidden: true },
      { input: "[-1,-2,-3,-4,-5], -8", expected: "[2,4]", hidden: true },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    detailedDescription: `An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All brackets are properly matched and nested.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "Brackets are not properly matched.",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      "If all brackets are matched, the stack should be empty at the end.",
    ],
    solution: {
      javascript: `function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
      python: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0`,
    },
    timeLimit: 240,
    points: 120,
    solved: true,
    attempts: 2,
    bestTime: 180,
    testCases: [
      { input: '"()"', expected: "true", hidden: false },
      { input: '"()[]{}"', expected: "true", hidden: false },
      { input: '"(]"', expected: "false", hidden: false },
      { input: '"([)]"', expected: "false", hidden: true },
      { input: '"{[]}"', expected: "true", hidden: true },
    ],
  },
  {
    id: 3,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    detailedDescription: `Return the values level by level from left to right. If the tree is empty, return an empty array.

This is also known as Breadth-First Search (BFS) traversal of a tree.`,
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]",
      },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 2000]", "-1000 ≤ Node.val ≤ 1000"],
    hints: [
      "Use a queue to keep track of nodes at each level.",
      "Process all nodes at the current level before moving to the next level.",
      "Keep track of the number of nodes at each level to separate them.",
    ],
    solution: {
      javascript: `function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}`,
    },
    timeLimit: 600,
    points: 200,
    solved: false,
    attempts: 1,
    bestTime: null,
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "[[3],[9,20],[15,7]]", hidden: false },
      { input: "[1]", expected: "[[1]]", hidden: false },
      { input: "[]", expected: "[]", hidden: false },
      { input: "[1,2,3,4,5,6,7]", expected: "[[1],[2,3],[4,5,6,7]]", hidden: true },
    ],
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    difficulty: "Hard",
    category: "Dynamic Programming",
    description: "Given a string s, return the longest palindromic substring in s.",
    detailedDescription: `A palindrome is a string that reads the same forward and backward. You need to find the longest such substring within the given string.

There are multiple approaches to solve this problem including dynamic programming, expand around centers, and Manacher's algorithm.`,
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: 'Note: "aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "The longest palindrome is 'bb'.",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 1000", "s consist of only digits and English letters"],
    hints: [
      "Try expanding around each character as a potential center.",
      "Consider both odd-length and even-length palindromes.",
      "For dynamic programming: dp[i][j] represents whether substring from i to j is a palindrome.",
    ],
    solution: {
      javascript: `function longestPalindrome(s) {
    if (!s || s.length < 2) return s;
    
    let start = 0, maxLen = 1;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // odd length
        expandAroundCenter(i, i + 1); // even length
    }
    
    return s.substring(start, start + maxLen);
}`,
    },
    timeLimit: 900,
    points: 300,
    solved: false,
    attempts: 0,
    bestTime: null,
    testCases: [
      { input: '"babad"', expected: '"bab"', hidden: false },
      { input: '"cbbd"', expected: '"bb"', hidden: false },
      { input: '"racecar"', expected: '"racecar"', hidden: true },
      { input: '"abcdef"', expected: '"a"', hidden: true },
    ],
  },
]

const achievements = [
  {
    id: 1,
    title: "First Blood",
    description: "Solve your first problem",
    icon: "🎯",
    unlocked: true,
    rarity: "common",
  },
  {
    id: 2,
    title: "Speed Demon",
    description: "Solve a problem in under 2 minutes",
    icon: "⚡",
    unlocked: false,
    rarity: "rare",
  },
  {
    id: 3,
    title: "Perfectionist",
    description: "Solve 5 problems without any wrong attempts",
    icon: "💎",
    unlocked: false,
    rarity: "epic",
  },
  {
    id: 4,
    title: "Algorithm Master",
    description: "Solve 50 problems",
    icon: "👑",
    unlocked: false,
    rarity: "legendary",
  },
  {
    id: 5,
    title: "Night Owl",
    description: "Solve problems for 3 hours straight",
    icon: "🦉",
    unlocked: false,
    rarity: "rare",
  },
  { id: 6, title: "Code Warrior", description: "Solve 10 hard problems", icon: "⚔️", unlocked: false, rarity: "epic" },
]

export default function PracticeMode() {
  const [selectedProblem, setSelectedProblem] = useState(practiceProblems[0])
  const [currentCode, setCurrentCode] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(selectedProblem.timeLimit)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [testResults, setTestResults] = useState<
    Array<{
      id: number
      passed: boolean
      input: string
      expected: string
      actual: string
      runtime: number
      memory: number
      error?: string
    }>
  >([])
  const [showResults, setShowResults] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [userStats, setUserStats] = useState({
    totalSolved: 12,
    totalAttempts: 28,
    averageTime: 420,
    currentStreak: 5,
    bestStreak: 8,
    totalPoints: 1250,
    rank: "Algorithm Apprentice",
    level: 3,
    xp: 1250,
    nextLevelXP: 2000,
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTimerActive(false)
      // Handle timeout
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timeLeft])

  useEffect(() => {
    setTimeLeft(selectedProblem.timeLimit)
    setCurrentCode(getInitialCode())
    setShowResults(false)
    setShowHints(false)
    setShowSolution(false)
    setCurrentHint(0)
  }, [selectedProblem, selectedLanguage])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 border-green-400/50 bg-green-500/10"
      case "Medium":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-500/10"
      case "Hard":
        return "text-red-400 border-red-400/50 bg-red-500/10"
      default:
        return "text-gray-400 border-gray-400/50 bg-gray-500/10"
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500/20 to-gray-600/20 border-gray-400/50"
      case "rare":
        return "from-blue-500/20 to-blue-600/20 border-blue-400/50"
      case "epic":
        return "from-purple-500/20 to-purple-600/20 border-purple-400/50"
      case "legendary":
        return "from-orange-500/20 to-yellow-500/20 border-yellow-400/50"
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-400/50"
    }
  }

  const getInitialCode = () => {
    const templates = {
      javascript: `// ${selectedProblem.title}
// Difficulty: ${selectedProblem.difficulty}
// Time Limit: ${formatTime(selectedProblem.timeLimit)}

function solution(/* parameters */) {
    // Write your solution here
    
    return result;
}

// Test your solution
console.log(solution(/* test input */));`,
      python: `# ${selectedProblem.title}
# Difficulty: ${selectedProblem.difficulty}
# Time Limit: ${formatTime(selectedProblem.timeLimit)}

def solution(# parameters):
    # Write your solution here
    
    return result

# Test your solution
print(solution(# test input))`,
      java: `// ${selectedProblem.title}
// Difficulty: ${selectedProblem.difficulty}
// Time Limit: ${formatTime(selectedProblem.timeLimit)}

public class Solution {
    public /* return type */ solution(/* parameters */) {
        // Write your solution here
        
        return result;
    }
}`,
    }
    return templates[selectedLanguage as keyof typeof templates] || templates.javascript
  }

  const startPractice = () => {
    setIsTimerActive(true)
    setTimeLeft(selectedProblem.timeLimit)
    setCurrentCode(getInitialCode())
    setShowResults(false)
  }

  const runCode = async () => {
    setIsRunning(true)
    setShowResults(false)

    // Prepare test cases in the format expected by the code execution service
    const formattedTestCases = selectedProblem.testCases.map((testCase) => ({
      input: testCase.input,
      expected: testCase.expected,
      hidden: testCase.hidden || false,
    }))

    try {
      // Create form data for the server action
      const formData = new FormData()
      formData.append("code", currentCode)
      formData.append("language", selectedLanguage)
      formData.append("testCases", JSON.stringify(formattedTestCases))
      formData.append("timeLimit", selectedProblem.timeLimit.toString())

      // Execute the code
      const result = await executeCode(formData)

      // Update the test results state
      setTestResults(result.results)
      setShowResults(true)

      // Update user stats if all tests passed
      if (result.success && result.summary.passedTests === result.summary.totalTests) {
        // Update stats only if this is a submission, not just a test run
        if (isSubmitting) {
          setUserStats((prev) => ({
            ...prev,
            totalSolved: prev.totalSolved + (selectedProblem.solved ? 0 : 1),
            totalAttempts: prev.totalAttempts + 1,
            currentStreak: prev.currentStreak + 1,
            bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
            totalPoints: prev.totalPoints + selectedProblem.points,
            xp: prev.xp + selectedProblem.points,
          }))

          // Mark the problem as solved
          selectedProblem.solved = true
          selectedProblem.attempts += 1

          // Update best time if better than previous
          if (!selectedProblem.bestTime || timeLeft > selectedProblem.bestTime) {
            selectedProblem.bestTime = timeLeft
          }
        }
      }
    } catch (error) {
      console.error("Error executing code:", error)
      setTestResults([
        {
          id: 0,
          passed: false,
          input: "Error",
          expected: "Valid execution",
          actual: "Execution failed",
          runtime: 0,
          memory: 0,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      ])
      setShowResults(true)
    } finally {
      setIsRunning(false)
      setIsSubmitting(false)
    }
  }

  const submitSolution = async () => {
    setIsSubmitting(true)
    await runCode()
    setIsTimerActive(false)
  }

  const nextHint = () => {
    if (currentHint < selectedProblem.hints.length - 1) {
      setCurrentHint(currentHint + 1)
    }
  }

  const toggleSolution = () => {
    setShowSolution(!showSolution)
    if (!showSolution) {
      setCurrentCode(selectedProblem.solution[selectedLanguage as keyof typeof selectedProblem.solution] || "")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Enhanced Practice Header with Neon Effects */}
      <Card className="bg-gradient-to-r from-black/60 via-purple-900/40 to-black/60 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
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
                <Gamepad2 className="h-8 w-8 text-purple-400" />
              </motion.div>
              AI-Powered Practice Arena
            </CardTitle>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-6">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/50 px-4 py-2">
                  <Trophy className="h-4 w-4 mr-2" />
                  {userStats.totalPoints} XP
                </Badge>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/50 px-4 py-2">
                  <Flame className="h-4 w-4 mr-2" />
                  {userStats.currentStreak} Streak
                </Badge>
                <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-400/50 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Level {userStats.level}
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Level {userStats.level}</span>
              <span>
                {userStats.xp} / {userStats.nextLevelXP} XP
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(userStats.xp / userStats.nextLevelXP) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Enhanced Problem List */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
          <Card className="bg-black/60 backdrop-blur-xl border-purple-500/30 shadow-xl shadow-purple-500/10">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {practiceProblems.map((problem) => (
                <motion.div
                  key={problem.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProblem(problem)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all duration-300 relative overflow-hidden ${
                    selectedProblem.id === problem.id
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20"
                      : "bg-black/40 border-gray-600/30 hover:border-purple-400/30 hover:bg-purple-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm text-white">{problem.title}</h4>
                    {problem.solved && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 text-xs">
                      {problem.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{problem.points} XP</span>
                    <span>{problem.attempts} attempts</span>
                  </div>
                  {problem.bestTime && (
                    <div className="text-xs text-green-400 mt-1">Best: {formatTime(problem.bestTime)}</div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced User Stats */}
          <Card className="bg-gradient-to-br from-black/60 to-purple-900/30 backdrop-blur-xl border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30"
                >
                  <div className="text-green-400 font-bold text-xl">{userStats.totalSolved}</div>
                  <div className="text-gray-300 text-xs">Solved</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30"
                >
                  <div className="text-blue-400 font-bold text-xl">{userStats.totalAttempts}</div>
                  <div className="text-gray-300 text-xs">Attempts</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30"
                >
                  <div className="text-purple-400 font-bold text-xl">{userStats.bestStreak}</div>
                  <div className="text-gray-300 text-xs">Best Streak</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-400/30"
                >
                  <div className="text-orange-400 font-bold text-xl">{Math.floor(userStats.averageTime / 60)}m</div>
                  <div className="text-gray-300 text-xs">Avg Time</div>
                </motion.div>
              </div>
              <div className="text-center p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">
                  {userStats.rank}
                </div>
                <div className="text-xs text-gray-400 mt-1">Current Rank</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Main Practice Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
          <Tabs defaultValue="problem" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/60 backdrop-blur-xl border border-purple-500/30 p-1">
              <TabsTrigger
                value="problem"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30 data-[state=active]:text-purple-300 transition-all duration-300"
              >
                <Brain className="h-4 w-4 mr-2" />
                Problem
              </TabsTrigger>
              <TabsTrigger
                value="solution"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/30 data-[state=active]:to-emerald-500/30 data-[state=active]:text-green-300 transition-all duration-300"
              >
                <Code className="h-4 w-4 mr-2" />
                Solution
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-cyan-300 transition-all duration-300"
              >
                <FlaskConical className="h-4 w-4 mr-2" />
                Results
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/30 data-[state=active]:to-orange-500/30 data-[state=active]:text-yellow-300 transition-all duration-300"
              >
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="problem">
              <Card className="bg-black/60 backdrop-blur-xl border-purple-500/30 shadow-xl shadow-purple-500/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-purple-400 text-2xl">{selectedProblem.title}</CardTitle>
                      <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                        {selectedProblem.difficulty}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-400/50">
                        {selectedProblem.category}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-400/50">
                        {selectedProblem.points} XP
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      {isTimerActive && (
                        <motion.div
                          className="flex items-center space-x-2 text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/50"
                          animate={{ scale: timeLeft < 60 ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 1, repeat: timeLeft < 60 ? Number.POSITIVE_INFINITY : 0 }}
                        >
                          <Timer className="h-4 w-4" />
                          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                        </motion.div>
                      )}
                      <Button
                        onClick={startPractice}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/20"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Practice
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3 text-lg">Description</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{selectedProblem.description}</p>
                    <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {selectedProblem.detailedDescription}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Examples</h3>
                    {selectedProblem.examples.map((example, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-black/60 to-gray-900/60 p-4 rounded-lg border border-cyan-500/30 mb-4 shadow-lg shadow-cyan-500/10"
                      >
                        <h4 className="text-cyan-400 font-semibold mb-2">Example {index + 1}</h4>
                        <div className="space-y-2 font-mono text-sm">
                          <div className="bg-black/40 p-2 rounded">
                            <span className="text-cyan-400 font-semibold">Input:</span>{" "}
                            <span className="text-white">{example.input}</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded">
                            <span className="text-green-400 font-semibold">Output:</span>{" "}
                            <span className="text-white">{example.output}</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded">
                            <span className="text-purple-400 font-semibold">Explanation:</span>{" "}
                            <span className="text-gray-300">{example.explanation}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3 text-lg">Constraints</h3>
                    <div className="bg-black/40 p-4 rounded-lg border border-gray-600/30">
                      <ul className="space-y-2">
                        {selectedProblem.constraints.map((constraint, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-center">
                            <span className="text-purple-400 mr-2">•</span>
                            <code className="bg-black/50 px-2 py-1 rounded text-cyan-400 font-mono text-xs">
                              {constraint}
                            </code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AI Hints Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                        AI Hints
                      </h3>
                      <Button
                        onClick={() => setShowHints(!showHints)}
                        variant="outline"
                        size="sm"
                        className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                      >
                        {showHints ? "Hide Hints" : "Show Hints"}
                      </Button>
                    </div>
                    <AnimatePresence>
                      {showHints && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-400/30"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-yellow-400 font-semibold">
                              Hint {currentHint + 1} of {selectedProblem.hints.length}
                            </span>
                            <Button
                              onClick={nextHint}
                              disabled={currentHint >= selectedProblem.hints.length - 1}
                              size="sm"
                              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300"
                            >
                              Next Hint
                            </Button>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{selectedProblem.hints[currentHint]}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solution">
              <Card className="bg-black/60 backdrop-blur-xl border-green-500/30 shadow-xl shadow-green-500/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-400 text-xl flex items-center">
                      <Code className="h-6 w-6 mr-3" />
                      AI-Powered Code Editor
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="bg-black/50 border-purple-500/30 text-white w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-purple-500/30">
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={runCode}
                        disabled={isRunning}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20"
                      >
                        {isRunning ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Cpu className="h-4 w-4 mr-2" />
                          </motion.div>
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isRunning ? "Running Tests..." : "Run Code"}
                      </Button>
                      <Button
                        onClick={submitSolution}
                        disabled={isSubmitting || !showResults}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/20"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Send className="h-4 w-4 mr-2" />
                          </motion.div>
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                      <Button
                        onClick={toggleSolution}
                        variant="outline"
                        className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        {showSolution ? "Hide" : "Show"} Solution
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CodeEditor language={selectedLanguage} value={currentCode} onChange={setCurrentCode} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card className="bg-black/60 backdrop-blur-xl border-cyan-500/30 shadow-xl shadow-cyan-500/10">
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-xl flex items-center">
                    <FlaskConical className="h-6 w-6 mr-3" />
                    Test Results & AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {showResults ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        {/* Results Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-400/30">
                            <div className="text-center">
                              <div className="text-green-400 font-bold text-2xl">
                                {testResults.filter((r) => r.passed).length}
                              </div>
                              <div className="text-gray-300 text-sm">Tests Passed</div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-4 rounded-lg border border-red-400/30">
                            <div className="text-center">
                              <div className="text-red-400 font-bold text-2xl">
                                {testResults.filter((r) => !r.passed).length}
                              </div>
                              <div className="text-gray-300 text-sm">Tests Failed</div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-400/30">
                            <div className="text-center">
                              <div className="text-purple-400 font-bold text-2xl">
                                {Math.floor(testResults.reduce((acc, r) => acc + r.runtime, 0) / testResults.length)}ms
                              </div>
                              <div className="text-gray-300 text-sm">Avg Runtime</div>
                            </div>
                          </div>
                        </div>

                        {/* Individual Test Results */}
                        <div className="space-y-3">
                          <h3 className="text-white font-semibold text-lg">Detailed Results</h3>
                          {testResults.map((result, index) => (
                            <motion.div
                              key={result.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`p-4 rounded-lg border transition-all duration-300 ${
                                result.passed
                                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                                  : "bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/30"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-white">Test Case {result.id}</span>
                                  {result.passed ? (
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                  ) : (
                                    <XCircle className="h-5 w-5 text-red-400" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-gray-400">
                                  <span>Runtime: {result.runtime}ms</span>
                                  <span>Memory: {result.memory}MB</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                                <div className="bg-black/40 p-2 rounded">
                                  <div className="text-gray-400 mb-1">Input:</div>
                                  <div className="text-cyan-400">{result.input}</div>
                                </div>
                                <div className="bg-black/40 p-2 rounded">
                                  <div className="text-gray-400 mb-1">Expected:</div>
                                  <div className="text-green-400">{result.expected}</div>
                                </div>
                                <div className="bg-black/40 p-2 rounded">
                                  <div className="text-gray-400 mb-1">Your Output:</div>
                                  <div className={result.passed ? "text-green-400" : "text-red-400"}>
                                    {result.actual}
                                  </div>
                                </div>
                              </div>

                              {result.error && (
                                <div className="mt-3 bg-red-500/10 border border-red-500/30 p-2 rounded">
                                  <div className="text-red-400 text-xs font-mono">{result.error}</div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* AI Performance Analysis */}
                        <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-400/30">
                          <h3 className="text-purple-400 font-semibold mb-3 flex items-center">
                            <Brain className="h-5 w-5 mr-2" />
                            AI Performance Analysis
                          </h3>
                          <div className="space-y-2 text-sm text-gray-300">
                            <p>• Your solution shows good understanding of the core algorithm.</p>
                            <p>• Time complexity appears to be optimal for this problem type.</p>
                            <p>• Consider edge cases handling for improved robustness.</p>
                            <p>• Memory usage is within acceptable bounds.</p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center py-12">
                        <FlaskConical className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Results Yet</h3>
                        <p className="text-gray-400 mb-4">Run your code to see detailed test results and AI analysis</p>
                        <Button
                          onClick={runCode}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Run Tests
                        </Button>
                      </div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="bg-black/60 backdrop-blur-xl border-yellow-500/30 shadow-xl shadow-yellow-500/10">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-xl flex items-center">
                    <Award className="h-6 w-6 mr-3" />
                    Achievements & Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className={`p-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${
                          achievement.unlocked
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} shadow-lg`
                            : "bg-black/40 border-gray-600/30 grayscale"
                        }`}
                      >
                        {achievement.unlocked && (
                          <div className="absolute top-2 right-2">
                            <Sparkles className="h-4 w-4 text-yellow-400" />
                          </div>
                        )}

                        <div className="flex items-center space-x-4">
                          <div className={`text-3xl ${achievement.unlocked ? "" : "opacity-50"}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4
                              className={`font-semibold ${
                                achievement.unlocked
                                  ? achievement.rarity === "legendary"
                                    ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"
                                    : achievement.rarity === "epic"
                                      ? "text-purple-400"
                                      : achievement.rarity === "rare"
                                        ? "text-blue-400"
                                        : "text-green-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                            <Badge
                              className={`mt-2 text-xs ${
                                achievement.rarity === "legendary"
                                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-400/50"
                                  : achievement.rarity === "epic"
                                    ? "bg-purple-500/20 text-purple-300 border-purple-400/50"
                                    : achievement.rarity === "rare"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-400/50"
                                      : "bg-green-500/20 text-green-300 border-green-400/50"
                              }`}
                            >
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}
