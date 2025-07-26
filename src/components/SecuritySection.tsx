import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Shield3D() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Create shield geometry
  const shieldGeometry = new THREE.ConeGeometry(1, 2, 6)
  
  return (
    <group ref={ref}>
      <mesh geometry={shieldGeometry}>
        <meshBasicMaterial color="#ff0033" wireframe />
      </mesh>
      
      {/* Inner glow */}
      <mesh geometry={shieldGeometry} scale={0.8}>
        <meshBasicMaterial color="#ff0033" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function DataFlow() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, index) => {
        child.position.x = Math.sin(state.clock.elapsedTime * 2 + index) * 3
        child.position.y = Math.cos(state.clock.elapsedTime * 1.5 + index) * 2
      })
    }
  })

  return (
    <group ref={ref}>
      {Array.from({ length: 20 }).map((_, index) => (
        <mesh key={index} position={[Math.random() * 6 - 3, Math.random() * 4 - 2, Math.random() * 2 - 1]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ff0033" />
        </mesh>
      ))}
    </group>
  )
}

const securityFeatures = [
  "AES-256 Encryption",
  "GDPR Compliant",
  "No Data Selling",
  "Privacy-First AI",
  "Zero-Knowledge Architecture",
  "End-to-End Encryption"
]

export default function SecuritySection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - 3D Shield */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-96"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Shield3D />
              <DataFlow />
            </Canvas>
            
            {/* Encrypted Tunnel Visual */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-red-500/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
                Military-Grade
                <span className="text-red-500 block">Security</span>
              </h2>
              <p className="text-xl text-gray-300 font-rajdhani">
                Your data is protected by the same encryption standards used by governments and financial institutions worldwide.
              </p>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-lg p-4
                             hover:border-red-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    <span className="text-gray-300 font-rajdhani font-medium group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-6"
            >
              <h3 className="text-lg font-orbitron font-bold text-red-400 mb-3">
                Compliance & Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CCPA', 'HIPAA Ready'].map((cert, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-black/30 border border-red-500/20 rounded-full 
                               text-red-300 text-sm font-rajdhani"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(255, 0, 51, 0.1)'
                    }}
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}