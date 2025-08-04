"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Box, Sphere, Line, Html, Trail, Sparkles, Float } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
  Eye,
  Volume2,
  VolumeX,
  Camera,
  Maximize,
  SkipForward,
  SkipBack,
} from "lucide-react"
import { Brain } from "lucide-react" // Import Brain for Algorithm Analysis section
import type * as THREE from "three"

// Enhanced 3D Array Bar Component with physics-like animations
function AnimatedBar({
  value,
  position,
  isComparing,
  isSorted,
  isSwapping,
  isPivot,
  index,
}: {
  value: number
  position: [number, number, number]
  isComparing: boolean
  isSorted: boolean
  isSwapping: boolean
  isPivot: boolean
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation for comparing elements
      if (isComparing) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.3
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }

      // Pulsing animation for pivot
      if (isPivot) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.2
        meshRef.current.scale.setScalar(scale)
      }

      // Spinning animation for swapping
      if (isSwapping) {
        meshRef.current.rotation.y += 0.1
      }
    }
  })

  const getColor = () => {
    if (isPivot) return "#ff6b35" // Orange for pivot
    if (isSorted) return "#10b981" // Green for sorted
    if (isComparing) return "#ef4444" // Red for comparing
    if (isSwapping) return "#f59e0b" // Yellow for swapping
    if (hovered) return "#8b5cf6" // Purple for hover
    return "#3b82f6" // Blue default
  }

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1.2, value / 30, 1.2]}
        position={[0, value / 60, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial color={getColor()} transparent opacity={0.9} roughness={0.3} metalness={0.7} />
      </Box>

      {/* Sparkles effect for sorted elements */}
      {isSorted && (
        <Sparkles count={20} scale={2} size={2} speed={0.4} color={getColor()} position={[0, value / 30, 0]} />
      )}

      {/* Value label */}
      <Html position={[0, value / 30 + 1.5, 0]} center>
        <div
          className={`text-white font-bold text-sm px-2 py-1 rounded ${
            isPivot ? "bg-orange-500" : isSorted ? "bg-green-500" : isComparing ? "bg-red-500" : "bg-blue-500"
          } bg-opacity-80 backdrop-blur-sm`}
        >
          {value}
        </div>
      </Html>

      {/* Index label */}
      <Text position={[0, -0.5, 0]} fontSize={0.4} color="#64748b" anchorX="center" anchorY="middle">
        {index}
      </Text>
    </group>
  )
}

// Enhanced 3D Graph Node with interactive features
function GraphNode({
  node,
  isHighlighted,
  isVisited,
  distance,
  isSource,
  onClick,
}: {
  node: { id: string; position: [number, number, number] }
  isHighlighted: boolean
  isVisited: boolean
  distance?: number
  isSource: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      if (isHighlighted) {
        meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.3
        meshRef.current.scale.setScalar(scale)
      }

      if (hovered) {
        meshRef.current.rotation.y += 0.02
      }
    }
  })

  const getColor = () => {
    if (isSource) return "#ff6b35"
    if (isHighlighted) return "#ef4444"
    if (isVisited) return "#10b981"
    if (hovered) return "#8b5cf6"
    return "#3b82f6"
  }

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          ref={meshRef}
          args={[0.6]}
          onClick={onClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshStandardMaterial color={getColor()} transparent opacity={0.9} roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>

      {/* Node label */}
      <Html position={[0, 0, 0.8]} center>
        <div
          className={`text-white font-bold text-lg px-3 py-2 rounded-full ${
            isSource ? "bg-orange-500" : isHighlighted ? "bg-red-500" : isVisited ? "bg-green-500" : "bg-blue-500"
          } bg-opacity-90 backdrop-blur-sm shadow-lg`}
        >
          {node.id}
        </div>
      </Html>

      {/* Distance label for Dijkstra */}
      {distance !== undefined && distance !== Number.POSITIVE_INFINITY && (
        <Html position={[0, -1.2, 0]} center>
          <div className="text-cyan-400 font-mono text-sm bg-black bg-opacity-70 px-2 py-1 rounded">d: {distance}</div>
        </Html>
      )}

      {/* Sparkles for highlighted nodes */}
      {isHighlighted && <Sparkles count={30} scale={3} size={3} speed={0.6} color="#ef4444" />}
    </group>
  )
}

// Enhanced 3D Edge with animations
function GraphEdge({
  from,
  to,
  weight,
  isHighlighted,
  isTraversed,
}: {
  from: [number, number, number]
  to: [number, number, number]
  weight?: number
  isHighlighted: boolean
  isTraversed: boolean
}) {
  const getColor = () => {
    if (isHighlighted) return "#ef4444"
    if (isTraversed) return "#10b981"
    return "#64748b"
  }

  const midPoint: [number, number, number] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]

  return (
    <group>
      <Line
        points={[from, to]}
        color={getColor()}
        lineWidth={isHighlighted ? 4 : 2}
        transparent
        opacity={isHighlighted ? 1 : 0.7}
      />

      {/* Weight label */}
      {weight && (
        <Html position={midPoint} center>
          <div
            className={`text-white font-mono text-xs px-2 py-1 rounded ${
              isHighlighted ? "bg-red-500" : "bg-gray-600"
            } bg-opacity-80`}
          >
            {weight}
          </div>
        </Html>
      )}

      {/* Trail effect for traversed edges */}
      {isTraversed && (
        <Trail width={2} length={10} color="#10b981" attenuation={(t) => t * t}>
          <mesh position={midPoint}>
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </Trail>
      )}
    </group>
  )
}

const algorithms = [
  {
    value: "bubble-sort",
    label: "Bubble Sort",
    type: "sorting",
    description: "Simple comparison-based sorting with O(n²) complexity",
    complexity: { time: "O(n²)", space: "O(1)" },
  },
  {
    value: "quick-sort",
    label: "Quick Sort",
    type: "sorting",
    description: "Efficient divide-and-conquer sorting algorithm",
    complexity: { time: "O(n log n)", space: "O(log n)" },
  },
  {
    value: "merge-sort",
    label: "Merge Sort",
    type: "sorting",
    description: "Stable divide-and-conquer sorting algorithm",
    complexity: { time: "O(n log n)", space: "O(n)" },
  },
  {
    value: "heap-sort",
    label: "Heap Sort",
    type: "sorting",
    description: "In-place sorting using binary heap",
    complexity: { time: "O(n log n)", space: "O(1)" },
  },
  {
    value: "binary-search",
    label: "Binary Search",
    type: "searching",
    description: "Efficient search in sorted arrays",
    complexity: { time: "O(log n)", space: "O(1)" },
  },
  {
    value: "dijkstra",
    label: "Dijkstra's Algorithm",
    type: "graph",
    description: "Shortest path in weighted graphs",
    complexity: { time: "O(V²)", space: "O(V)" },
  },
  {
    value: "bfs",
    label: "Breadth-First Search",
    type: "graph",
    description: "Level-order graph traversal",
    complexity: { time: "O(V + E)", space: "O(V)" },
  },
  {
    value: "dfs",
    label: "Depth-First Search",
    type: "graph",
    description: "Deep graph traversal using stack",
    complexity: { time: "O(V + E)", space: "O(V)" },
  },
]

export default function AlgorithmVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState([50])
  const [array, setArray] = useState<number[]>([])
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])
  const [swapping, setSwapping] = useState<number[]>([])
  const [pivot, setPivot] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [algorithmSteps, setAlgorithmSteps] = useState<string[]>([])
  const [currentStepDescription, setCurrentStepDescription] = useState("")

  // 3D Controls
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 8, 20])
  const [autoRotate, setAutoRotate] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  // Graph data
  const [graphNodes] = useState([
    { id: "A", position: [-4, 3, 0] as [number, number, number] },
    { id: "B", position: [0, 4, 0] as [number, number, number] },
    { id: "C", position: [4, 3, 0] as [number, number, number] },
    { id: "D", position: [-3, 0, 0] as [number, number, number] },
    { id: "E", position: [0, 0, 0] as [number, number, number] },
    { id: "F", position: [3, 0, 0] as [number, number, number] },
    { id: "G", position: [-2, -3, 0] as [number, number, number] },
    { id: "H", position: [2, -3, 0] as [number, number, number] },
  ])

  const [graphEdges] = useState([
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "E", weight: 6 },
    { from: "C", to: "F", weight: 1 },
    { from: "D", to: "E", weight: 5 },
    { from: "D", to: "G", weight: 4 },
    { from: "E", to: "F", weight: 2 },
    { from: "E", to: "H", weight: 3 },
    { from: "F", to: "H", weight: 7 },
    { from: "G", to: "H", weight: 1 },
  ])

  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])
  const [visitedNodes, setVisitedNodes] = useState<string[]>([])
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([])
  const [traversedEdges, setTraversedEdges] = useState<string[]>([])
  const [nodeDistances, setNodeDistances] = useState<{ [key: string]: number }>({})
  const [sourceNode, setSourceNode] = useState("A")

  useEffect(() => {
    generateRandomArray()
  }, [])

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 150) + 30)
    setArray(newArray)
    resetVisualizationState()
  }

  const resetVisualizationState = () => {
    setComparing([])
    setSorted([])
    setSwapping([])
    setPivot([])
    setCurrentStep(0)
    setTotalSteps(0)
    setAlgorithmSteps([])
    setCurrentStepDescription("")
    setHighlightedNodes([])
    setVisitedNodes([])
    setHighlightedEdges([])
    setTraversedEdges([])
    setNodeDistances({})
  }

  const playSound = (type: "compare" | "swap" | "complete") => {
    if (!soundEnabled) return

    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "compare":
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        break
      case "swap":
        oscillator.frequency.setValueAtTime(660, audioContext.currentTime)
        break
      case "complete":
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
        break
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const startVisualization = () => {
    setIsPlaying(true)
    setIsPaused(false)
    setCurrentStep(0)

    const algorithm = algorithms.find((a) => a.value === selectedAlgorithm)
    if (algorithm?.type === "sorting") {
      switch (selectedAlgorithm) {
        case "bubble-sort":
          bubbleSortVisualization()
          break
        case "quick-sort":
          quickSortVisualization()
          break
        case "merge-sort":
          mergeSortVisualization()
          break
        case "heap-sort":
          heapSortVisualization()
          break
      }
    } else if (algorithm?.type === "graph") {
      switch (selectedAlgorithm) {
        case "bfs":
          bfsVisualization()
          break
        case "dfs":
          dfsVisualization()
          break
        case "dijkstra":
          dijkstraVisualization()
          break
      }
    }
  }

  const pauseVisualization = () => {
    setIsPaused(!isPaused)
  }

  const stepForward = () => {
    // Implement step-by-step execution
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const stepBackward = () => {
    // Implement step-by-step execution
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Enhanced Bubble Sort with better animations
  const bubbleSortVisualization = async () => {
    const arr = [...array]
    const n = arr.length
    const steps = []
    let stepCount = 0

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (isPaused) await new Promise((resolve) => setTimeout(resolve, 100))

        steps.push(`Comparing elements at positions ${j} and ${j + 1}`)
        setComparing([j, j + 1])
        setCurrentStepDescription(`Comparing ${arr[j]} and ${arr[j + 1]}`)
        playSound("compare")
        await new Promise((resolve) => setTimeout(resolve, 1200 - speed[0] * 10))

        if (arr[j] > arr[j + 1]) {
          steps.push(`Swapping ${arr[j]} and ${arr[j + 1]}`)
          setSwapping([j, j + 1])
          setCurrentStepDescription(`Swapping ${arr[j]} and ${arr[j + 1]}`)
          playSound("swap")
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, 600))
          setSwapping([])
        }
        stepCount++
        setCurrentStep(stepCount)
      }
      setSorted((prev) => [...prev, n - 1 - i])
      steps.push(`Element ${arr[n - 1 - i]} is now in its correct position`)
    }

    setSorted((prev) => [...prev, 0])
    setComparing([])
    setIsPlaying(false)
    setTotalSteps(stepCount)
    setAlgorithmSteps(steps)
    setCurrentStepDescription("Bubble sort completed!")
    playSound("complete")
  }

  // Enhanced Quick Sort with pivot highlighting
  const quickSortVisualization = async () => {
    const arr = [...array]
    const steps: string[] = []
    let stepCount = 0

    const quickSort = async (arr: number[], low: number, high: number): Promise<void> => {
      if (low < high) {
        const pi = await partition(arr, low, high)
        await quickSort(arr, low, pi - 1)
        await quickSort(arr, pi + 1, high)
      }
    }

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
      const pivotValue = arr[high]
      setPivot([high])
      steps.push(`Choosing pivot: ${pivotValue} at position ${high}`)
      setCurrentStepDescription(`Choosing pivot: ${pivotValue}`)
      await new Promise((resolve) => setTimeout(resolve, 1200 - speed[0] * 10))

      let i = low - 1

      for (let j = low; j < high; j++) {
        if (isPaused) await new Promise((resolve) => setTimeout(resolve, 100))

        setComparing([j, high])
        steps.push(`Comparing ${arr[j]} with pivot ${pivotValue}`)
        setCurrentStepDescription(`Comparing ${arr[j]} with pivot ${pivotValue}`)
        playSound("compare")
        await new Promise((resolve) => setTimeout(resolve, 1200 - speed[0] * 10))

        if (arr[j] < pivotValue) {
          i++
          if (i !== j) {
            setSwapping([i, j])
            steps.push(`Swapping ${arr[i]} and ${arr[j]}`)
            setCurrentStepDescription(`Swapping ${arr[i]} and ${arr[j]}`)
            playSound("swap")
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
            setArray([...arr])
            await new Promise((resolve) => setTimeout(resolve, 600))
            setSwapping([])
          }
        }
        stepCount++
        setCurrentStep(stepCount)
      }

      setSwapping([i + 1, high])
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 600))
      setSwapping([])
      setPivot([])

      return i + 1
    }

    await quickSort(arr, 0, arr.length - 1)
    setSorted(Array.from({ length: arr.length }, (_, i) => i))
    setComparing([])
    setIsPlaying(false)
    setTotalSteps(stepCount)
    setAlgorithmSteps(steps)
    setCurrentStepDescription("Quick sort completed!")
    playSound("complete")
  }

  // Enhanced Dijkstra with distance tracking
  const dijkstraVisualization = async () => {
    const steps: string[] = []
    const distances: { [key: string]: number } = {}
    const visited = new Set<string>()
    let stepCount = 0

    // Initialize distances
    graphNodes.forEach((node) => {
      distances[node.id] = node.id === sourceNode ? 0 : Number.POSITIVE_INFINITY
    })
    setNodeDistances({ ...distances })

    steps.push(`Initializing distances from source ${sourceNode}`)
    setCurrentStepDescription(`Initializing distances from source node ${sourceNode}`)
    await new Promise((resolve) => setTimeout(resolve, 1200 - speed[0] * 10))

    while (visited.size < graphNodes.length) {
      if (isPaused) await new Promise((resolve) => setTimeout(resolve, 100))

      // Find unvisited node with minimum distance
      let current = null
      let minDistance = Number.POSITIVE_INFINITY

      for (const node of graphNodes) {
        if (!visited.has(node.id) && distances[node.id] < minDistance) {
          minDistance = distances[node.id]
          current = node.id
        }
      }

      if (current === null) break

      visited.add(current)
      setHighlightedNodes([current])
      setVisitedNodes([...visited])
      steps.push(`Processing node ${current} with distance ${distances[current]}`)
      setCurrentStepDescription(`Processing node ${current} (distance: ${distances[current]})`)
      playSound("compare")
      await new Promise((resolve) => setTimeout(resolve, 1200 - speed[0] * 10))

      // Update distances to neighbors
      const neighbors = graphEdges.filter((edge) => edge.from === current)
      for (const edge of neighbors) {
        const newDistance = distances[current] + edge.weight!
        if (newDistance < distances[edge.to]) {
          distances[edge.to] = newDistance
          setNodeDistances({ ...distances })
          setHighlightedEdges([`${edge.from}-${edge.to}`])
          steps.push(`Updated distance to ${edge.to}: ${newDistance}`)
          setCurrentStepDescription(`Updated distance to ${edge.to}: ${newDistance}`)
          playSound("swap")
          await new Promise((resolve) => setTimeout(resolve, 800))
          setTraversedEdges((prev) => [...prev, `${edge.from}-${edge.to}`])
        }
      }

      stepCount++
      setCurrentStep(stepCount)
    }

    setHighlightedNodes([])
    setHighlightedEdges([])
    setIsPlaying(false)
    setTotalSteps(stepCount)
    setAlgorithmSteps(steps)
    setCurrentStepDescription("Dijkstra's algorithm completed!")
    playSound("complete")
  }

  // Add Heap Sort implementation
  const heapSortVisualization = async () => {
    const arr = [...array]
    const n = arr.length
    const steps = []
    let stepCount = 0

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i, steps, stepCount)
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      if (isPaused) await new Promise((resolve) => setTimeout(resolve, 100))

      // Move current root to end
      setSwapping([0, i])
      steps.push(`Moving root ${arr[0]} to position ${i}`)
      setCurrentStepDescription(`Moving root ${arr[0]} to sorted position`)
      playSound("swap")
      ;[arr[0], arr[i]] = [arr[i], arr[0]]
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 600))
      setSwapping([])

      setSorted((prev) => [...prev, i])

      // Call heapify on the reduced heap
      await heapify(arr, i, 0, steps, stepCount)
      stepCount++
      setCurrentStep(stepCount)
    }

    setSorted((prev) => [...prev, 0])
    setComparing([])
    setIsPlaying(false)
    setTotalSteps(stepCount)
    setAlgorithmSteps(steps)
    setCurrentStepDescription("Heap sort completed!")
    playSound("complete")
  }

  const heapify = async (arr: number[], n: number, i: number, steps: string[], stepCount: number) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n) {
      setComparing([left, largest])
      playSound("compare")
      await new Promise((resolve) => setTimeout(resolve, 800 - speed[0] * 6))
      if (arr[left] > arr[largest]) {
        largest = left
      }
    }

    if (right < n) {
      setComparing([right, largest])
      playSound("compare")
      await new Promise((resolve) => setTimeout(resolve, 800 - speed[0] * 6))
      if (arr[right] > arr[largest]) {
        largest = right
      }
    }

    if (largest !== i) {
      setSwapping([i, largest])
      steps.push(`Swapping ${arr[i]} and ${arr[largest]} in heap`)
      playSound("swap")
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 600))
      setSwapping([])

      await heapify(arr, n, largest, steps, stepCount)
    }

    setComparing([])
  }

  const mergeSortVisualization = async () => {
    // Placeholder for merge sort visualization
    console.log("Merge Sort Visualization")
  }

  const bfsVisualization = async () => {
    // Placeholder for BFS visualization
    console.log("BFS Visualization")
  }

  const dfsVisualization = async () => {
    // Placeholder for DFS visualization
    console.log("DFS Visualization")
  }

  const resetVisualization = () => {
    setIsPlaying(false)
    setIsPaused(false)
    const algorithm = algorithms.find((a) => a.value === selectedAlgorithm)
    if (algorithm?.type === "sorting") {
      generateRandomArray()
    } else {
      resetVisualizationState()
    }
  }

  const selectedAlgorithmData = algorithms.find((a) => a.value === selectedAlgorithm)
  const isGraphAlgorithm = selectedAlgorithmData?.type === "graph"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Enhanced Controls Panel */}
      <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-purple-400 text-xl">
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Settings className="h-6 w-6 mr-3" />
              </motion.div>
              Interactive 3D Algorithm Visualizer
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                {selectedAlgorithmData?.complexity.time}
              </Badge>
              <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                {selectedAlgorithmData?.complexity.space}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Algorithm Selection */}
            <div className="lg:col-span-2">
              <label className="text-sm font-medium mb-3 block text-gray-300">Algorithm</label>
              <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white backdrop-blur-xl hover:border-purple-400 transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-500/30 backdrop-blur-xl">
                  {algorithms.map((algo) => (
                    <SelectItem
                      key={algo.value}
                      value={algo.value}
                      className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20"
                    >
                      <div>
                        <div className="font-medium">{algo.label}</div>
                        <div className="text-xs text-gray-400">{algo.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="text-sm font-medium mb-3 block text-gray-300">Speed: {speed[0]}%</label>
              <Slider value={speed} onValueChange={setSpeed} max={100} min={10} step={10} className="w-full" />
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-300">Playback</label>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  onClick={stepBackward}
                  disabled={currentStep === 0}
                  className="bg-gray-600 hover:bg-gray-500"
                >
                  <SkipBack className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={isPlaying ? pauseVisualization : startVisualization}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {isPlaying ? (
                    isPaused ? (
                      <Play className="h-3 w-3" />
                    ) : (
                      <Pause className="h-3 w-3" />
                    )
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={stepForward}
                  disabled={currentStep >= totalSteps}
                  className="bg-gray-600 hover:bg-gray-500"
                >
                  <SkipForward className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* 3D Controls */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-300">3D Controls</label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                  className="data-[state=checked]:bg-purple-500"
                />
                <span className="text-xs text-gray-400">Auto Rotate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={showGrid} onCheckedChange={setShowGrid} className="data-[state=checked]:bg-cyan-500" />
                <span className="text-xs text-gray-400">Show Grid</span>
              </div>
            </div>

            {/* Additional Controls */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-300">Options</label>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  onClick={() => setFullscreen(!fullscreen)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Maximize className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={resetVisualization}
                  variant="outline"
                  className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
              {!isGraphAlgorithm && (
                <Button
                  size="sm"
                  onClick={generateRandomArray}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  New Data
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced 3D Visualization */}
      <Card
        className={`bg-black/40 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-500/10 ${fullscreen ? "fixed inset-4 z-50" : ""}`}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl text-cyan-400">
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Eye className="h-6 w-6 mr-3" />
              {selectedAlgorithmData?.label} - Interactive 3D Visualization
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`rounded-lg overflow-hidden border border-cyan-500/20 ${fullscreen ? "h-[calc(100vh-200px)]" : "h-96"}`}
          >
            <Canvas
              camera={{ position: cameraPosition, fov: 60 }}
              onCreated={({ gl }) => {
                gl.setClearColor("#000000", 0)
              }}
            >
              {/* Enhanced Lighting */}
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1.2} color="#00ffff" />
              <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff00ff" />
              <pointLight position={[0, 15, 0]} intensity={0.6} color="#ffff00" />

              {/* Grid Helper */}
              {showGrid && <gridHelper args={[20, 20, "#333333", "#333333"]} position={[0, -2, 0]} />}

              {/* Algorithm Visualization */}
              {isGraphAlgorithm ? (
                <group>
                  {/* Render Graph Nodes */}
                  {graphNodes.map((node) => (
                    <GraphNode
                      key={node.id}
                      node={node}
                      isHighlighted={highlightedNodes.includes(node.id)}
                      isVisited={visitedNodes.includes(node.id)}
                      distance={nodeDistances[node.id]}
                      isSource={node.id === sourceNode}
                      onClick={() => setSourceNode(node.id)}
                    />
                  ))}

                  {/* Render Graph Edges */}
                  {graphEdges.map((edge, index) => {
                    const fromNode = graphNodes.find((n) => n.id === edge.from)
                    const toNode = graphNodes.find((n) => n.id === edge.to)
                    if (!fromNode || !toNode) return null

                    return (
                      <GraphEdge
                        key={index}
                        from={fromNode.position}
                        to={toNode.position}
                        weight={edge.weight}
                        isHighlighted={highlightedEdges.includes(`${edge.from}-${edge.to}`)}
                        isTraversed={traversedEdges.includes(`${edge.from}-${edge.to}`)}
                      />
                    )
                  })}
                </group>
              ) : (
                <group>
                  {/* Render Array Bars */}
                  {array.map((value, index) => (
                    <AnimatedBar
                      key={`${index}-${value}`}
                      value={value}
                      position={[index * 2.5 - (array.length - 1) * 1.25, 0, 0]}
                      isComparing={comparing.includes(index)}
                      isSorted={sorted.includes(index)}
                      isSwapping={swapping.includes(index)}
                      isPivot={pivot.includes(index)}
                      index={index}
                    />
                  ))}
                </group>
              )}

              {/* Enhanced Camera Controls */}
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={autoRotate}
                autoRotateSpeed={2}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={50}
              />
            </Canvas>
          </div>

          {/* Enhanced Info Panel */}
          <motion.div
            className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Progress Panel */}
            <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
              <h3 className="text-purple-400 font-semibold mb-3 flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  ⚡
                </motion.div>
                Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Step:</span>
                  <span className="text-white font-mono text-lg">
                    {currentStep} / {totalSteps || "?"}
                  </span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: totalSteps > 0 ? `${(currentStep / totalSteps) * 100}%` : "0%",
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      width: { duration: 0.3 },
                      backgroundPosition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    }}
                  />
                </div>
                <AnimatePresence>
                  {currentStepDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-gray-300 bg-black/50 p-2 rounded"
                    >
                      {currentStepDescription}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/20">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Algorithm Analysis
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-black/50 p-2 rounded">
                    <span className="text-gray-400 block">Time:</span>
                    <span className="text-cyan-400 font-mono text-lg">{selectedAlgorithmData?.complexity.time}</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded">
                    <span className="text-gray-400 block">Space:</span>
                    <span className="text-green-400 ml-2 capitalize font-medium">
                      {selectedAlgorithmData?.complexity.space}
                    </span>
                  </div>
                </div>
                <div className="bg-black/50 p-2 rounded">
                  <span className="text-gray-400 text-sm">Type:</span>
                  <span className={`ml-2 font-medium ${isPlaying ? "text-green-400" : "text-gray-400"}`}>
                    {isPlaying ? (isPaused ? "Paused" : "Running") : "Ready"}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="p-4 bg-black/30 rounded-lg border border-orange-500/20">
              <h3 className="text-orange-400 font-semibold mb-3 flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                3D Controls
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-black/50 p-2 rounded">
                  <span className="text-gray-400">🖱️ Mouse:</span>
                  <span className="text-white ml-2">Rotate view</span>
                </div>
                <div className="bg-black/50 p-2 rounded">
                  <span className="text-gray-400">🔍 Scroll:</span>
                  <span className="text-white ml-2">Zoom in/out</span>
                </div>
                <div className="bg-black/50 p-2 rounded">
                  <span className="text-gray-400">🎯 Click:</span>
                  <span className="text-white ml-2">
                    {isGraphAlgorithm ? "Select source node" : "Hover for details"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sound:</span>
                  <Badge variant={soundEnabled ? "default" : "secondary"}>{soundEnabled ? "ON" : "OFF"}</Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
