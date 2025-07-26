import React from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Mic,
  Video,
  FileText
} from 'lucide-react'

// Floating Card Component
function FloatingCard({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 30px rgba(255, 0, 51, 0.3)"
      }}
    >
      {children}
    </motion.div>
  )
}

// Productivity Score Circle
function ProductivityScore({ score = 85 }: { score?: number }) {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255, 0, 51, 0.2)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#ff0033"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            filter: 'drop-shadow(0 0 10px #ff0033)'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="text-2xl font-orbitron font-bold neon-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {score}%
          </motion.div>
          <div className="text-xs text-gray-400">Productivity</div>
        </div>
      </div>
    </div>
  )
}

// Quick Action Button
function QuickActionButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType
  label: string
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className="glass-card p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-neon-red/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-3 rounded-full bg-neon-red/20 text-neon-red">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-orbitron text-gray-300">{label}</span>
    </motion.button>
  )
}

// Mini Calendar Component
function MiniCalendar() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDate = today.getDate()
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  
  const days = []
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDate
    days.push(
      <motion.div
        key={day}
        className={`w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all ${
          isToday 
            ? 'bg-neon-red text-white neon-glow' 
            : 'text-gray-400 hover:text-neon-red hover:bg-neon-red/20'
        }`}
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: day * 0.01 }}
      >
        {day}
      </motion.div>
    )
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-orbitron font-bold text-neon-red">
          {monthNames[currentMonth]} {currentYear}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="w-8 h-8 flex items-center justify-center text-xs text-gray-500 font-orbitron">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`)
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl lg:text-5xl font-orbitron font-bold neon-text mb-2">
          Welcome back, Commander 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Ready to conquer your productivity goals today?
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Tasks Overview */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingCard delay={0.1}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-semibold text-neon-red">Tasks Today</h3>
              <CheckCircle className="w-6 h-6 text-neon-red" />
            </div>
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="text-sm text-gray-400">8 completed, 4 pending</div>
            <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-neon-red to-neon-red-glow h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '67%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </FloatingCard>

          <FloatingCard delay={0.2}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-semibold text-neon-red">Pending</h3>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-2">4</div>
            <div className="text-sm text-gray-400">Due this week</div>
            <div className="mt-4 flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-8 bg-yellow-500/30 rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
          </FloatingCard>

          <FloatingCard delay={0.3}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-semibold text-neon-red">Upcoming</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-2">7</div>
            <div className="text-sm text-gray-400">Next 7 days</div>
            <div className="mt-4">
              <motion.div 
                className="text-xs text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                +2 from last week
              </motion.div>
            </div>
          </FloatingCard>
        </div>

        {/* Productivity Score */}
        <FloatingCard delay={0.4} className="flex flex-col items-center justify-center">
          <h3 className="font-orbitron font-semibold text-neon-red mb-6">Productivity Score</h3>
          <ProductivityScore score={85} />
          <p className="text-sm text-gray-400 mt-4 text-center">
            Excellent work! You're in the top 10% this week.
          </p>
        </FloatingCard>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <FloatingCard delay={0.5}>
          <h3 className="font-orbitron font-semibold text-neon-red mb-6">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <QuickActionButton
              icon={Plus}
              label="Add Task"
              onClick={() => handleQuickAction('add-task')}
            />
            <QuickActionButton
              icon={Video}
              label="Join Meeting"
              onClick={() => handleQuickAction('join-meeting')}
            />
            <QuickActionButton
              icon={Mic}
              label="Voice Memo"
              onClick={() => handleQuickAction('voice-memo')}
            />
          </div>
        </FloatingCard>

        {/* Mini Calendar */}
        <FloatingCard delay={0.6}>
          <h3 className="font-orbitron font-semibold text-neon-red mb-6">Calendar</h3>
          <MiniCalendar />
        </FloatingCard>
      </div>

      {/* Streak Counter */}
      <motion.div
        className="fixed top-6 right-6 glass-card p-4 rounded-xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-neon-red rounded-full animate-pulse-glow" />
          <span className="font-orbitron text-sm">
            <span className="neon-text font-bold">7</span> day streak
          </span>
        </div>
      </motion.div>
    </div>
  )
}