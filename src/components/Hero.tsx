'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="section-padding pt-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="heading-1 mb-6">
            Hi, I'm <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A passionate developer focused on creating beautiful and functional web applications.
            I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              View Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 