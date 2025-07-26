import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AIBrainPulseStrip from './AIBrainPulseStrip'
import HolographicMockup from './HolographicMockup'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - AI Brain Pulse Strip */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center lg:justify-start"
        >
          <AIBrainPulseStrip />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl lg:text-7xl font-orbitron font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Your Intelligent
            <motion.span
              className="block text-red-500 relative"
              whileHover={{ 
                textShadow: '0 0 20px rgba(255, 0, 51, 0.8)',
                scale: 1.02
              }}
            >
              Productivity OS
              <motion.div
                className="absolute inset-0 bg-red-500/20 blur-xl -z-10"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-300 font-rajdhani max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Powered by AI. Synced to your life. From chats to calendar — all in one.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-red-500 text-white font-rajdhani font-bold text-lg
                         rounded-lg hover:bg-red-600 transition-all duration-300
                         shadow-lg hover:shadow-red-500/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255, 0, 51, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
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
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Holographic Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12"
          >
            <HolographicMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}