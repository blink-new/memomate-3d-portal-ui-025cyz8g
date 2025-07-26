import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralNode({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#ff0033" />
    </mesh>
  )
}

function NeuralConnection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const ref = useRef<THREE.Line>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#ff0033" transparent opacity={0.5} />
    </line>
  )
}

function Brain3D() {
  const nodes = [
    [0, 2, 0], [0.5, 1.5, 0], [-0.5, 1.5, 0],
    [0, 1, 0], [0.8, 0.5, 0], [-0.8, 0.5, 0],
    [0, 0, 0], [0.6, -0.5, 0], [-0.6, -0.5, 0],
    [0, -1, 0], [0.4, -1.5, 0], [-0.4, -1.5, 0],
    [0, -2, 0]
  ] as [number, number, number][]

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5],
    [4, 6], [5, 6], [6, 7], [6, 8], [7, 9], [8, 9],
    [9, 10], [9, 11], [10, 12], [11, 12]
  ]

  return (
    <group>
      {nodes.map((position, index) => (
        <NeuralNode key={index} position={position} delay={index * 0.2} />
      ))}
      {connections.map(([start, end], index) => (
        <NeuralConnection 
          key={index} 
          start={nodes[start]} 
          end={nodes[end]} 
        />
      ))}
    </group>
  )
}

const aiThoughts = [
  "Analyzing...",
  "Syncing Tasks...",
  "Optimizing Schedule...",
  "Processing Data...",
  "Learning Patterns...",
  "Connecting Apps..."
]

const appTiles = [
  { name: "WhatsApp", color: "#25D366", task: "Reply to John" },
  { name: "Gmail", color: "#EA4335", task: "Review emails" },
  { name: "Zoom", color: "#2D8CFF", task: "Join meeting at 3PM" },
  { name: "Notion", color: "#000000", task: "Update project notes" },
  { name: "Calendar", color: "#4285F4", task: "Schedule review" }
]

export default function AIBrainPulseStrip() {
  const [currentThought, setCurrentThought] = useState(0)
  const [hoveredTile, setHoveredTile] = useState<number | null>(null)

  // Cycle through AI thoughts
  useState(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % aiThoughts.length)
    }, 2000)
    return () => clearInterval(interval)
  })

  return (
    <div className="relative w-80 h-96">
      {/* 3D Neural Network */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Brain3D />
        </Canvas>
      </div>

      {/* AI Thought Display */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 
                   bg-black/60 backdrop-blur-md border border-red-500/30 rounded-lg"
        key={currentThought}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <span className="text-red-400 font-rajdhani text-sm">
          {aiThoughts[currentThought]}
        </span>
      </motion.div>

      {/* Floating App Tiles */}
      <div className="absolute inset-0 pointer-events-none">
        {appTiles.map((app, index) => {
          const angle = (index / appTiles.length) * Math.PI * 2
          const radius = 120
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={app.name}
              className="absolute w-16 h-16 pointer-events-auto cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, 360]
              }}
              transition={{ 
                delay: index * 0.2,
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              whileHover={{ scale: 1.2, z: 10 }}
              onHoverStart={() => setHoveredTile(index)}
              onHoverEnd={() => setHoveredTile(null)}
            >
              <div className="w-full h-full bg-black/40 backdrop-blur-md border border-red-500/30 
                              rounded-lg flex items-center justify-center relative overflow-hidden">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: app.color }}
                >
                  {app.name.charAt(0)}
                </div>

                {/* Hover Preview */}
                {hoveredTile === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1
                               bg-black/80 backdrop-blur-md border border-red-500/30 rounded-md
                               text-red-300 text-xs font-rajdhani whitespace-nowrap z-10"
                  >
                    {app.task}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}