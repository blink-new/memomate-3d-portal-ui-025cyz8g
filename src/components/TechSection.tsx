import { motion } from 'framer-motion'

const techStack = [
  { name: 'OpenAI', logo: '🤖', color: '#00A67E' },
  { name: 'Google AI', logo: '🧠', color: '#4285F4' },
  { name: 'LangChain', logo: '🔗', color: '#1C3A3A' },
  { name: 'Firebase', logo: '🔥', color: '#FFCA28' },
  { name: 'MongoDB', logo: '🍃', color: '#47A248' },
  { name: 'Hugging Face', logo: '🤗', color: '#FFD21E' },
  { name: 'Zapier', logo: '⚡', color: '#FF4A00' },
  { name: 'Stripe', logo: '💳', color: '#635BFF' }
]

export default function TechSection() {
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
          <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6">
            Powered by
            <span className="text-red-500 block">AI Technology</span>
          </h2>
          <p className="text-xl text-gray-300 font-rajdhani max-w-3xl mx-auto">
            Built on the world's most advanced AI and cloud infrastructure
          </p>
        </motion.div>

        {/* Tech Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500/50 via-red-500 to-red-500/50" />

          {/* Tech Stack Items */}
          <div className="space-y-12">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-center space-x-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                  {/* Tech Card */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 20px 40px rgba(255, 0, 51, 0.3)'
                    }}
                    className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                               hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Logo */}
                      <motion.div
                        className="text-4xl"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {tech.logo}
                      </motion.div>

                      {/* Info */}
                      <div>
                        <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-red-300 transition-colors">
                          {tech.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
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
                          <span className="text-gray-400 font-rajdhani text-sm">
                            Active Integration
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                      className="mt-4 h-1 bg-black/30 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 to-red-400"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Timeline Node */}
                  <motion.div
                    className="relative w-6 h-6 bg-red-500 rounded-full border-4 border-black z-10"
                    whileInView={{ 
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(255, 0, 51, 0.4)',
                        '0 0 0 20px rgba(255, 0, 51, 0)',
                        '0 0 0 0 rgba(255, 0, 51, 0)'
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <motion.div
                      className="absolute inset-1 bg-red-400 rounded-full"
                      animate={{ 
                        scale: [1, 0.8, 1],
                        opacity: [1, 0.6, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
              Enterprise-Grade Infrastructure
            </h3>
            <p className="text-gray-300 font-rajdhani mb-6">
              99.9% uptime guarantee with global CDN and real-time synchronization
            </p>
            <div className="flex justify-center space-x-8">
              {['99.9% Uptime', 'Global CDN', 'Real-time Sync', 'Auto Scaling'].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2 animate-pulse" />
                  <span className="text-red-300 font-rajdhani text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}