import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Plus, 
  Mic, 
  Clock, 
  Calendar,
  Trash2,
  Edit3
} from 'lucide-react'

interface Reminder {
  id: string
  title: string
  description: string
  time: string
  date: string
  priority: 'low' | 'medium' | 'high'
  isActive: boolean
}

const sampleReminders: Reminder[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly standup with the development team',
    time: '09:00',
    date: 'Today',
    priority: 'high',
    isActive: true
  },
  {
    id: '2',
    title: 'Call Mom',
    description: 'Birthday wishes and catch up',
    time: '18:00',
    date: 'Today',
    priority: 'medium',
    isActive: true
  },
  {
    id: '3',
    title: 'Gym Session',
    description: 'Leg day workout routine',
    time: '07:00',
    date: 'Tomorrow',
    priority: 'low',
    isActive: true
  }
]

function ReminderCard({ reminder, onDelete }: { reminder: Reminder; onDelete: (id: string) => void }) {
  const priorityColors = {
    low: 'border-green-500/50 bg-green-500/10',
    medium: 'border-yellow-500/50 bg-yellow-500/10',
    high: 'border-red-500/50 bg-red-500/10'
  }

  return (
    <motion.div
      className={`glass-card p-6 rounded-xl ${priorityColors[reminder.priority]}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 0, 51, 0.3)" }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-neon-red/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-neon-red" />
          </div>
          <div>
            <h3 className="font-orbitron font-semibold text-white">{reminder.title}</h3>
            <p className="text-sm text-gray-400">{reminder.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 rounded-full text-gray-400 hover:text-neon-red hover:bg-neon-red/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => onDelete(reminder.id)}
            className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{reminder.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{reminder.date}</span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          reminder.priority === 'high' ? 'bg-red-500/20 text-red-400' :
          reminder.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {reminder.priority}
        </div>
      </div>
    </motion.div>
  )
}

export default function Reminders() {
  const [reminders, setReminders] = useState(sampleReminders)
  const [isRecording, setIsRecording] = useState(false)

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
  }

  const nextReminder = reminders.find(r => r.isActive)

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
          Smart Reminders
        </h1>
        <p className="text-gray-400 text-lg">
          Never miss what matters most
        </p>
      </motion.div>

      {/* Next Reminder Highlight */}
      {nextReminder && (
        <motion.div
          className="glass-card p-6 rounded-2xl mb-8 border-2 border-neon-red/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-orbitron font-bold neon-text mb-2">
                Next Reminder
              </h2>
              <h3 className="text-lg font-semibold text-white">{nextReminder.title}</h3>
              <p className="text-gray-400">{nextReminder.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-orbitron font-bold neon-text">
                {nextReminder.time}
              </div>
              <div className="text-gray-400">{nextReminder.date}</div>
            </div>
          </div>
          
          <motion.div
            className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-neon-red to-neon-red-glow"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Add Reminder Section */}
      <motion.div
        className="glass-card p-6 rounded-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-xl font-orbitron font-semibold neon-text mb-4">
          Add New Reminder
        </h2>
        
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={handleVoiceRecord}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-orbitron font-semibold transition-all ${
              isRecording 
                ? 'bg-red-500/20 text-red-400 border-2 border-red-500' 
                : 'bg-neon-red/20 text-neon-red border-2 border-neon-red hover:bg-neon-red/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-5 h-5" />
            <span>{isRecording ? 'Recording...' : 'Voice Reminder'}</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-neon-red/50 hover:text-neon-red transition-all font-orbitron font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Manual Entry</span>
          </motion.button>
        </div>
        
        {isRecording && (
          <motion.div
            className="mt-4 flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-400 rounded-full"
                  animate={{
                    height: [4, 20, 4],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <span className="text-red-400 text-sm">Listening...</span>
          </motion.div>
        )}
      </motion.div>

      {/* Reminders List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-xl font-orbitron font-semibold neon-text mb-4">
          All Reminders ({reminders.length})
        </h2>
        
        <AnimatePresence>
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onDelete={handleDeleteReminder}
            />
          ))}
        </AnimatePresence>
        
        {reminders.length === 0 && (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron font-semibold text-gray-400 mb-2">
              No reminders set
            </h3>
            <p className="text-gray-500">
              Add your first reminder using voice or manual entry
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}