'use client'

import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const PROJECTS = [
  {
    title: 'Karpul',
    description:
      'A carpooling platform that connects drivers and passengers for shared rides. Features real-time matching, route optimization, in-app chat, and secure payments — making commuting cheaper and greener.',
    domain: 'Transportation',
    color: 'accent-cyan',
    featured: true,
    stack: ['Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Redis', 'WebSockets'],
    github: 'https://github.com/arisculala',
    live: 'https://karpul.arisculala.org',
    metrics: ['Real-time Matching', 'Route Optimization', 'Live'],
  },
  {
    title: 'Pulse22',
    description:
      'A crypto portfolio tracker that aggregates holdings across multiple wallets and exchanges, providing real-time P&L, performance analytics, and market insights in a clean dashboard.',
    domain: 'Crypto / Finance',
    color: 'accent-purple',
    featured: true,
    stack: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    github: 'https://github.com/arisculala',
    live: 'https://pulse22.arisculala.org',
    metrics: ['Multi-wallet', 'Real-time P&L', 'Live'],
  },
  {
    title: 'Converse',
    description:
      'A conversational chatbot that evolved from Elasticsearch-powered pattern matching to full NLP intent classification. Early versions matched user queries against indexed intent patterns in Elasticsearch; later versions introduced intent classifiers to tailor responses dynamically based on classified intent and extracted entities.',
    domain: 'NLP / Chatbot',
    color: 'accent-blue',
    featured: true,
    stack: ['Python', 'Elasticsearch', 'Flask', 'React', 'PostgreSQL'],
    github: 'https://github.com/arisculala',
    live: null,
    metrics: ['Pattern Matching', 'Intent Classification'],
  },
  {
    title: 'Notification Service',
    description:
      'A multi-channel notification microservice supporting SMS, WhatsApp, Viber, and Email delivery through a unified API. Features template management, retry logic, and delivery tracking.',
    domain: 'Infrastructure',
    color: 'accent-green',
    featured: false,
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    github: 'https://github.com/arisculala',
    live: null,
    metrics: ['SMS', 'WhatsApp', 'Viber', 'Email'],
  },
]

const COLOR_MAP: Record<string, { badge: string; border: string; text: string; glow: string }> = {
  'accent-purple': {
    badge: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    border: 'border-accent-purple/20 hover:border-accent-purple/50',
    text: 'text-accent-purple',
    glow: 'hover:shadow-accent-purple/10',
  },
  'accent-cyan': {
    badge: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    border: 'border-accent-cyan/20 hover:border-accent-cyan/50',
    text: 'text-accent-cyan',
    glow: 'hover:shadow-accent-cyan/10',
  },
  'accent-blue': {
    badge: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    border: 'border-accent-blue/20 hover:border-accent-blue/50',
    text: 'text-accent-blue',
    glow: 'hover:shadow-accent-blue/10',
  },
  'accent-green': {
    badge: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    border: 'border-accent-green/20 hover:border-accent-green/50',
    text: 'text-accent-green',
    glow: 'hover:shadow-accent-green/10',
  },
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const featured = PROJECTS.filter((p) => p.featured)
  const others = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-blue/4 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-16">
          <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase">
            03. Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Things I&apos;ve{' '}
            <span className="text-gradient">built</span>
          </h2>
        </div>

        {/* Featured projects */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {featured.map((project, i) => {
            const colors = COLOR_MAP[project.color]
            return (
              <div
                key={project.title}
                className={`glass rounded-2xl p-7 border ${colors.border} ${colors.glow} card-hover flex flex-col transition-all duration-300 hover:shadow-xl`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(20px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colors.badge}`}>
                    {project.domain}
                  </span>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} className="text-slate-500 hover:text-slate-200 transition-colors">
                        <FiGithub size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} className={`${colors.text} hover:opacity-70 transition-opacity`}>
                        <FiExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.metrics.map((m) => (
                    <span key={m} className={`text-xs font-semibold ${colors.text} bg-navy-800 px-2.5 py-1 rounded-md`}>
                      {m}
                    </span>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/50">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-slate-500 px-2 py-0.5 rounded bg-navy-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((project, i) => {
            const colors = COLOR_MAP[project.color]
            return (
              <div
                key={project.title}
                className={`glass rounded-xl p-5 border ${colors.border} card-hover transition-all duration-300`}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  transitionDelay: `${(featured.length + i) * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors.badge}`}>
                    {project.domain}
                  </span>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} className="text-slate-500 hover:text-slate-200 transition-colors">
                        <FiGithub size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs font-mono text-slate-600 px-1.5 py-0.5 rounded bg-navy-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}

          {/* More projects card */}
          <div
            className="rounded-xl p-5 border border-dashed border-slate-700/60 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:border-accent-cyan/40 hover:bg-accent-cyan/3 cursor-default"
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 0.6s ease ${(featured.length + others.length) * 100}ms`,
            }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-slate-700"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">
              &amp; a lot more applications
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Spanning finance, automation, tooling, and more — built over the years.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
