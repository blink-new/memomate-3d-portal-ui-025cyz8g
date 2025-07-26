import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import TimelineBackground from '../components/TimelineBackground';
import NeuralWaves from '../components/NeuralWaves';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login process
    setTimeout(() => {
      navigate('/app');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    setTimeout(() => {
      navigate('/app');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Neural Wave Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <NeuralWaves />
        </Canvas>
      </div>

      {/* 3D Timeline Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <TimelineBackground />
        </Canvas>
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative p-3 rounded-full bg-black/20 backdrop-blur-sm border border-red-500/30 hover:border-red-500/60 transition-all duration-300">
          <motion.div
            className="text-red-500"
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={24} />
          </motion.div>
          <div className="absolute inset-0 rounded-full bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.button>

      {/* 3D Login Panel */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className="relative"
        >
          {/* Holographic Panel */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-500/40 to-red-500/20 rounded-2xl blur-xl opacity-60" />
            
            {/* Main Panel */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Holographic Scan Lines */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-full"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-3xl font-orbitron font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Access Portal
                </motion.h1>
                <motion.p 
                  className="text-red-400 font-rajdhani text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Enter the MemoMate System
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <label className="block text-sm font-rajdhani text-red-400 mb-2">First Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 font-sora"
                      placeholder="Enter your first name"
                    />
                    <div className="absolute inset-0 rounded-lg bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Last Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <label className="block text-sm font-rajdhani text-red-400 mb-2">Last Name</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 font-sora"
                      placeholder="Enter your last name"
                    />
                    <div className="absolute inset-0 rounded-lg bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <label className="block text-sm font-rajdhani text-red-400 mb-2">Email</label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 font-sora"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-0 rounded-lg bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <label className="block text-sm font-rajdhani text-red-400 mb-2">Password</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 font-sora"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <div className="absolute inset-0 rounded-lg bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-rajdhani font-bold text-lg rounded-lg transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Access System</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      className="absolute inset-0 bg-red-400/20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.button>
                </motion.div>

                {/* Separator */}
                <motion.div
                  className="relative my-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-500/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-black/40 text-red-400 font-rajdhani">OR</span>
                  </div>
                </motion.div>

                {/* Google Login */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-transparent border-2 border-red-500/50 hover:border-red-500 text-white font-rajdhani font-bold text-lg rounded-lg transition-all duration-300 relative overflow-hidden group flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="relative z-10">Continue with Google</span>
                    <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;