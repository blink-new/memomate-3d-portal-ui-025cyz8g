import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from '../components/ParticleField'
import NeuralGrid from '../components/NeuralGrid'
import FloatingNavigation from '../components/FloatingNavigation'

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "Forever",
    description: "Perfect for individuals getting started with AI productivity",
    features: [
      "Basic AI Chat Assistant",
      "Up to 2 App Integrations",
      "Local Storage (AES-256)",
      "Basic Task Management",
      "Email Support",
      "Mobile App Access"
    ],
    color: "#666666",
    popular: false
  },
  {
    name: "Pro",
    price: "₹799",
    period: "per month",
    description: "Ideal for professionals and small teams",
    features: [
      "Advanced AI Assistant",
      "Unlimited App Integrations",
      "Cloud + Local Storage",
      "Smart Reminders & Timeline",
      "Multilingual Translation",
      "Priority Support",
      "Team Collaboration",
      "Custom Workflows",
      "API Access"
    ],
    color: "#ff0033",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact Sales",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Role-based Access Control",
      "Admin Dashboard",
      "SSO Integration",
      "Custom AI Training",
      "Dedicated Support",
      "SLA Guarantee",
      "On-premise Deployment",
      "Advanced Analytics"
    ],
    color: "#ff6600",
    popular: false
  }
]

function PricingCube({ position, plan, index }: {
  position: [number, number, number]
  plan: typeof plans[0]
  index: number
}) {
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3 + index * (Math.PI * 2 / 3)
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.1
      ref.current.scale.setScalar(hovered ? 1.2 : 1)
    }
  })

  return (
    <group 
      ref={ref} 
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshBasicMaterial color={plan.color} transparent opacity={0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshBasicMaterial color={plan.color} wireframe />
      </mesh>
    </group>
  )
}

const comparisonFeatures = [
  { name: "AI Chat Assistant", starter: "Basic", pro: "Advanced", enterprise: "Custom AI" },
  { name: "App Integrations", starter: "2", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Storage", starter: "Local", pro: "Cloud + Local", enterprise: "Enterprise" },
  { name: "Team Members", starter: "1", pro: "10", enterprise: "Unlimited" },
  { name: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
  { name: "API Access", starter: "❌", pro: "✅", enterprise: "✅" },
  { name: "SSO Integration", starter: "❌", pro: "❌", enterprise: "✅" },
  { name: "Custom Workflows", starter: "❌", pro: "✅", enterprise: "✅" },
  { name: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Enterprise" }
]

export default function Pricing() {
  const [showComparison, setShowComparison] = useState(false)

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
              Choose Your
              <span className="text-red-500 block">AI Power Level</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Scale your productivity with plans designed for individuals, teams, and enterprises.
            </motion.p>
          </div>
        </section>

        {/* 3D Pricing Cubes */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-96 mb-16"
            >
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                {plans.map((plan, index) => (
                  <PricingCube
                    key={index}
                    position={[(index - 1) * 3, 0, 0]}
                    plan={plan}
                    index={index}
                  />
                ))}
              </Canvas>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 20px 40px ${plan.color}20`
                  }}
                  className={`relative bg-black/20 backdrop-blur-md border rounded-2xl p-8
                             hover:border-opacity-50 transition-all duration-300 group
                             ${plan.popular ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-red-500/30'}`}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1
                                 bg-red-500 text-white font-rajdhani font-bold text-sm rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(255, 0, 51, 0.4)',
                          '0 0 0 10px rgba(255, 0, 51, 0)',
                          '0 0 0 0 rgba(255, 0, 51, 0)'
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      Most Popular
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-orbitron font-bold" style={{ color: plan.color }}>
                        {plan.price}
                      </span>
                      {plan.period !== "Contact Sales" && (
                        <span className="text-gray-400 font-rajdhani ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 font-rajdhani">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: plan.color }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: featureIndex * 0.1
                          }}
                        />
                        <span className="text-gray-300 font-rajdhani group-hover:text-gray-200 transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 font-rajdhani font-bold text-lg rounded-lg transition-all duration-300
                               ${plan.popular 
                                 ? 'bg-red-500 text-white hover:bg-red-600' 
                                 : 'border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500'
                               }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table Toggle */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.button
              onClick={() => setShowComparison(!showComparison)}
              className="px-8 py-4 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-lg
                         text-red-300 font-rajdhani font-medium hover:bg-red-500/30 
                         hover:border-red-400 hover:text-red-200 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255, 0, 51, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {showComparison ? 'Hide' : 'Show'} Detailed Comparison
            </motion.button>
          </div>
        </section>

        {/* Comparison Table */}
        {showComparison && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="py-20"
          >
            <div className="container mx-auto px-6">
              <div className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-red-500/20">
                        <th className="text-left p-6 font-orbitron font-bold text-white">Feature</th>
                        <th className="text-center p-6 font-orbitron font-bold text-gray-400">Starter</th>
                        <th className="text-center p-6 font-orbitron font-bold text-red-400">Pro</th>
                        <th className="text-center p-6 font-orbitron font-bold text-orange-400">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-red-500/10 hover:bg-red-500/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="p-6 font-rajdhani text-gray-300">{feature.name}</td>
                          <td className="p-6 text-center font-rajdhani text-gray-400">{feature.starter}</td>
                          <td className="p-6 text-center font-rajdhani text-red-300">{feature.pro}</td>
                          <td className="p-6 text-center font-rajdhani text-orange-300">{feature.enterprise}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "Can I switch plans anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a free trial for Pro?",
                  answer: "We offer a 14-day free trial for the Pro plan. No credit card required to start."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
                },
                {
                  question: "How secure is my data?",
                  answer: "All data is encrypted with AES-256 encryption. We're SOC 2 Type II certified and GDPR compliant."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                             hover:border-red-500/50 transition-all duration-300"
                >
                  <h4 className="text-xl font-orbitron font-bold text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-300 font-rajdhani">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}