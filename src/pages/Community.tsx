import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from '../components/ParticleField'
import NeuralGrid from '../components/NeuralGrid'
import FloatingNavigation from '../components/FloatingNavigation'

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "👩‍💼",
    feedback: "MemoMate transformed how our team collaborates. The AI integration is seamless!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    avatar: "👨‍💻",
    feedback: "Finally, an AI assistant that actually understands my workflow. Game changer!",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Designer",
    company: "CreativeStudio",
    avatar: "👩‍🎨",
    feedback: "The multilingual support helped me work with international clients effortlessly.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Developer",
    company: "CodeBase",
    avatar: "👨‍💻",
    feedback: "Integration with all my dev tools was surprisingly smooth. Love the API!",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "GrowthCo",
    avatar: "👩‍💼",
    feedback: "MemoMate's task sharing features revolutionized our campaign management.",
    rating: 5
  },
  {
    name: "Alex Johnson",
    role: "Consultant",
    company: "StrategyPro",
    avatar: "👨‍💼",
    feedback: "The security features give me confidence to use it with sensitive client data.",
    rating: 5
  }
]

function AvatarNode({ position, testimonial, index }: {
  position: [number, number, number]
  testimonial: typeof testimonials[0]
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 + index * (Math.PI * 2 / testimonials.length)
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.1 + index * (Math.PI * 2 / testimonials.length)) * 4
      ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.1 + index * (Math.PI * 2 / testimonials.length)) * 4
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.5
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
      </mesh>
      <mesh scale={1.2}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color="#ff0033" wireframe />
      </mesh>
    </group>
  )
}

const qnaFeed = [
  {
    question: "How does MemoMate integrate with Slack?",
    answer: "MemoMate connects to Slack via secure OAuth and can sync messages, create tasks from threads, and send smart reminders directly to your channels.",
    user: "TechLead_Mike",
    time: "2 hours ago"
  },
  {
    question: "Can I use MemoMate offline?",
    answer: "Yes! MemoMate has offline capabilities with local storage. Your data syncs automatically when you're back online.",
    user: "ProductivityGuru",
    time: "4 hours ago"
  },
  {
    question: "What languages does the AI support?",
    answer: "MemoMate supports 50+ languages with real-time translation. Perfect for international teams!",
    user: "GlobalManager",
    time: "6 hours ago"
  }
]

export default function Community() {
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
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl lg:text-7xl font-orbitron font-bold text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Join the
              <span className="text-red-500 block">MemoMate Community</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connect with thousands of productivity enthusiasts, share tips, and discover new ways to optimize your workflow with AI.
            </motion.p>
          </div>
        </section>

        {/* 3D Avatar Galaxy */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-96 mb-16"
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                {testimonials.map((testimonial, index) => (
                  <AvatarNode
                    key={index}
                    position={[0, 0, 0]}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </Canvas>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="text-center bg-black/60 backdrop-blur-md border border-red-500/30 rounded-2xl p-6"
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
                  <h3 className="text-2xl font-orbitron font-bold text-red-400 mb-2">
                    10,000+ Active Users
                  </h3>
                  <p className="text-gray-300 font-rajdhani">
                    Click any node to see real testimonials
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              What Our Community Says
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                             hover:border-red-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-orbitron font-bold text-white group-hover:text-red-300 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 font-rajdhani text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 font-rajdhani mb-4 group-hover:text-gray-200 transition-colors">
                    "{testimonial.feedback}"
                  </p>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-red-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Q&A Feed */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Live Community Q&A
            </motion.h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {qnaFeed.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                             hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-red-400 font-rajdhani font-medium">
                          @{item.user}
                        </span>
                        <span className="text-gray-500 font-rajdhani text-sm">
                          {item.time}
                        </span>
                      </div>
                      
                      <h4 className="text-white font-orbitron font-bold mb-3">
                        {item.question}
                      </h4>
                      
                      <p className="text-gray-300 font-rajdhani">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
                transition={{ delay: 1 }}
              >
                Ask me anything about MemoMate!
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}