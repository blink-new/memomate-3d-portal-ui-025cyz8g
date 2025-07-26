import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle,
  Mail,
  MessageSquare,
  Video,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Task {
  id: string
  title: string
  time: string
  app: 'whatsapp' | 'gmail' | 'zoom' | 'notes'
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const timeframes = ['Today', 'Tomorrow', 'This Week', 'This Month']

const sampleTasks: Record<string, Task[]> = {
  'Today': [
    { id: '1', title: 'Team standup meeting', time: '09:00', app: 'zoom', completed: true, priority: 'high' },
    { id: '2', title: 'Reply to client emails', time: '10:30', app: 'gmail', completed: true, priority: 'medium' },
    { id: '3', title: 'Review project proposal', time: '14:00', app: 'notes', completed: false, priority: 'high' },
    { id: '4', title: 'Call with design team', time: '16:00', app: 'whatsapp', completed: false, priority: 'medium' },
  ],
  'Tomorrow': [
    { id: '5', title: 'Quarterly review meeting', time: '10:00', app: 'zoom', completed: false, priority: 'high' },
    { id: '6', title: 'Update project documentation', time: '13:00', app: 'notes', completed: false, priority: 'medium' },
    { id: '7', title: 'Client presentation prep', time: '15:30', app: 'notes', completed: false, priority: 'high' },
  ],
  'This Week': [
    { id: '8', title: 'Sprint planning session', time: 'Wed 09:00', app: 'zoom', completed: false, priority: 'high' },
    { id: '9', title: 'Code review with team', time: 'Thu 14:00', app: 'notes', completed: false, priority: 'medium' },
    { id: '10', title: 'Weekly team sync', time: 'Fri 16:00', app: 'zoom', completed: false, priority: 'low' },
  ],
  'This Month': [
    { id: '11', title: 'Product launch preparation', time: 'Week 3', app: 'notes', completed: false, priority: 'high' },
    { id: '12', title: 'User feedback analysis', time: 'Week 4', app: 'gmail', completed: false, priority: 'medium' },
  ]
}

// App Icon Component
function AppIcon({ app }: { app: Task['app'] }) {
  const iconProps = { className: "w-4 h-4" }
  
  switch (app) {
    case 'whatsapp':
      return <MessageSquare {...iconProps} className="w-4 h-4 text-green-500" />
    case 'gmail':
      return <Mail {...iconProps} className="w-4 h-4 text-red-500" />
    case 'zoom':
      return <Video {...iconProps} className="w-4 h-4 text-blue-500" />
    case 'notes':
      return <FileText {...iconProps} className="w-4 h-4 text-yellow-500" />
    default:
      return <Circle {...iconProps} />
  }
}

// 3D Task Cube Component
function TaskCube({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const priorityColors = {
    low: 'border-green-500/50 bg-green-500/10',
    medium: 'border-yellow-500/50 bg-yellow-500/10',
    high: 'border-red-500/50 bg-red-500/10'
  }

  return (
    <motion.div
      className={`glass-card p-4 rounded-xl min-w-[280px] cursor-pointer transition-all duration-300 ${
        priorityColors[task.priority]
      } ${task.completed ? 'opacity-60' : ''}`}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        boxShadow: "0 10px 30px rgba(255, 0, 51, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(task.id)}
      initial={{ opacity: 0, x: 50, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AppIcon app={task.app} />
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {task.app}
          </span>
        </div>
        <motion.button
          className={`p-1 rounded-full transition-all ${
            task.completed 
              ? 'text-neon-red bg-neon-red/20' 
              : 'text-gray-400 hover:text-neon-red hover:bg-neon-red/10'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </motion.button>
      </div>
      
      <h3 className={`font-orbitron font-semibold mb-2 ${
        task.completed ? 'line-through text-gray-500' : 'text-white'
      }`}>
        {task.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{task.time}</span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {task.priority}
        </div>
      </div>
    </motion.div>
  )
}

// Portal Ring for timeframe navigation
function TimeframePortal({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string
  isActive: boolean
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-full font-orbitron font-semibold transition-all duration-300 ${
        isActive 
          ? 'bg-neon-red/20 text-neon-red border-2 border-neon-red' 
          : 'bg-black/40 text-gray-400 border-2 border-gray-700 hover:border-neon-red/50 hover:text-neon-red'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-red"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 20px #ff0033, inset 0 0 20px #ff0033'
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  )
}

export default function Timeline() {
  const [currentTimeframe, setCurrentTimeframe] = useState('Today')
  const [tasks, setTasks] = useState(sampleTasks)

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [currentTimeframe]: prev[currentTimeframe].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }))
  }

  const currentTasks = tasks[currentTimeframe] || []
  const completedCount = currentTasks.filter(task => task.completed).length

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
          Timeline Portal
        </h1>
        <p className="text-gray-400 text-lg">
          Navigate through your tasks across time dimensions
        </p>
      </motion.div>

      {/* Timeframe Navigation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {timeframes.map((timeframe) => (
            <TimeframePortal
              key={timeframe}
              label={timeframe}
              isActive={currentTimeframe === timeframe}
              onClick={() => setCurrentTimeframe(timeframe)}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="glass-card p-6 rounded-2xl mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-orbitron font-bold neon-text">
              {currentTimeframe}
            </h2>
            <p className="text-gray-400">
              {completedCount} of {currentTasks.length} tasks completed
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completedCount}</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {currentTasks.length - completedCount}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-red">
                {Math.round((completedCount / currentTasks.length) * 100) || 0}%
              </div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-neon-red to-neon-red-glow h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / currentTasks.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Task Grid */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {currentTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {currentTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TaskCube task={task} onToggle={handleTaskToggle} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron font-semibold text-gray-400 mb-2">
              No tasks scheduled
            </h3>
            <p className="text-gray-500">
              Your {currentTimeframe.toLowerCase()} timeline is clear. Time to plan ahead!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Navigation Arrows */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4">
        <motion.button
          className="glass-card p-3 rounded-full text-neon-red hover:bg-neon-red/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const currentIndex = timeframes.indexOf(currentTimeframe)
            if (currentIndex > 0) {
              setCurrentTimeframe(timeframes[currentIndex - 1])
            }
          }}
          disabled={timeframes.indexOf(currentTimeframe) === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          className="glass-card p-3 rounded-full text-neon-red hover:bg-neon-red/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const currentIndex = timeframes.indexOf(currentTimeframe)
            if (currentIndex < timeframes.length - 1) {
              setCurrentTimeframe(timeframes[currentIndex + 1])
            }
          }}
          disabled={timeframes.indexOf(currentTimeframe) === timeframes.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}