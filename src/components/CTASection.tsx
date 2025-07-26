import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

function FloatingOrb() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <group ref={ref}>
      {/* Main Orb */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ff0033" transparent opacity={0.3} />
      </mesh>
      
      {/* Inner Core */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ff0033" wireframe />
      </mesh>
      
      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.5}>
        <torusGeometry args={[1, 0.05, 8, 32]} />
        <meshBasicMaterial color="#ff0033" />
      </mesh>
    </group>
  )
}

function OrbitingElements() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const useCases = [
    "Schedule Meeting",
    "Reply to Messages", 
    "Set Reminders",
    "Sync Calendar",
    "Track Tasks",
    "Share Files"
  ]

  return (
    <group ref={ref}>
      {useCases.map((useCase, index) => {
        const angle = (index / useCases.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <mesh key={index} position={[x, 0, z]}>
            <boxGeometry args={[0.3, 0.3, 0.1]} />
            <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

const useCases = [
  "Schedule meetings across all platforms",
  "Reply to messages with AI assistance", 
  "Set smart reminders that sync everywhere",
  "Track tasks with intelligent prioritization",
  "Share files with one-click permissions",
  "Translate conversations in real-time"
]

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-96"
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <FloatingOrb />
              <OrbitingElements />
            </Canvas>
            
            {/* Floating Use Cases */}
            <div className="absolute inset-0 pointer-events-none">
              {useCases.slice(0, 3).map((useCase, index) => {
                const positions = [
                  { top: '10%', left: '10%' },
                  { top: '20%', right: '10%' },
                  { bottom: '20%', left: '15%' }
                ]
                
                return (
                  <motion.div
                    key={index}
                    className="absolute bg-black/60 backdrop-blur-md border border-red-500/30 
                               rounded-lg px-3 py-2 text-red-300 text-sm font-rajdhani"
                    style={positions[index]}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {useCase}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-6xl font-orbitron font-bold text-white mb-6">
                Let MemoMate
                <span className="text-red-500 block">Handle It For You</span>
              </h2>
              <p className="text-xl text-gray-300 font-rajdhani">
                Join thousands of professionals who've transformed their productivity with AI-powered task management.
              </p>
            </div>

            {/* Use Cases List */}
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <motion.div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <span className="text-gray-300 font-rajdhani group-hover:text-white transition-colors">
                    {useCase}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                onClick={() => navigate('/login')}
                className="relative px-12 py-6 bg-red-500 text-white font-orbitron font-bold text-xl
                           rounded-2xl overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 50px rgba(255, 0, 51, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Now Free</span>
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400"
                  whileHover={{ 
                    background: [
                      'linear-gradient(45deg, #ff0033, #ff1a4d)',
                      'linear-gradient(45deg, #ff1a4d, #ff0033)',
                      'linear-gradient(45deg, #ff0033, #ff1a4d)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Scan Line Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{ 
                    background: [
                      'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                      'linear-gradient(90deg, transparent 100%, rgba(255, 255, 255, 0.2) 150%, transparent 200%)'
                    ]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center space-x-6 text-gray-400 font-rajdhani text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Free Forever Plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Setup in 2 Minutes</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}