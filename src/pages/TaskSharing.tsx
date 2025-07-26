import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Share2,
  MessageSquare
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  status: 'online' | 'offline' | 'busy'
}

interface SharedTask {
  id: string
  title: string
  description: string
  assignedTo: string[]
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  progress: number
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Alex Chen', avatar: '👨‍💻', role: 'Developer', status: 'online' },
  { id: '2', name: 'Sarah Kim', avatar: '👩‍🎨', role: 'Designer', status: 'online' },
  { id: '3', name: 'Mike Johnson', avatar: '👨‍💼', role: 'Manager', status: 'busy' },
  { id: '4', name: 'Emma Davis', avatar: '👩‍💻', role: 'Developer', status: 'offline' },
]

const sharedTasks: SharedTask[] = [
  {
    id: '1',
    title: 'Design System Update',
    description: 'Update the component library with new design tokens',
    assignedTo: ['1', '2'],
    status: 'in-progress',
    priority: 'high',
    dueDate: 'Tomorrow',
    progress: 65
  },
  {
    id: '2',
    title: 'API Documentation',
    description: 'Complete the REST API documentation for v2.0',
    assignedTo: ['1', '3'],
    status: 'pending',
    priority: 'medium',
    dueDate: 'This Week',
    progress: 20
  },
  {
    id: '3',
    title: 'User Testing Session',
    description: 'Conduct usability testing for the new dashboard',
    assignedTo: ['2', '3', '4'],
    status: 'completed',
    priority: 'high',
    dueDate: 'Yesterday',
    progress: 100
  }
]

// Team Member Avatar with Status
function MemberAvatar({ member, size = 'md' }: { member: TeamMember; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  }
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500'
  }

  return (
    <div className="relative">
      <motion.div
        className={`${sizes[size]} rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-700`}
        whileHover={{ scale: 1.1 }}
      >
        <span>{member.avatar}</span>
      </motion.div>
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${statusColors[member.status]}`} />
    </div>
  )
}

// Shared Task Card
function SharedTaskCard({ task }: { task: SharedTask }) {
  const statusColors = {
    pending: 'border-yellow-500/50 bg-yellow-500/10',
    'in-progress': 'border-blue-500/50 bg-blue-500/10',
    completed: 'border-green-500/50 bg-green-500/10'
  }
  
  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }
  
  const StatusIcon = {
    pending: Clock,
    'in-progress': AlertCircle,
    completed: CheckCircle2
  }[task.status]

  const assignedMembers = teamMembers.filter(member => 
    task.assignedTo.includes(member.id)
  )

  return (
    <motion.div
      className={`glass-card p-6 rounded-xl ${statusColors[task.status]}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 0, 51, 0.3)" }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <StatusIcon className="w-5 h-5 text-neon-red" />
            <h3 className="font-orbitron font-semibold text-white">{task.title}</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">{task.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-neon-red font-semibold">{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-neon-red to-neon-red-glow h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${task.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]} bg-current bg-opacity-20`}>
          {task.priority}
        </div>
      </div>
      
      {/* Assigned Members */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Assigned to:</span>
          <div className="flex -space-x-2">
            {assignedMembers.map((member) => (
              <div key={member.id} title={member.name}>
                <MemberAvatar member={member} size="sm" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-2 mt-4">
        <motion.button
          className="flex items-center space-x-1 px-3 py-1 rounded-full bg-neon-red/20 text-neon-red text-xs hover:bg-neon-red/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-3 h-3" />
          <span>Comment</span>
        </motion.button>
        
        <motion.button
          className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-xs hover:bg-gray-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-3 h-3" />
          <span>Share</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function TaskSharing() {
  const [tasks] = useState(sharedTasks)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const tasksByStatus = {
    pending: tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
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
          Team Collaboration
        </h1>
        <p className="text-gray-400 text-lg">
          Sync your mission with the crew
        </p>
      </motion.div>

      {/* Team Members */}
      <motion.div
        className="glass-card p-6 rounded-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-orbitron font-semibold neon-text">
            Team Members ({teamMembers.length})
          </h2>
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-neon-red/20 text-neon-red border-2 border-neon-red hover:bg-neon-red/30 transition-all font-orbitron font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                selectedMembers.includes(member.id)
                  ? 'border-neon-red bg-neon-red/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-neon-red/50'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleMemberSelection(member.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <MemberAvatar member={member} />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Pending', count: tasksByStatus.pending.length, color: 'text-yellow-400' },
          { label: 'In Progress', count: tasksByStatus['in-progress'].length, color: 'text-blue-400' },
          { label: 'Completed', count: tasksByStatus.completed.length, color: 'text-green-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card p-6 rounded-xl text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          >
            <div className={`text-3xl font-orbitron font-bold ${stat.color} mb-2`}>
              {stat.count}
            </div>
            <div className="text-gray-400">{stat.label} Tasks</div>
          </motion.div>
        ))}
      </div>

      {/* Shared Tasks */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-orbitron font-semibold neon-text">
            Shared Tasks ({tasks.length})
          </h2>
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-neon-red/50 hover:text-neon-red transition-all font-orbitron font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <SharedTaskCard key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
        
        {tasks.length === 0 && (
          <motion.div
            className="glass-card p-12 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-orbitron font-semibold text-gray-400 mb-2">
              No shared tasks yet
            </h3>
            <p className="text-gray-500">
              Create your first collaborative task to get started
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}