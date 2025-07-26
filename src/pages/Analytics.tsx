import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Calendar,
  Activity,
  Zap
} from 'lucide-react'

// 3D Chart Component (simplified for demo)
function Chart3D({ data, type = 'bar' }: { data: number[]; type?: 'bar' | 'line' }) {
  const maxValue = Math.max(...data)
  
  return (
    <div className="h-48 flex items-end justify-center space-x-2">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-neon-red to-neon-red-glow rounded-t-lg relative"
          style={{ width: '20px' }}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 180}px` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px #ff0033"
          }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-400">
            {value}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Circular Progress Component
function CircularProgress({ 
  percentage, 
  label, 
  color = '#ff0033' 
}: { 
  percentage: number
  label: string
  color?: string 
}) {
  const circumference = 2 * Math.PI * 40
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              filter: `drop-shadow(0 0 10px ${color})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-orbitron font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
      <span className="text-sm text-gray-400 mt-2">{label}</span>
    </div>
  )
}

// Heatmap Component
function Heatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeks = 12
  
  const generateHeatmapData = () => {
    return Array.from({ length: weeks }, () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
    )
  }
  
  const data = generateHeatmapData()
  
  const getIntensityColor = (value: number) => {
    const intensities = [
      'bg-gray-800',
      'bg-neon-red/20',
      'bg-neon-red/40',
      'bg-neon-red/60',
      'bg-neon-red/80',
      'bg-neon-red'
    ]
    return intensities[value] || intensities[0]
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-1 text-xs text-gray-500">
        {days.map(day => (
          <div key={day} className="w-4 text-center">{day[0]}</div>
        ))}
      </div>
      <div className="space-y-1">
        {data.map((week, weekIndex) => (
          <div key={weekIndex} className="flex space-x-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-4 h-4 rounded-sm ${getIntensityColor(day)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                whileHover={{ scale: 1.2 }}
                title={`${day} tasks completed`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const weeklyData = [12, 19, 15, 22, 18, 25, 20]
  const monthlyData = [85, 92, 78, 96, 88]

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
          Command Center
        </h1>
        <p className="text-gray-400 text-lg">
          Mission control for your productivity metrics
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Target, label: 'Tasks Completed', value: '127', change: '+12%' },
          { icon: Clock, label: 'Focus Time', value: '42h', change: '+8%' },
          { icon: TrendingUp, label: 'Productivity Score', value: '94', change: '+15%' },
          { icon: Zap, label: 'Streak Days', value: '7', change: 'New!' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 0, 51, 0.3)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="w-8 h-8 text-neon-red" />
              <span className="text-sm text-green-400 font-semibold">
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-orbitron font-bold neon-text mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Performance */}
        <motion.div
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-xl font-orbitron font-semibold neon-text mb-6">
            Weekly Performance
          </h3>
          <Chart3D data={weeklyData} type="bar" />
          <div className="flex justify-between text-xs text-gray-500 mt-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </motion.div>

        {/* Progress Circles */}
        <motion.div
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl font-orbitron font-semibold neon-text mb-6">
            Goal Progress
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <CircularProgress percentage={85} label="Daily Goals" />
            <CircularProgress percentage={92} label="Weekly Target" color="#00ff88" />
            <CircularProgress percentage={78} label="Focus Time" color="#ffaa00" />
            <CircularProgress percentage={96} label="Consistency" color="#ff0088" />
          </div>
        </motion.div>
      </div>

      {/* Activity Heatmap */}
      <motion.div
        className="glass-card p-6 rounded-xl mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-xl font-orbitron font-semibold neon-text mb-6">
          Activity Heatmap - Last 12 Weeks
        </h3>
        <Heatmap />
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${
                  level === 0 ? 'bg-gray-800' :
                  level === 1 ? 'bg-neon-red/20' :
                  level === 2 ? 'bg-neon-red/40' :
                  level === 3 ? 'bg-neon-red/60' :
                  'bg-neon-red'
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        className="glass-card p-6 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h3 className="text-xl font-orbitron font-semibold neon-text mb-6">
          AI Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Activity className="w-5 h-5 text-green-400 mt-1" />
              <div>
                <h4 className="font-semibold text-green-400">Peak Performance</h4>
                <p className="text-sm text-gray-400">
                  Your most productive hours are between 9-11 AM. Schedule important tasks during this window.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-400">Improvement Trend</h4>
                <p className="text-sm text-gray-400">
                  Your productivity has increased by 23% over the last month. Keep up the momentum!
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-400">Weekly Pattern</h4>
                <p className="text-sm text-gray-400">
                  Thursdays are your most productive days. Consider scheduling challenging tasks then.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <h4 className="font-semibold text-purple-400">Goal Recommendation</h4>
                <p className="text-sm text-gray-400">
                  Based on your progress, consider increasing your daily task target to 6 items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}