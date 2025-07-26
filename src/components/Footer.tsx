import { motion } from 'framer-motion'

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'API Docs', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press Kit', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '#' },
    { name: 'Status', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' }
  ]
}

const socialLinks = [
  { name: 'Instagram', icon: '📷', href: '#' },
  { name: 'LinkedIn', icon: '💼', href: '#' },
  { name: 'Twitter', icon: '🐦', href: '#' },
  { name: 'GitHub', icon: '💻', href: '#' }
]

export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-red-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-3xl font-orbitron font-bold text-white mb-4">
                MemoMate
              </h3>
              <p className="text-gray-300 font-rajdhani text-lg max-w-md">
                The future of productivity is here. AI-powered task management that syncs across all your favorite apps.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-black/20 backdrop-blur-md border border-red-500/30 
                             rounded-lg flex items-center justify-center text-red-400 
                             hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)',
                    rotateY: 15
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-orbitron font-bold text-red-400 capitalize">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 font-rajdhani hover:text-red-300 
                                 transition-colors duration-300 flex items-center space-x-2"
                    >
                      <motion.div
                        className="w-1 h-1 bg-red-500 rounded-full opacity-0"
                        whileHover={{ opacity: 1, scale: 1.5 }}
                      />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-black/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-orbitron font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300 font-rajdhani">
                Get the latest updates on new features and AI productivity tips.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/30 border border-red-500/30 rounded-lg
                           text-white placeholder-gray-500 font-rajdhani
                           focus:border-red-500/50 focus:outline-none transition-colors"
              />
              <motion.button
                className="px-6 py-3 bg-red-500 text-white font-rajdhani font-bold
                           rounded-lg hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-red-500/20"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-gray-400 font-rajdhani">
              © 2024 MemoMate. All rights reserved.
            </p>
            <motion.div
              className="w-2 h-2 bg-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>

          <div className="flex items-center space-x-6 text-gray-400 font-rajdhani text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>AI Models Online</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </footer>
  )
}