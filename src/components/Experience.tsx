'use client'

import { useInView } from 'react-intersection-observer'
import { FiBriefcase } from 'react-icons/fi'

const EXPERIENCES = [
  {
    role: 'Senior Software Engineer',
    company: 'FinTech Startup',
    period: '2022 — Present',
    type: 'Full-time',
    domain: 'Finance',
    color: 'accent-cyan',
    highlights: [
      'Architected high-throughput payment processing system handling 50k+ TPS',
      'Led migration from monolith to microservices, reducing deployment time by 80%',
      'Built real-time fraud detection pipeline using Go and Apache Kafka',
      'Improved P99 API latency from 800ms to under 60ms through caching and query optimization',
    ],
    stack: ['Go', 'Kafka', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS'],
  },
  {
    role: 'Blockchain Engineer',
    company: 'DeFi Protocol',
    period: '2021 — 2022',
    type: 'Full-time',
    domain: 'Blockchain',
    color: 'accent-purple',
    highlights: [
      'Developed and audited Solidity smart contracts for a lending/borrowing DeFi protocol (TVL $15M+)',
      'Integrated cross-chain bridges for multi-chain asset transfers',
      'Built off-chain indexing service using The Graph for efficient on-chain data queries',
      'Contributed to tokenomics design and governance mechanism implementation',
    ],
    stack: ['Solidity', 'Ethereum', 'Hardhat', 'TypeScript', 'The Graph', 'IPFS'],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Real Estate Tech Company',
    period: '2020 — 2021',
    type: 'Full-time',
    domain: 'Real Estate AI',
    color: 'accent-blue',
    highlights: [
      'Built AI-powered property valuation engine integrating multiple data sources and ML models',
      'Developed interactive dashboard for portfolio management serving 500+ institutional clients',
      'Implemented automated document processing pipeline using OCR and NLP',
      'Reduced property analysis time from 2 days to 4 hours through automation',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Next.js', 'PostgreSQL', 'GCP', 'TensorFlow'],
  },
  {
    role: 'Backend Engineer',
    company: 'Tech Consultancy',
    period: '2018 — 2020',
    type: 'Full-time',
    domain: 'Various',
    color: 'accent-green',
    highlights: [
      'Delivered backend systems for 8+ client projects across e-commerce, logistics, and healthcare',
      'Established CI/CD pipelines using GitHub Actions and Terraform for IaC',
      'Mentored junior developers and conducted code reviews across multiple teams',
      'Designed RESTful and GraphQL APIs consumed by mobile and web clients',
    ],
    stack: ['Node.js', 'Python', 'Java', 'MySQL', 'Docker', 'Jenkins', 'AWS'],
  },
]

const COLOR_MAP: Record<string, { dot: string; badge: string; border: string; text: string }> = {
  'accent-cyan': {
    dot: 'bg-accent-cyan',
    badge: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
    border: 'border-accent-cyan/30',
    text: 'text-accent-cyan',
  },
  'accent-purple': {
    dot: 'bg-accent-purple',
    badge: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    border: 'border-accent-purple/30',
    text: 'text-accent-purple',
  },
  'accent-blue': {
    dot: 'bg-accent-blue',
    badge: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    border: 'border-accent-blue/30',
    text: 'text-accent-blue',
  },
  'accent-green': {
    dot: 'bg-accent-green',
    badge: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    border: 'border-accent-green/30',
    text: 'text-accent-green',
  },
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-accent-cyan/4 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-16">
          <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase">
            03. Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Where I&apos;ve{' '}
            <span className="text-gradient">made an impact</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/40 via-accent-purple/30 to-transparent hidden md:block" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => {
              const colors = COLOR_MAP[exp.color]
              return (
                <div
                  key={i}
                  className="relative md:pl-16"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(20px)',
                    transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 w-4 h-4 rounded-full ${colors.dot} border-2 border-navy-900 shadow-lg hidden md:block`}
                    style={{ boxShadow: `0 0 10px var(--tw-shadow-color)` }}
                  />

                  <div className={`glass rounded-2xl p-7 border ${colors.border} card-hover`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FiBriefcase className={`${colors.text} flex-shrink-0`} size={14} />
                          <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
                        </div>
                        <p className="text-slate-400 text-sm">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        <span className="font-mono text-xs text-slate-500 bg-navy-800 px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colors.badge}`}>
                          {exp.domain}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                          <span className={`${colors.text} mt-1.5 flex-shrink-0 text-xs`}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-navy-800 text-slate-500 text-xs font-mono border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
