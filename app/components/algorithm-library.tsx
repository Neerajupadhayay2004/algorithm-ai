"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Clock,
  Zap,
  Star,
  Eye,
  Code,
  BookOpen,
  X,
  Filter,
  SortAsc,
  Grid,
  List,
  Heart,
  Share2,
  Download,
  Play,
  ChevronRight,
  Tag,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react"
import CodeViewer from "./code-viewer"
import { algorithmDatabase, categories, difficulties, languages, type Algorithm } from "../lib/algorithm-database"

export default function AlgorithmLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [viewingCode, setViewingCode] = useState<number | null>(null)
  const [selectedCodeLanguage, setSelectedCodeLanguage] = useState("javascript")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Memoized filtered and sorted algorithms
  const filteredAlgorithms = useMemo(() => {
    const filtered = algorithmDatabase.filter((algo) => {
      const matchesSearch =
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || algo.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "All" || algo.difficulty === selectedDifficulty
      const matchesLanguage = selectedLanguage === "All" || algo.languages.includes(selectedLanguage)

      return matchesSearch && matchesCategory && matchesDifficulty && matchesLanguage
    })

    // Sort algorithms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case "rating":
          return b.rating - a.rating
        case "views":
          return b.views - a.views
        case "date":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        default: // popularity
          return b.views - a.views
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedLanguage, sortBy])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Sorting: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      Searching: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      Graph: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      "Dynamic Programming": "from-orange-500/20 to-red-500/20 border-orange-500/30",
      Tree: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
      String: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
    }
    return colors[category as keyof typeof colors] || "from-gray-500/20 to-gray-600/20 border-gray-500/30"
  }

  const toggleFavorite = (algorithmId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(algorithmId)) {
      newFavorites.delete(algorithmId)
    } else {
      newFavorites.add(algorithmId)
    }
    setFavorites(newFavorites)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedDifficulty("All")
    setSelectedLanguage("All")
    setSortBy("popularity")
  }

  const AlgorithmCard = ({ algorithm, index }: { algorithm: Algorithm; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card
        className={`bg-gradient-to-br ${getCategoryColor(algorithm.category)} backdrop-blur-xl h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
      >
        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => toggleFavorite(algorithm.id)}
        >
          <Heart className={`h-4 w-4 ${favorites.has(algorithm.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </Button>

        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base md:text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {algorithm.name}
                </CardTitle>
                <p className="text-xs md:text-sm text-gray-300 mt-1 line-clamp-2">{algorithm.description}</p>
              </div>
              <Badge className={`${getDifficultyColor(algorithm.difficulty)} shrink-0 ml-2`}>
                {algorithm.difficulty}
              </Badge>
            </div>

            {/* Category and Tags */}
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs border-cyan-400/50 text-cyan-400">
                {algorithm.category}
              </Badge>
              {algorithm.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="text-xs bg-white/10 text-gray-300">
                  {tag}
                </Badge>
              ))}
              {algorithm.tags.length > 2 && (
                <Badge className="text-xs bg-white/10 text-gray-400">+{algorithm.tags.length - 2}</Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 md:space-y-4">
          {/* Complexity Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 md:h-4 md:w-4 text-cyan-400 shrink-0" />
              <span className="text-gray-400">Time:</span>
              <code className="text-cyan-400 font-mono text-xs">{algorithm.timeComplexity}</code>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-purple-400 shrink-0" />
              <span className="text-gray-400">Space:</span>
              <code className="text-purple-400 font-mono text-xs">{algorithm.spaceComplexity}</code>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400" />
              <span>{algorithm.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span className="hidden sm:inline">{algorithm.views.toLocaleString()}</span>
              <span className="sm:hidden">{(algorithm.views / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center space-x-1">
              <Code className="h-3 w-3" />
              <span>{algorithm.implementations}</span>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-1">
            {algorithm.languages.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs border-white/30 text-white">
                {lang}
              </Badge>
            ))}
            {algorithm.languages.length > 3 && (
              <Badge variant="outline" className="text-xs border-white/30 text-gray-400">
                +{algorithm.languages.length - 3}
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{algorithm.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(algorithm.dateAdded).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-xs md:text-sm"
              onClick={() => setViewingCode(algorithm.id)}
            >
              <Code className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              View Code
            </Button>
            <div className="flex space-x-1 sm:space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xs md:text-sm"
              >
                <Play className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xs md:text-sm"
              >
                <Share2 className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const AlgorithmListItem = ({ algorithm, index }: { algorithm: Algorithm; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group"
    >
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {algorithm.name}
                    </h3>
                    <Badge className={getDifficultyColor(algorithm.difficulty)}>{algorithm.difficulty}</Badge>
                    <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                      {algorithm.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-1">{algorithm.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      <code className="text-cyan-400">{algorithm.timeComplexity}</code>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-purple-400" />
                      <code className="text-purple-400">{algorithm.spaceComplexity}</code>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span>{algorithm.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{algorithm.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => toggleFavorite(algorithm.id)}
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.has(algorithm.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    onClick={() => setViewingCode(algorithm.id)}
                  >
                    <Code className="h-4 w-4 mr-1" />
                    View Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-r from-black/60 via-purple-900/40 to-black/60 backdrop-blur-xl border-purple-500/30 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 animate-pulse" />
        <CardHeader className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-2xl md:text-3xl font-bold">
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 mr-3 text-purple-400" />
                Algorithm Library
              </CardTitle>
              <p className="text-gray-400 mt-2">
                Explore {algorithmDatabase.length} carefully curated algorithms with complete implementations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/50 px-3 py-1">
                {filteredAlgorithms.length} Results
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center text-green-400">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
              {(searchQuery ||
                selectedCategory !== "All" ||
                selectedDifficulty !== "All" ||
                selectedLanguage !== "All") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="border-red-400/50 text-red-400 hover:bg-red-400/10 bg-transparent"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search algorithms, categories, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty} className="text-white hover:bg-white/10">
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {languages.map((language) => (
                      <SelectItem key={language} value={language} className="text-white hover:bg-white/10">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="popularity" className="text-white hover:bg-white/10">
                      Popularity
                    </SelectItem>
                    <SelectItem value="name" className="text-white hover:bg-white/10">
                      Name
                    </SelectItem>
                    <SelectItem value="difficulty" className="text-white hover:bg-white/10">
                      Difficulty
                    </SelectItem>
                    <SelectItem value="rating" className="text-white hover:bg-white/10">
                      Rating
                    </SelectItem>
                    <SelectItem value="views" className="text-white hover:bg-white/10">
                      Views
                    </SelectItem>
                    <SelectItem value="date" className="text-white hover:bg-white/10">
                      Date Added
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <SortAsc className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {filteredAlgorithms.length} of {algorithmDatabase.length}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Algorithm Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAlgorithms.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                : "space-y-4"
            }
          >
            {filteredAlgorithms.map((algorithm, index) =>
              viewMode === "grid" ? (
                <AlgorithmCard key={algorithm.id} algorithm={algorithm} index={index} />
              ) : (
                <AlgorithmListItem key={algorithm.id} algorithm={algorithm} index={index} />
              ),
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No algorithms found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} className="bg-gradient-to-r from-cyan-500 to-purple-500">
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Viewer Modal */}
      <AnimatePresence>
        {viewingCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setViewingCode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-xl border border-white/20 w-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const algorithm = algorithmDatabase.find((a) => a.id === viewingCode)
                if (!algorithm) return null

                return (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/20">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{algorithm.name}</h2>
                        <p className="text-gray-400 mt-1">{algorithm.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingCode(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                      <Tabs defaultValue="code" className="h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-b border-white/20 rounded-none">
                          <TabsTrigger value="code" className="data-[state=active]:bg-slate-700">
                            Code
                          </TabsTrigger>
                          <TabsTrigger value="explanation" className="data-[state=active]:bg-slate-700">
                            Explanation
                          </TabsTrigger>
                          <TabsTrigger value="examples" className="data-[state=active]:bg-slate-700">
                            Examples
                          </TabsTrigger>
                          <TabsTrigger value="test" className="data-[state=active]:bg-slate-700">
                            Test Cases
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="code" className="flex-1 overflow-hidden m-0">
                          <div className="h-full flex flex-col">
                            {/* Language Selector */}
                            <div className="flex items-center justify-between p-4 border-b border-white/20">
                              <Select value={selectedCodeLanguage} onValueChange={setSelectedCodeLanguage}>
                                <SelectTrigger className="w-48 bg-slate-800 border-white/20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/20">
                                  {algorithm.languages.map((lang) => (
                                    <SelectItem
                                      key={lang}
                                      value={lang.toLowerCase()}
                                      className="text-white hover:bg-white/10"
                                    >
                                      {lang}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Open in Editor
                                </Button>
                              </div>
                            </div>

                            {/* Code Display */}
                            <div className="flex-1 overflow-auto">
                              <CodeViewer
                                code={algorithm.code[selectedCodeLanguage] || "// Code not available for this language"}
                                language={selectedCodeLanguage}
                                showLineNumbers={true}
                                className="h-full"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="explanation" className="flex-1 overflow-auto p-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-3">Detailed Description</h3>
                              <p className="text-gray-300 leading-relaxed">{algorithm.detailedDescription}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-md font-semibold text-white mb-2">Time Complexity</h4>
                                <code className="text-cyan-400 bg-slate-800 px-3 py-1 rounded">
                                  {algorithm.timeComplexity}
                                </code>
                              </div>
                              <div>
                                <h4 className="text-md font-semibold text-white mb-2">Space Complexity</h4>
                                <code className="text-purple-400 bg-slate-800 px-3 py-1 rounded">
                                  {algorithm.spaceComplexity}
                                </code>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-md font-semibold text-white mb-3">Applications</h4>
                              <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {algorithm.applications.map((app, index) => (
                                  <li key={index}>{app}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-md font-semibold text-white mb-3">Hints</h4>
                              <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {algorithm.hints.map((hint, index) => (
                                  <li key={index}>{hint}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-md font-semibold text-white mb-3">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {algorithm.tags.map((tag) => (
                                  <Badge key={tag} className="bg-white/10 text-gray-300">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="examples" className="flex-1 overflow-auto p-6">
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white">Examples</h3>
                            {algorithm.examples.map((example, index) => (
                              <Card key={index} className="bg-slate-800 border-white/20">
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="text-sm font-semibold text-green-400 mb-1">Input:</h4>
                                      <code className="text-gray-300 bg-slate-900 px-3 py-1 rounded block">
                                        {example.input}
                                      </code>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-blue-400 mb-1">Output:</h4>
                                      <code className="text-gray-300 bg-slate-900 px-3 py-1 rounded block">
                                        {example.output}
                                      </code>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-yellow-400 mb-1">Explanation:</h4>
                                      <p className="text-gray-300">{example.explanation}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="test" className="flex-1 overflow-auto p-6">
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-white">Test Cases</h3>
                            {algorithm.testCases.map((testCase, index) => (
                              <Card
                                key={index}
                                className={`bg-slate-800 border-white/20 ${testCase.hidden ? "opacity-60" : ""}`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-semibold text-white">Test Case {index + 1}</h4>
                                    {testCase.hidden && (
                                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                                        Hidden
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-sm text-green-400 font-medium">Input: </span>
                                      <code className="text-gray-300 bg-slate-900 px-2 py-1 rounded">
                                        {testCase.input}
                                      </code>
                                    </div>
                                    <div>
                                      <span className="text-sm text-blue-400 font-medium">Expected: </span>
                                      <code className="text-gray-300 bg-slate-900 px-2 py-1 rounded">
                                        {testCase.expected}
                                      </code>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
