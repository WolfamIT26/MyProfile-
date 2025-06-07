'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'Project One',
    description: 'A full-stack web application built with Next.js and Node.js. Features include user authentication, real-time updates, and responsive design.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/project-one',
    live: 'https://project-one.com',
    image: '/project1.jpg',
  },
  {
    title: 'Project Two',
    description: 'An e-commerce platform with features like product search, cart management, and secure payment processing.',
    technologies: ['React', 'Express', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/yourusername/project-two',
    live: 'https://project-two.com',
    image: '/project2.jpg',
  },
  {
    title: 'Project Three',
    description: 'A real-time chat application with features like group chats, file sharing, and message encryption.',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/project-three',
    live: 'https://project-three.com',
    image: '/project3.jpg',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="aspect-video bg-gray-100">
                {/* Add project image here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 