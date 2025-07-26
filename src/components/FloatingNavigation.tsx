import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Community', path: '/community' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Enterprise', path: '/enterprise' },
  { name: 'Learn', path: '/learn' }
]

export default function FloatingNavigation() {
  const navigate = useNavigate()

  return (
    <div className="fixed top-8 left-8 z-50">
      <div className="flex flex-col space-y-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <motion.button
              onClick={() => navigate(item.path)}
              className="relative w-12 h-12 bg-black/20 backdrop-blur-md border border-red-500/30 rounded-lg
                         flex items-center justify-center text-red-400 hover:text-red-300
                         hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)',
                rotateY: 15
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1 
                           bg-black/80 backdrop-blur-md border border-red-500/30 rounded-md
                           text-red-300 text-sm font-rajdhani whitespace-nowrap
                           pointer-events-none"
              >
                {item.name}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 
                               w-2 h-2 bg-black/80 border-l border-b border-red-500/30 
                               rotate-45" />
              </motion.div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <motion.button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-lg
                     text-red-300 font-rajdhani font-medium hover:bg-red-500/30 
                     hover:border-red-400 hover:text-red-200 transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 25px rgba(255, 0, 51, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  )
}