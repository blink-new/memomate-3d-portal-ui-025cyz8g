import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isTyping?: boolean
}

// Typing Animation Component
function TypingIndicator() {
  return (
    <motion.div
      className="flex space-x-1 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-neon-red rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  )
}

// Message Bubble Component
function MessageBubble({ message }: { message: Message }) {
  const isBot = message.type === 'bot'
  
  return (
    <motion.div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isBot ? 'bg-neon-red/20 text-neon-red' : 'bg-blue-500/20 text-blue-400'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </motion.div>
        
        {/* Message Content */}
        <div className={`glass-card p-4 rounded-2xl ${
          isBot 
            ? 'bg-black/40 border-neon-red/30' 
            : 'bg-blue-500/20 border-blue-400/30'
        }`}>
          {message.isTyping ? (
            <TypingIndicator />
          ) : (
            <>
              <p className="text-sm lg:text-base">{message.content}</p>
              <div className="text-xs text-gray-500 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Voice Wave Animation
function VoiceWave({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-neon-red rounded-full"
          animate={isActive ? {
            height: [4, 20, 4],
            opacity: [0.5, 1, 0.5],
          } : { height: 4, opacity: 0.5 }}
          transition={{
            duration: 0.8,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m MemoBot, your AI productivity assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('/remind')) {
      return 'I\'ll help you set up a reminder! What would you like to be reminded about and when?'
    } else if (lowerInput.includes('/schedule')) {
      return 'Let me help you schedule a meeting. What\'s the meeting about and when would you like to schedule it?'
    } else if (lowerInput.includes('task') || lowerInput.includes('todo')) {
      return 'I can help you manage your tasks! Would you like to add a new task, view your current tasks, or mark something as complete?'
    } else if (lowerInput.includes('productivity') || lowerInput.includes('focus')) {
      return 'Great question! Based on your recent activity, I recommend taking a 5-minute break and then focusing on your highest priority task. Would you like me to start a focus timer?'
    } else {
      return 'I understand! I can help you with tasks, reminders, scheduling, and productivity tips. Try using commands like "/remind me" or "/schedule meeting" for quick actions!'
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date(),
      }
      
      setIsTyping(false)
      setMessages(prev => [...prev, botResponse])
    }, 1500)
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    // In a real app, you would implement voice recording here
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
    // In a real app, you would implement text-to-speech here
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div
        className="glass-card m-6 mb-0 p-6 rounded-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-neon-red/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-neon-red" />
            </div>
            <div>
              <h1 className="text-2xl font-orbitron font-bold neon-text">MemoBot</h1>
              <p className="text-gray-400">AI Productivity Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={handleSpeakToggle}
              className={`p-3 rounded-full transition-all ${
                isSpeaking ? 'bg-neon-red/20 text-neon-red' : 'bg-gray-800 text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 pt-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                <div className="w-10 h-10 rounded-full bg-neon-red/20 text-neon-red flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="glass-card bg-black/40 border-neon-red/30 rounded-2xl">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* Input Area */}
      <motion.div
        className="glass-card m-6 mt-0 p-4 rounded-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          {/* Voice Recording Button */}
          <motion.button
            onClick={handleVoiceToggle}
            className={`p-3 rounded-full transition-all ${
              isRecording 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-neon-red/20 text-neon-red hover:bg-neon-red/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>

          {/* Voice Wave Indicator */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex-1"
            >
              <VoiceWave isActive={isRecording} />
            </motion.div>
          )}

          {/* Text Input */}
          {!isRecording && (
            <motion.div
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use commands like /remind me..."
                className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-neon-red focus:outline-none transition-all"
              />
            </motion.div>
          )}

          {/* Send Button */}
          <motion.button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && !isRecording}
            className={`p-3 rounded-full transition-all ${
              inputValue.trim() || isRecording
                ? 'bg-neon-red/20 text-neon-red hover:bg-neon-red/30' 
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
            whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
            whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Quick Commands */}
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {['/remind me', '/schedule meeting', '/add task', '/focus timer'].map((command) => (
            <motion.button
              key={command}
              onClick={() => setInputValue(command + ' ')}
              className="px-3 py-1 text-xs bg-neon-red/10 text-neon-red rounded-full border border-neon-red/30 hover:bg-neon-red/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {command}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}