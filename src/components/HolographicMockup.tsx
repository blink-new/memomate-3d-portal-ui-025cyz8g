import { motion } from 'framer-motion'

export default function HolographicMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main Mockup Container */}
      <motion.div
        className="relative bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6
                   shadow-2xl shadow-red-500/10"
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-rajdhani text-sm">MemoMate AI</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500/50 rounded-full" />
            <div className="w-2 h-2 bg-red-500/30 rounded-full" />
            <div className="w-2 h-2 bg-red-500/20 rounded-full" />
          </div>
        </div>

        {/* Chat Interface */}
        <div className="space-y-3 mb-4">
          <motion.div
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 text-sm font-rajdhani">
              Good morning! You have 3 tasks due today.
            </p>
          </motion.div>

          <motion.div
            className="bg-black/30 border border-red-500/20 rounded-lg p-3 ml-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-400 text-sm font-rajdhani">
              Show me my schedule
            </p>
          </motion.div>

          <motion.div
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-300 text-sm font-rajdhani">
              Here's your schedule synced from all apps:
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-400">WhatsApp: Reply to team</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-400">Zoom: Meeting at 3PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Input Field */}
        <motion.div
          className="flex items-center space-x-2 bg-black/30 border border-red-500/20 rounded-lg p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex-1 text-gray-500 text-sm font-rajdhani">
            Type your message...
          </div>
          <motion.div
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            animate={{ 
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
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ 
            background: [
              'linear-gradient(90deg, transparent 0%, rgba(255, 0, 51, 0.1) 50%, transparent 100%)',
              'linear-gradient(90deg, transparent 100%, rgba(255, 0, 51, 0.1) 150%, transparent 200%)'
            ]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-red-500/20 backdrop-blur-md 
                   border border-red-500/30 rounded-lg flex items-center justify-center"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-2 h-2 bg-red-500 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500/20 backdrop-blur-md 
                   border border-red-500/30 rounded-full flex items-center justify-center"
        animate={{ 
          rotate: -360,
          y: [0, -10, 0]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
      </motion.div>
    </div>
  )
}