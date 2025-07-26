import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from '../components/ParticleField'
import NeuralGrid from '../components/NeuralGrid'
import FloatingNavigation from '../components/FloatingNavigation'

function TeamWorkspace() {
  const ref = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  // Create team member nodes
  const teamMembers = Array.from({ length: 8 }).map((_, index) => {
    const angle = (index / 8) * Math.PI * 2
    const radius = 2
    return {
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
      role: ['CEO', 'CTO', 'Designer', 'Developer', 'Manager', 'Analyst', 'Marketer', 'Support'][index]
    }
  })

  return (
    <group ref={ref}>
      {/* Central Hub */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ff0033" wireframe />
      </mesh>
      
      {/* Team Members */}
      {teamMembers.map((member, index) => (
        <group key={index} position={member.position}>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
          </mesh>
          
          {/* Connection to center */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([...member.position, 0, 0, 0])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ff0033" transparent opacity={0.3} />
          </line>
        </group>
      ))}
    </group>
  )
}

const enterpriseFeatures = [
  {
    title: "Admin Controls & Team Permissions",
    description: "Granular role-based access control with custom permission sets",
    icon: "👥",
    details: [
      "Role-based access control (RBAC)",
      "Custom permission sets",
      "Team hierarchy management",
      "Audit logs and activity tracking"
    ]
  },
  {
    title: "Advanced Security & Compliance",
    description: "Enterprise-grade security with compliance certifications",
    icon: "🔒",
    details: [
      "SOC 2 Type II certified",
      "GDPR & CCPA compliant",
      "SSO integration (SAML, OAuth)",
      "Data residency options"
    ]
  },
  {
    title: "Custom AI Training",
    description: "Train AI models on your organization's data and workflows",
    icon: "🧠",
    details: [
      "Custom AI model training",
      "Domain-specific knowledge base",
      "Workflow automation",
      "Predictive analytics"
    ]
  },
  {
    title: "Integration with Enterprise Tools",
    description: "Seamless integration with your existing enterprise stack",
    icon: "🔗",
    details: [
      "Slack, Microsoft Teams integration",
      "CRM systems (Salesforce, HubSpot)",
      "Project management (Jira, Asana)",
      "Custom API integrations"
    ]
  }
]

const complianceFeatures = [
  { name: "SOC 2 Type II", status: "Certified", icon: "✅" },
  { name: "ISO 27001", status: "Certified", icon: "✅" },
  { name: "GDPR", status: "Compliant", icon: "✅" },
  { name: "CCPA", status: "Compliant", icon: "✅" },
  { name: "HIPAA", status: "Ready", icon: "🏥" },
  { name: "PCI DSS", status: "Level 1", icon: "💳" }
]

export default function Enterprise() {
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
                  Enterprise
                  <span className="text-red-500 block">AI Productivity</span>
                </h1>
                
                <p className="text-xl text-gray-300 font-rajdhani mb-8">
                  Scale AI-powered productivity across your entire organization with enterprise-grade security, compliance, and custom integrations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="px-8 py-4 bg-red-500 text-white font-rajdhani font-bold text-lg
                               rounded-lg hover:bg-red-600 transition-all duration-300
                               shadow-lg hover:shadow-red-500/25"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(255, 0, 51, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Request Demo
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-4 border-2 border-red-500 text-red-400 font-rajdhani font-bold text-lg
                               rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: '#ff1a4d',
                      boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Sales
                  </motion.button>
                </div>
              </motion.div>
              
              {/* 3D Team Workspace */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative h-96"
              >
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  <TeamWorkspace />
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
                      Team Collaboration
                    </h3>
                    <p className="text-gray-300 font-rajdhani text-sm">
                      Real-time sync across teams
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl lg:text-5xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Enterprise-Grade Features
            </motion.h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {enterpriseFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8
                             hover:border-red-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <motion.div
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 font-rajdhani text-lg group-hover:text-gray-200 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: detailIndex * 0.05 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-red-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: detailIndex * 0.1
                          }}
                        />
                        <span className="text-gray-400 font-rajdhani group-hover:text-gray-300 transition-colors">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Security */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Security & Compliance
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {complianceFeatures.map((compliance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 20px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                             hover:border-red-500/50 transition-all duration-300 group text-center"
                >
                  <div className="text-4xl mb-4">{compliance.icon}</div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {compliance.name}
                  </h3>
                  <p className="text-red-400 font-rajdhani font-medium">
                    {compliance.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment Options */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-orbitron font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Flexible Deployment Options
            </motion.h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Cloud Deployment",
                  description: "Fully managed cloud solution with global CDN",
                  features: ["99.9% uptime SLA", "Auto-scaling", "Global CDN", "Managed updates"],
                  icon: "☁️"
                },
                {
                  title: "On-Premise",
                  description: "Deploy on your own infrastructure for maximum control",
                  features: ["Full data control", "Custom configurations", "Air-gapped deployment", "Dedicated support"],
                  icon: "🏢"
                },
                {
                  title: "Hybrid",
                  description: "Best of both worlds with hybrid deployment",
                  features: ["Flexible data placement", "Gradual migration", "Custom integrations", "Unified management"],
                  icon: "🔄"
                }
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 0, 51, 0.2)'
                  }}
                  className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8
                             hover:border-red-500/50 transition-all duration-300 group"
                >
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{option.icon}</div>
                    <h3 className="text-2xl font-orbitron font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-gray-300 font-rajdhani group-hover:text-gray-200 transition-colors">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-red-500 rounded-full"
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
                        <span className="text-gray-400 font-rajdhani group-hover:text-gray-300 transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-12 max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-orbitron font-bold text-white mb-6">
                Ready to Transform Your Enterprise?
              </h2>
              <p className="text-xl text-gray-300 font-rajdhani mb-8">
                Join leading enterprises who've revolutionized their productivity with MemoMate AI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-red-500 text-white font-rajdhani font-bold text-lg
                             rounded-lg hover:bg-red-600 transition-all duration-300
                             shadow-lg hover:shadow-red-500/25"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(255, 0, 51, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 border-2 border-red-500 text-red-400 font-rajdhani font-bold text-lg
                             rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#ff1a4d',
                    boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Custom Quote
                </motion.button>
              </div>
              
              <div className="flex justify-center space-x-8 mt-8 text-gray-400 font-rajdhani text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Custom onboarding</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}