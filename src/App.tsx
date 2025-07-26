import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { 
  Home, 
  MessageCircle, 
  Clock, 
  Bell, 
  BarChart3, 
  Users, 
  Settings,
  Menu,
  X
} from 'lucide-react'

// Import page components
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import Timeline from './pages/Timeline'
import Reminders from './pages/Reminders'
import Analytics from './pages/Analytics'
import TaskSharing from './pages/TaskSharing'
import SettingsPage from './pages/Settings'

// 3D Background Component
function StarField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

// Portal Ring Component
function PortalRing({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-full border-2 ${
        isActive ? 'border-neon-red' : 'border-neon-red/30'
      }`}
      animate={{
        scale: isActive ? [1, 1.1, 1] : 1,
        opacity: isActive ? [0.5, 1, 0.5] : 0.3,
      }}
      transition={{
        duration: 2,
        repeat: isActive ? Infinity : 0,
        ease: "easeInOut"
      }}
      style={{
        boxShadow: isActive 
          ? '0 0 20px #ff0033, inset 0 0 20px #ff0033'
          : '0 0 10px #ff0033, inset 0 0 10px #ff0033'
      }}
    />
  )
}

// Navigation Item Component
function NavItem({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  isMobile = false 
}: {
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
  isMobile?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-3 rounded-full transition-all duration-300 ${
        isMobile ? 'w-12 h-12' : 'w-14 h-14'
      } ${
        isActive 
          ? 'bg-neon-red/20 text-neon-red' 
          : 'bg-black/40 text-gray-400 hover:text-neon-red hover:bg-neon-red/10'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <PortalRing isActive={isActive} />
      <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} relative z-10`} />
      
      {/* Desktop tooltip */}
      {!isMobile && (
        <motion.div
          className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black/80 text-neon-red px-3 py-1 rounded-md text-sm font-orbitron whitespace-nowrap opacity-0 pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.div>
      )}
    </motion.button>
  )
}

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.8 },
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: -100, scale: 0.8 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.8
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sharing', label: 'Task Sharing', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'chat': return <AIChat />
      case 'timeline': return <Timeline />
      case 'reminders': return <Reminders />
      case 'analytics': return <Analytics />
      case 'sharing': return <TaskSharing />
      case 'settings': return <SettingsPage />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-exo overflow-hidden">
      {/* 3D Star Field Background */}
      <StarField />
      
      {/* Floating Particles */}
      <div className="floating-particles fixed inset-0 -z-5" />
      
      {/* Desktop Sidebar */}
      <motion.aside 
        className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center space-y-6 z-50"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="glass-card p-4 rounded-2xl">
          {navigation.map((item) => (
            <div key={item.id} className="mb-4 last:mb-0">
              <NavItem
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
              />
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <motion.header 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card m-4 rounded-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-orbitron font-bold neon-text">MemoMate</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-neon-red/20 text-neon-red"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-4 gap-4">
                {navigation.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    <NavItem
                      icon={item.icon}
                      label={item.label}
                      isActive={currentPage === item.id}
                      onClick={() => {
                        setCurrentPage(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      isMobile
                    />
                    <span className="text-xs mt-2 text-gray-400 font-orbitron">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-20 min-h-screen pt-20 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass-card m-4 rounded-2xl p-4">
          <div className="flex justify-around">
            {navigation.slice(0, 5).map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.id}
                onClick={() => setCurrentPage(item.id)}
                isMobile
              />
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}