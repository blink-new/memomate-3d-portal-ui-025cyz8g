import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { 
  Home, 
  MessageCircle, 
  Clock, 
  Bell, 
  BarChart3, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import existing pages
import Dashboard from './Dashboard';
import AIChat from './AIChat';
import Timeline from './Timeline';
import Reminders from './Reminders';
import Analytics from './Analytics';
import TaskSharing from './TaskSharing';
import Settings from './Settings';

// 3D Star Field Component
const StarField: React.FC = () => {
  const stars = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ],
        scale: Math.random() * 0.5 + 0.5
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position} scale={star.scale}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const MemoMateApp: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sharing', label: 'Task Sharing', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <AIChat />;
      case 'timeline':
        return <Timeline />;
      case 'reminders':
        return <Reminders />;
      case 'analytics':
        return <Analytics />;
      case 'sharing':
        return <TaskSharing />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <StarField />
        </Canvas>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-20">
        <div className="flex flex-col flex-grow bg-black/40 backdrop-blur-xl border-r border-red-500/20">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-red-500/20">
            <motion.h1 
              className="text-2xl font-orbitron font-bold text-red-500"
              whileHover={{ scale: 1.05 }}
            >
              MemoMate
            </motion.h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 group ${
                    isActive 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-rajdhani font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-red-500/20">
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={20} className="mr-3" />
              <span className="font-rajdhani font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-black/80 backdrop-blur-xl border-t border-red-500/20 px-4 py-2">
          <div className="flex justify-around">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'text-red-400' : 'text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                  <span className="text-xs font-rajdhani mt-1">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="w-1 h-1 bg-red-500 rounded-full mt-1"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 relative z-10">
        <div className="min-h-screen pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MemoMateApp;