'use client'

import { useInView } from 'react-intersection-observer'
import { FiCode, FiServer, FiBox, FiTrendingUp } from 'react-icons/fi'

const HIGHLIGHTS = [
  {
    icon: FiServer,
    label: 'Backend Systems',
    desc: 'Scalable APIs, microservices, and distributed systems architecture.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
  },
  {
    icon: FiCode,
    label: 'Frontend Engineering',
    desc: 'Modern web applications with React, Next.js, and TypeScript.',
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
  },
  {
    icon: FiBox,
    label: 'Blockchain & DeFi',
    desc: 'Smart contracts, DeFi protocols, and Web3 integrations.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    border: 'border-accent-purple/20',
  },
  {
    icon: FiTrendingUp,
    label: 'Finance & AI',
    desc: 'FinTech platforms, algorithmic trading, and AI-powered tools.',
    color: 'text-accent-green',
    bg: 'bg-accent-green/10',
    border: 'border-accent-green/20',
  },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section header */}
        <div className="mb-16">
          <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase">
            01. About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Crafting software that{' '}
            <span className="text-gradient">scales & matters</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              I&apos;m <span className="text-white font-medium">Aris Culala</span>, a
              full-stack software engineer with deep expertise across the entire development
              lifecycle — from system architecture and backend APIs to polished user interfaces
              and production infrastructure.
            </p>
            <p>
              My work spans multiple high-impact domains: building{' '}
              <span className="text-accent-cyan">financial platforms</span> that process
              millions in transactions, architecting{' '}
              <span className="text-accent-purple">blockchain solutions</span> with smart
              contracts and DeFi protocols, and developing{' '}
              <span className="text-accent-blue">AI-powered tools</span> for real estate
              analysis and automation.
            </p>
            <p>
              I thrive in environments where engineering excellence meets business impact —
              whether that&apos;s optimizing a database query that cuts latency by 10x, or
              shipping a feature that delights thousands of users overnight.
            </p>
            <p>
              Beyond the code, I&apos;m passionate about DevOps culture, cloud-native
              architectures, and contributing to the open-source ecosystem. I believe the
              best software is built by engineers who care deeply about both craft and outcome.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/aris-culala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-sm font-medium hover:bg-accent-blue/20 transition-all"
              >
                LinkedIn Profile
              </a>
              <a
                href="mailto:arisculala@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/20 transition-all"
              >
                arisculala@gmail.com
              </a>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.label}
                className={`p-5 rounded-xl border ${item.border} ${item.bg} card-hover cursor-default transition-all duration-300`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <item.icon className={`${item.color} mb-3`} size={22} />
                <h3 className={`text-sm font-semibold ${item.color} mb-1.5`}>
                  {item.label}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
