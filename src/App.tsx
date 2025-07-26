import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MemoMateApp from './pages/MemoMateApp';
import Community from './pages/Community';
import Pricing from './pages/Pricing';
import Enterprise from './pages/Enterprise';
import Learn from './pages/Learn';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/app" element={<MemoMateApp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;