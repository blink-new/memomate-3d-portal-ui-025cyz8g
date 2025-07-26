import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const features = [
  {
    title: "Unified AI Chat",
    description: "WhatsApp, Gmail, Zoom, Notion sync",
    icon: "💬"
  },
  {
    title: "Smart Reminders",
    description: "Timeline sync across all platforms",
    icon: "⏰"
  },
  {
    title: "Multilingual Engine",
    description: "Real-time translation support",
    icon: "🌐"
  },
  {
    title: "Dual Storage",
    description: "Cloud + Local AES-256 encryption",
    icon: "🔒"
  },
  {
    title: "Theme Sync",
    description: "Consistent experience across devices",
    icon: "🎨"
  },
  {
    title: "Task Sharing",
    description: "1-click sharing with permissions",
    icon: "👥"
  }
]

function OrbitingTile({ position, rotation, feature, index }: {
  position: [number, number, number]
  rotation: [number, number, number]
  feature: typeof features[0]
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 + index * (Math.PI * 2 / features.length)
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.3 + index * (Math.PI * 2 / features.length)) * 3
      ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.3 + index * (Math.PI * 2 / features.length)) * 3
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshBasicMaterial color="#ff0033" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function CentralBrain() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ff0033" wireframe />
      </mesh>
    </group>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-orbitron font-bold text-white mb-6">
            AI-Powered
            <span className="text-red-500 block">Features</span>
          </h2>
          <p className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto">
            Experience the future of productivity with our advanced AI integration system
          </p>
        </motion.div>

        {/* 3D Orbiting Features */}
        <div className="relative h-96 mb-16">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <CentralBrain />
            {features.map((feature, index) => (
              <OrbitingTile
                key={index}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                feature={feature}
                index={index}
              />
            ))}
          </Canvas>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                boxShadow: '0 20px 40px rgba(255, 0, 51, 0.2)'
              }}
              className="group relative bg-black/20 backdrop-blur-md border border-red-500/30 
                         rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-orbitron font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 font-rajdhani group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                whileHover={{
                  background: [
                    'linear-gradient(90deg, transparent 0%, rgba(255, 0, 51, 0.1) 50%, transparent 100%)',
                    'linear-gradient(90deg, transparent 100%, rgba(255, 0, 51, 0.1) 150%, transparent 200%)'
                  ]
                }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}