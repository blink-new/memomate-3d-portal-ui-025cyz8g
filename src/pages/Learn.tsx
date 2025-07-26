import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from '../components/ParticleField'
import NeuralGrid from '../components/NeuralGrid'
import FloatingNavigation from '../components/FloatingNavigation'

const categories = [
  { name: 'Productivity', color: '#ff0033', icon: '⚡' },
  { name: 'Tech', color: '#ff1a4d', icon: '💻' },
  { name: 'AI', color: '#ff3366', icon: '🤖' },
  { name: 'Startups', color: '#ff4d80', icon: '🚀' },
  { name: 'Tutorials', color: '#ff6699', icon: '📚' }
]

const resources = [
  {
    title: "Getting Started with MemoMate AI",
    type: "Video Tutorial",
    duration: "12 min",
    category: "Tutorials",
    description: "Complete walkthrough of setting up your AI productivity assistant",
    thumbnail: "🎥",
    difficulty: "Beginner"
  },
  {
    title: "Advanced AI Prompt Engineering",
    type: "Documentation",
    duration: "15 min read",
    category: "AI",
    description: "Master the art of crafting effective prompts for maximum productivity",
    thumbnail: "📖",
    difficulty: "Advanced"
  },
  {
    title: "Integrating with Slack & Teams",
    type: "Video Tutorial",
    duration: "8 min",
    category: "Tech",
    description: "Step-by-step guide to connect MemoMate with your team communication tools",
    thumbnail: "🎥",
    difficulty: "Intermediate"
  },
  {
    title: "Building a Productivity System",
    type: "Guide",
    duration: "20 min read",
    category: "Productivity",
    description: "Framework for creating a sustainable productivity workflow with AI",
    thumbnail: "📋",
    difficulty: "Intermediate"
  },
  {
    title: "Startup Productivity Hacks",
    type: "Article",
    duration: "10 min read",
    category: "Startups",
    description: "How early-stage startups use AI to scale their operations efficiently",
    thumbnail: "📰",
    difficulty: "Beginner"
  },
  {
    title: "API Integration Masterclass",
    type: "Video Tutorial",
    duration: "25 min",
    category: "Tech",
    description: "Deep dive into MemoMate's API for custom integrations",
    thumbnail: "🎥",
    difficulty: "Advanced"
  }
]

function FloatingShelf({ position, resources, index }: {
  position: [number, number, number]
  resources: typeof resources
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.1
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Shelf */}
      <mesh>
        <boxGeometry args={[3, 0.1, 0.5]} />
        <meshBasicMaterial color="#ff0033" transparent opacity={0.3} />
      </mesh>
      
      {/* Books/Resources */}
      {Array.from({ length: 5 }).map((_, bookIndex) => (
        <mesh key={bookIndex} position={[-1.2 + bookIndex * 0.6, 0.3, 0]}>
          <boxGeometry args={[0.4, 0.6, 0.1]} />
          <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticleField />
      <NeuralGrid />
      
      {/* Navigation */}
      <FloatingNavigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-5xl lg:text-7xl font-orbitron font-bold text-white mb-8">
                  Learn &
                  <span className="text-red-500 block">Master AI</span>
                </h1>
                
                <p className="text-xl text-gray-300 font-rajdhani mb-8">
                  Discover tutorials, guides, and best practices to maximize your productivity with AI-powered tools.
                </p>
                
                {/* Search Bar */}
                <div className="relative mb-8">
                  <input
                    type="text"
                    placeholder="Search tutorials, guides, and tips..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 bg-black/30 backdrop-blur-md border border-red-500/30 
                               rounded-2xl text-white placeholder-gray-500 font-rajdhani text-lg
                               focus:border-red-500/50 focus:outline-none transition-colors"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                    🔍
                  </div>
                </div>
              </motion.div>
              
              {/* 3D Floating Shelves */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative h-96"
              >
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <FloatingShelf
                      key={index}
                      position={[0, index * 1.5 - 1, 0]}
                      resources={resources}
                      index={index}
                    />
                  ))}
                </Canvas>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="text-center bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-4"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <h3 className="text-lg font-orbitron font-bold text-red-400 mb-1">
                      Knowledge Library
                    </h3>
                    <p className="text-gray-300 font-rajdhani text-sm">
                      100+ Resources Available
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-3 rounded-2xl font-rajdhani font-medium transition-all duration-300
                           ${selectedCategory === 'All' 
                             ? 'bg-red-500 text-white' 
                             : 'bg-black/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/10'
                           }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Categories
              </motion.button>
              
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-2xl font-rajdhani font-medium transition-all duration-300
                             flex items-center space-x-2
                             ${selectedCategory === category.name 
                               ? 'bg-red-500 text-white' 
                               : 'bg-black/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/10'
                             }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                             hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {resource.thumbnail}
                    </motion.div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-400 font-rajdhani text-sm font-medium">
                        {resource.type}
                      </span>
                      <span className="text-gray-500 font-rajdhani text-sm">
                        {resource.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-rajdhani font-medium
                                     ${resource.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                       resource.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                       'bg-red-500/20 text-red-400'}`}>
                        {resource.difficulty}
                      </span>
                      <span className="text-gray-400 font-rajdhani text-sm">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-400 font-rajdhani group-hover:text-gray-300 transition-colors">
                      {resource.description}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <motion.div
                    className="mt-6 h-1 bg-black/30 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${Math.random() * 100}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            {filteredResources.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                  No resources found
                </h3>
                <p className="text-gray-400 font-rajdhani">
                  Try adjusting your search or category filter
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.div
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center
                       shadow-lg cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 30px rgba(255, 0, 51, 0.6)'
            }}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(255, 0, 51, 0.4)',
                '0 0 0 20px rgba(255, 0, 51, 0)',
                '0 0 0 0 rgba(255, 0, 51, 0)'
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            <span className="text-2xl">🤖</span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 right-0 bg-black/80 backdrop-blur-md border border-red-500/30 
                       rounded-lg p-3 text-red-300 font-rajdhani text-sm whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            Need help finding resources?
          </motion.div>
        </motion.div>

        {/* Featured Learning Path */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Recommended Learning Path
            </motion.h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 via-red-500 to-red-500/50" />
                
                {/* Learning Steps */}
                <div className="space-y-12">
                  {[
                    { title: "Setup & Basics", duration: "30 min", description: "Get started with MemoMate fundamentals" },
                    { title: "AI Integration", duration: "45 min", description: "Connect your favorite apps and tools" },
                    { title: "Advanced Features", duration: "60 min", description: "Master automation and custom workflows" },
                    { title: "Team Collaboration", duration: "30 min", description: "Scale productivity across your team" }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-8"
                    >
                      {/* Step Number */}
                      <motion.div
                        className="relative w-16 h-16 bg-red-500 rounded-full flex items-center justify-center
                                   text-white font-orbitron font-bold text-xl z-10"
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 20px rgba(255, 0, 51, 0.5)'
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      
                      {/* Step Content */}
                      <div className="flex-1 bg-black/20 backdrop-blur-md border border-red-500/30 
                                      rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-orbitron font-bold text-white">
                            {step.title}
                          </h3>
                          <span className="text-red-400 font-rajdhani text-sm">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 font-rajdhani">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}