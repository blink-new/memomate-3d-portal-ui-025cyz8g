import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Palette, 
  Globe, 
  Shield, 
  Database,
  Bell,
  Moon,
  Sun,
  Volume2,
  Trash2,
  Download,
  Upload
} from 'lucide-react'

interface SettingSection {
  id: string
  title: string
  icon: React.ElementType
  settings: Setting[]
}

interface Setting {
  id: string
  label: string
  description: string
  type: 'toggle' | 'select' | 'button'
  value?: boolean | string
  options?: string[]
  action?: () => void
}

// Toggle Switch Component
function ToggleSwitch({ 
  enabled, 
  onChange 
}: { 
  enabled: boolean
  onChange: (enabled: boolean) => void 
}) {
  return (
    <motion.button
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? 'bg-neon-red' : 'bg-gray-700'
      }`}
      onClick={() => onChange(!enabled)}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
        animate={{
          x: enabled ? 26 : 2,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            boxShadow: '0 0 10px #ff0033, inset 0 0 10px #ff0033'
          }}
        />
      )}
    </motion.button>
  )
}

// Select Dropdown Component
function SelectDropdown({ 
  value, 
  options, 
  onChange 
}: { 
  value: string
  options: string[]
  onChange: (value: string) => void 
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-neon-red focus:outline-none transition-all"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// Action Button Component
function ActionButton({ 
  label, 
  onClick, 
  variant = 'default' 
}: { 
  label: string
  onClick: () => void
  variant?: 'default' | 'danger' 
}) {
  const variants = {
    default: 'bg-neon-red/20 text-neon-red border-neon-red hover:bg-neon-red/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500 hover:bg-red-500/30'
  }

  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg border-2 font-orbitron font-semibold transition-all ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  )
}

// Setting Item Component
function SettingItem({ setting, onUpdate }: { setting: Setting; onUpdate: (id: string, value: any) => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-1">{setting.label}</h4>
        <p className="text-sm text-gray-400">{setting.description}</p>
      </div>
      
      <div className="ml-4">
        {setting.type === 'toggle' && (
          <ToggleSwitch
            enabled={setting.value as boolean}
            onChange={(value) => onUpdate(setting.id, value)}
          />
        )}
        
        {setting.type === 'select' && (
          <SelectDropdown
            value={setting.value as string}
            options={setting.options || []}
            onChange={(value) => onUpdate(setting.id, value)}
          />
        )}
        
        {setting.type === 'button' && setting.action && (
          <ActionButton
            label={setting.label}
            onClick={setting.action}
            variant={setting.id.includes('delete') || setting.id.includes('wipe') ? 'danger' : 'default'}
          />
        )}
      </div>
    </div>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, any>>({
    darkMode: true,
    notifications: true,
    soundEffects: true,
    theme: 'Neon Red',
    language: 'English',
    storage: 'Local',
    autoBackup: true,
  })

  const handleSettingUpdate = (id: string, value: any) => {
    setSettings(prev => ({ ...prev, [id]: value }))
  }

  const settingSections: SettingSection[] = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          id: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for better visibility in low light',
          type: 'toggle',
          value: settings.darkMode
        },
        {
          id: 'theme',
          label: 'Theme',
          description: 'Choose your preferred color scheme',
          type: 'select',
          value: settings.theme,
          options: ['Neon Red', 'Cyber Blue', 'Matrix Green', 'Purple Haze']
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'notifications',
          label: 'Push Notifications',
          description: 'Receive notifications for reminders and updates',
          type: 'toggle',
          value: settings.notifications
        },
        {
          id: 'soundEffects',
          label: 'Sound Effects',
          description: 'Play sounds for interactions and notifications',
          type: 'toggle',
          value: settings.soundEffects
        }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      settings: [
        {
          id: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select',
          value: settings.language,
          options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Korean']
        }
      ]
    },
    {
      id: 'storage',
      title: 'Data & Storage',
      icon: Database,
      settings: [
        {
          id: 'storage',
          label: 'Storage Location',
          description: 'Where to store your data',
          type: 'select',
          value: settings.storage,
          options: ['Local (Encrypted)', 'Cloud (Google Drive)', 'Cloud (Firebase)']
        },
        {
          id: 'autoBackup',
          label: 'Auto Backup',
          description: 'Automatically backup your data daily',
          type: 'toggle',
          value: settings.autoBackup
        }
      ]
    },
    {
      id: 'actions',
      title: 'Data Management',
      icon: Shield,
      settings: [
        {
          id: 'exportData',
          label: 'Export Data',
          description: 'Download all your data as a backup file',
          type: 'button',
          action: () => console.log('Exporting data...')
        },
        {
          id: 'importData',
          label: 'Import Data',
          description: 'Restore data from a backup file',
          type: 'button',
          action: () => console.log('Importing data...')
        },
        {
          id: 'wipeData',
          label: 'Wipe All Data',
          description: 'Permanently delete all your data (cannot be undone)',
          type: 'button',
          action: () => console.log('Wiping data...')
        }
      ]
    }
  ]

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
          System Configuration
        </h1>
        <p className="text-gray-400 text-lg">
          Customize your MemoMate experience
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-neon-red/20 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-neon-red" />
              </div>
              <h2 className="text-xl font-orbitron font-semibold neon-text">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-4">
              {section.settings.map((setting) => (
                <SettingItem
                  key={setting.id}
                  setting={setting}
                  onUpdate={handleSettingUpdate}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Info */}
      <motion.div
        className="glass-card p-6 rounded-2xl mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-xl font-orbitron font-semibold neon-text mb-6">
          System Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Version', value: 'MemoMate v2.1.0' },
            { label: 'Build', value: 'Portal-UI-2024' },
            { label: 'Platform', value: 'Web Application' },
            { label: 'Storage Used', value: '2.4 MB / 100 MB' },
            { label: 'Last Backup', value: '2 hours ago' },
            { label: 'Sync Status', value: 'Connected' },
          ].map((info, index) => (
            <motion.div
              key={info.label}
              className="p-4 rounded-lg bg-gray-800/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-sm text-gray-400 mb-1">{info.label}</div>
              <div className="font-semibold text-white">{info.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Loading Animation */}
      <motion.div
        className="fixed top-6 right-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-6 h-6 border-2 border-neon-red border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="font-orbitron text-sm text-neon-red">
              System Online
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}