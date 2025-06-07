'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-2 mb-8">About Me</h2>
          <div className="space-y-6 text-gray-600">
            <p>
              I am a passionate developer with a strong foundation in web development
              and a keen eye for creating intuitive user experiences. With expertise
              in modern web technologies, I strive to build applications that are
              both beautiful and functional.
            </p>
            <p>
              My journey in software development began with a curiosity about how
              things work on the web. This curiosity has evolved into a professional
              career where I continuously learn and adapt to new technologies and
              best practices.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge through
              technical writing and mentoring.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 