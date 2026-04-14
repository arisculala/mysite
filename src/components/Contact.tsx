'use client'

import { useInView } from 'react-intersection-observer'
import { FiMail, FiLinkedin, FiGithub, FiTwitter, FiArrowRight } from 'react-icons/fi'

const CONTACT_LINKS = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'arisculala@gmail.com',
    href: 'mailto:arisculala@gmail.com',
    desc: 'Best way to reach me',
    color: 'accent-cyan',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'aris-culala',
    href: 'https://www.linkedin.com/in/aris-culala',
    desc: 'Professional network',
    color: 'accent-blue',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/arisculala',
    href: 'https://github.com/arisculala',
    desc: 'Open source work',
    color: 'accent-purple',
  },
]

const COLOR_MAP: Record<string, { icon: string; bg: string; border: string }> = {
  'accent-cyan': { icon: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan/20 hover:border-accent-cyan/50' },
  'accent-blue': { icon: 'text-accent-blue', bg: 'bg-accent-blue/10', border: 'border-accent-blue/20 hover:border-accent-blue/50' },
  'accent-purple': { icon: 'text-accent-purple', bg: 'bg-accent-purple/10', border: 'border-accent-purple/20 hover:border-accent-purple/50' },
}

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" className="section-padding bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/3 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-16">
          <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase">
            04. Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Let&apos;s build something{' '}
            <span className="text-gradient">great together</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: copy */}
          <div>
            <p className="text-slate-400 leading-relaxed">
              Have a product idea, a challenging engineering problem, or want to explore
              potential collaboration? I&apos;d love to hear about it — drop me a message
              through any of the channels below and let&apos;s talk.
            </p>
          </div>

          {/* Right: links */}
          <div className="space-y-4">
            {CONTACT_LINKS.map((link) => {
              const colors = COLOR_MAP[link.color]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-5 p-5 glass rounded-xl border ${colors.border} group card-hover transition-all duration-300`}
                >
                  <div className={`${colors.bg} ${colors.icon} p-3 rounded-lg flex-shrink-0`}>
                    <link.icon size={20} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-slate-500 text-xs mb-0.5">{link.desc}</p>
                    <p className="text-white font-medium text-sm truncate">{link.value}</p>
                  </div>
                  <FiArrowRight
                    className={`${colors.icon} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0`}
                    size={16}
                  />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
