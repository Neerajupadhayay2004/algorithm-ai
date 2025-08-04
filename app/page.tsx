"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dynamically import Three.js components
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })
const Stars = dynamic(() => import('@react-three/drei').then(mod => mod.Stars), { ssr: false })
const Float = dynamic(() => import('@react-three/drei').then(mod => mod.Float), { ssr: false })
const Sphere = dynamic(() => import('@react-three/drei').then(mod => mod.Sphere), { ssr: false })
const MeshDistortMaterial = dynamic(() => import('@react-three/drei').then(mod => mod.MeshDistortMaterial), { ssr: false })
import { Code, Zap, Brain, Cpu, Layers, Search, BookOpen, Trophy, Sparkles, Gamepad2 } from "lucide-react"
import AlgorithmVisualizer from "./components/algorithm-visualizer"
import CodeEditor from "./components/code-editor"
import AlgorithmLibrary from "./components/algorithm-library"
import PracticeMode from "./components/practice-mode"
import { solveAlgorithm } from "./lib/algorithm-solver"
import AICodeGenerator from "./components/ai-code-generator"

// 3D Background Component
function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />

        <Float speed={1} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1, 100, 200]} position={[-4, 0, -5]}>
            <MeshDistortMaterial
              color="#00ffff"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0}
              transparent
              opacity={0.1}
            />
          </Sphere>
        </Float>

        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <Sphere args={[0.8, 100, 200]} position={[4, 2, -3]}>
            <MeshDistortMaterial
              color="#ff00ff"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0}
              transparent
              opacity={0.1}
            />
          </Sphere>
        </Float>

        <Float speed={0.8} rotationIntensity={0.5} floatIntensity={3}>
          <Sphere args={[0.5, 100, 200]} position={[0, -3, -2]}>
            <MeshDistortMaterial
              color="#ffff00"
              attach="material"
              distort={0.2}
              speed={1}
              roughness={0}
              transparent
              opacity={0.08}
            />
          </Sphere>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

const languages = [
  { value: "javascript", label: "JavaScript", icon: "🟨", color: "#f7df1e" },
  { value: "python", label: "Python", icon: "🐍", color: "#3776ab" },
  { value: "java", label: "Java", icon: "☕", color: "#ed8b00" },
  { value: "cpp", label: "C++", icon: "⚡", color: "#00599c" },
  { value: "go", label: "Go", icon: "🔵", color: "#00add8" },
  { value: "rust", label: "Rust", icon: "🦀", color: "#ce422b" },
]

const algorithmCategories = [
  {
    name: "Sorting",
    count: 12,
    icon: "📊",
    color: "from-blue-600 via-cyan-500 to-teal-500",
    glow: "shadow-blue-500/50",
  },
  {
    name: "Searching",
    count: 8,
    icon: "🔍",
    color: "from-purple-600 via-pink-500 to-rose-500",
    glow: "shadow-purple-500/50",
  },
  {
    name: "Graph",
    count: 15,
    icon: "🕸️",
    color: "from-green-600 via-emerald-500 to-teal-500",
    glow: "shadow-green-500/50",
  },
  {
    name: "Dynamic Programming",
    count: 20,
    icon: "🧠",
    color: "from-orange-600 via-red-500 to-pink-500",
    glow: "shadow-orange-500/50",
  },
  { name: "Tree", count: 10, icon: "🌳", color: "from-teal-600 via-cyan-500 to-blue-500", glow: "shadow-teal-500/50" },
  {
    name: "String",
    count: 14,
    icon: "📝",
    color: "from-indigo-600 via-purple-500 to-pink-500",
    glow: "shadow-indigo-500/50",
  },
]

export default function AlgorithmSolverPlatform() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [problemInput, setProblemInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("solve")
  const [searchQuery, setSearchQuery] = useState("")
  const [solution, setSolution] = useState("")
  const [complexity, setComplexity] = useState({ time: "", space: "" })
  const [explanation, setExplanation] = useState("")
  const [processingStep, setProcessingStep] = useState("")

  const handleSolveAlgorithm = async () => {
    if (!problemInput.trim()) return

    setIsProcessing(true)
    setSolution("")
    setComplexity({ time: "", space: "" })
    setExplanation("")

    const steps = [
      "🔍 Analyzing problem statement...",
      "🧠 Identifying algorithm pattern...",
      "⚡ Generating optimized solution...",
      "📊 Calculating complexity...",
      "✨ Finalizing code structure...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i])
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    try {
      const result = await solveAlgorithm(problemInput, selectedLanguage)
      setSolution(result.code)
      setComplexity(result.complexity)
      setExplanation(result.explanation)
    } catch (error) {
      console.error("Error solving algorithm:", error)
    }

    setIsProcessing(false)
    setProcessingStep("")
  }

  // Floating particles animation
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-hidden relative">
      {/* 3D Background */}
      <Background3D />

      {/* Animated Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950/95 via-purple-900/90 to-gray-950/95 backdrop-blur-md z-0" />

      {/* Header */}
      <motion.header
        className="relative z-20 border-b border-cyan-500/30 backdrop-blur-xl bg-gray-900/80"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Brain className="h-10 w-10 text-cyan-400" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AlgoSolver AI
                </h1>
                <p className="text-sm text-gray-300">Advanced Algorithm Intelligence</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  placeholder="Search algorithms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/70 border-cyan-500/40 text-gray-100 placeholder-gray-400 w-64 backdrop-blur-xl focus:border-cyan-400 focus:ring-cyan-400/20"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-gray-900/50 backdrop-blur-xl hover:border-cyan-400 transition-all duration-300"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 p-1">
              <TabsTrigger
                value="solve"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600/50 data-[state=active]:to-blue-600/50 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/40 hover:text-cyan-300 transition-all duration-300"
              >
                <Zap className="h-4 w-4 mr-2" />
                AI Solve
              </TabsTrigger>
              <TabsTrigger
                value="visualize"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/30 data-[state=active]:to-pink-600/30 data-[state=active]:text-purple-300 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 transition-all duration-300"
              >
                <Layers className="h-4 w-4 mr-2" />
                3D Visualize
              </TabsTrigger>
              <TabsTrigger
                value="library"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600/30 data-[state=active]:to-emerald-600/30 data-[state=active]:text-green-300 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/30 transition-all duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Library
              </TabsTrigger>
              <TabsTrigger
                value="practice"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600/30 data-[state=active]:to-red-600/30 data-[state=active]:text-orange-300 data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/30 transition-all duration-300"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger
                value="ai-generator"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600/30 data-[state=active]:to-purple-600/30 data-[state=active]:text-pink-300 data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/30 transition-all duration-300"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Generator
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Algorithm Categories */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {algorithmCategories.map((category, index) => (
              <motion.div
                key={category.name}
                whileHover={{
                  scale: 1.08,
                  y: -10,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                style={{ perspective: 1000 }}
              >
                <Card
                  className={`bg-gradient-to-br ${category.color} border-0 text-white cursor-pointer group relative overflow-hidden backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 ${category.glow}`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300"
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotateY: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="font-bold text-sm mb-2">{category.name}</h3>
                    <p className="text-xs opacity-90">{category.count} algorithms</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <TabsContent value="solve" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Problem Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={{ perspective: 1000 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-purple-900/40 backdrop-blur-xl border-cyan-500/40 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white text-xl">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="text-cyan-400"
                      >
                        <Brain className="h-6 w-6 mr-3" />
                      </motion.div>
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        AI Algorithm Solver
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block text-gray-300">Programming Language</label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="bg-gray-900/70 border-cyan-500/40 text-white backdrop-blur-xl hover:border-cyan-400 transition-all duration-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/95 border-cyan-500/40 backdrop-blur-xl">
                          {languages.map((lang) => (
                            <SelectItem
                              key={lang.value}
                              value={lang.value}
                              className="text-gray-200 hover:bg-cyan-500/20 focus:bg-cyan-500/20"
                            >
                              <span className="flex items-center">
                                <span className="mr-3 text-lg">{lang.icon}</span>
                                <span style={{ color: lang.color }}>{lang.label}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-3 block text-gray-300">Problem Description</label>
                      <Textarea
                        placeholder="Describe your algorithm problem here... 
Examples:
• Sort an array of numbers in ascending order
• Find the shortest path between two nodes
• Check if a string is a palindrome
• Find the maximum subarray sum"
                        value={problemInput}
                        onChange={(e) => setProblemInput(e.target.value)}
                        className="bg-gray-900/70 border-cyan-500/40 text-gray-100 placeholder-gray-400 min-h-40 backdrop-blur-xl focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleSolveAlgorithm}
                        disabled={isProcessing || !problemInput.trim()}
                        className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white border-0 py-4 text-lg font-semibold shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-500"
                      >
                        <AnimatePresence mode="wait">
                          {isProcessing ? (
                            <motion.div
                              key="processing"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="mr-3"
                              >
                                <Cpu className="h-5 w-5" />
                              </motion.div>
                              <div className="text-left">
                                <div className="text-gray-100">Processing Algorithm...</div>
                                <div className="text-sm opacity-80 text-gray-300">{processingStep}</div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="solve"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center"
                            >
                              <Sparkles className="h-5 w-5 mr-3" />
                              Solve with AI
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solution Output Section */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                style={{ perspective: 1000 }}
              >
                <Card className="bg-gray-900/80 backdrop-blur-xl border-green-500/40 shadow-2xl shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-400 text-xl">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Code className="h-6 w-6 mr-3" />
                      </motion.div>
                      Generated Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      language={selectedLanguage}
                      value={
                        solution ||
                        `// Your optimized ${selectedLanguage} solution will appear here
// AI-powered algorithm generation with complexity analysis
// Step-by-step explanation included

${selectedLanguage === "python" ? "def" : "function"} solve_algorithm(${selectedLanguage === "python" ? "input_data" : "inputData"}) {
    // AI will generate the most efficient solution
    // based on your problem description
    ${selectedLanguage === "python" ? "pass" : "return result;"}
}`
                      }
                      onChange={() => {}}
                    />

                    <motion.div
                      className="mt-6 space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          className="flex items-center justify-between p-3 bg-gray-900/70 rounded-lg border border-green-500/40"
                          whileHover={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.5)" }}
                        >
                          <span className="text-sm text-gray-300">Time Complexity:</span>
                          <Badge variant="outline" className="border-green-400/60 text-green-400 bg-green-500/20">
                            {complexity.time || "O(n log n)"}
                          </Badge>
                        </motion.div>
                        <motion.div
                          className="flex items-center justify-between p-3 bg-gray-900/70 rounded-lg border border-blue-500/40"
                          whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)" }}
                        >
                          <span className="text-sm text-gray-300">Space Complexity:</span>
                          <Badge variant="outline" className="border-blue-400/60 text-blue-400 bg-blue-500/20">
                            {complexity.space || "O(1)"}
                          </Badge>
                        </motion.div>
                      </div>

                      {explanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-4 bg-gray-900/70 rounded-lg border border-purple-500/40"
                        >
                          <h4 className="text-purple-300 font-semibold mb-2">Algorithm Explanation:</h4>
                          <p className="text-gray-200 text-sm leading-relaxed">{explanation}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="visualize">
            <AlgorithmVisualizer />
          </TabsContent>

          <TabsContent value="library">
            <AlgorithmLibrary />
          </TabsContent>

          <TabsContent value="practice">
            <PracticeMode />
          </TabsContent>

          <TabsContent value="ai-generator">
            <AICodeGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
