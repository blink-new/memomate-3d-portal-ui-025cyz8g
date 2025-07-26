import ParticleField from '../components/ParticleField'
import NeuralGrid from '../components/NeuralGrid'
import FloatingNavigation from '../components/FloatingNavigation'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import SecuritySection from '../components/SecuritySection'
import TechSection from '../components/TechSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticleField />
      <NeuralGrid />
      
      {/* Navigation */}
      <FloatingNavigation />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <SecuritySection />
        <TechSection />
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}