import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Brain, Shield } from 'lucide-react';

// 3D Background Component
const ParticleField: React.FC = () => {
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.5 + 0.5
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ff0033" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Assistant',
      description: 'Intelligent task management with natural language processing'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Sync',
      description: 'Real-time synchronization across all your favorite apps'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'AES-256 encryption with GDPR compliance and privacy-first design'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Neural Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 51, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 51, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-orbitron font-bold text-red-500">MemoMate</h1>
          </motion.div>

          <motion.button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-transparent border border-red-500/50 hover:border-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 font-rajdhani font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Login
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-6">
              Your Intelligent
              <br />
              <span className="text-red-500 relative">
                Productivity OS
                <motion.div
                  className="absolute -inset-2 bg-red-500/20 blur-xl rounded-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-rajdhani max-w-3xl mx-auto leading-relaxed">
              Powered by AI. Synced to your life. From chats to calendar — all in one futuristic interface.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <motion.button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-rajdhani font-bold text-lg rounded-lg transition-all duration-300 flex items-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-red-500/50 hover:border-red-500 text-red-400 hover:text-white font-rajdhani font-bold text-lg rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card */}
                  <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 h-full group-hover:border-red-500/40 transition-all duration-300">
                    <div className="text-red-500 mb-4">
                      <Icon size={48} />
                    </div>
                    <h3 className="text-xl font-orbitron font-bold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 font-rajdhani leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-6 py-8 border-t border-red-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 font-rajdhani">
            © 2024 MemoMate. Powered by AI. Built for the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;