'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowDown, FiLinkedin, FiMail, FiGithub } from 'react-icons/fi'
import { SiSolidity } from 'react-icons/si'

const ROLES = [
  'Backend Engineer',
  'Frontend Developer',
  'DevOps Architect',
  'Blockchain Developer',
  'FinTech Engineer',
  'AI Systems Builder',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = isDeleting ? 50 : 90

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800)
      return
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % ROLES.length)
      return
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, speed)

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950 dot-grid"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-cyan/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-green/30 bg-accent-green/5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-accent-green text-xs font-mono tracking-wider uppercase">
            Contact me to discuss
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
          <span className="text-white">Aris </span>
          <span className="text-gradient">Culala</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-12 flex items-center justify-center mb-6 animate-fade-in-up animate-delay-100">
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-slate-300">
            {displayed}
            <span className="animate-pulse text-accent-cyan">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-10 animate-fade-in-up animate-delay-200">
          Building robust systems across{' '}
          <span className="text-accent-cyan font-medium">Finance</span>,{' '}
          <span className="text-accent-purple font-medium">Blockchain</span>, and{' '}
          <span className="text-accent-blue font-medium">Real Estate AI</span>
          . Turning complex problems into elegant, scalable solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up animate-delay-300">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-950 font-bold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-accent-cyan/25"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-slate-600 text-slate-300 font-medium text-sm hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/5 transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 animate-fade-in-up animate-delay-400">
          <a
            href="https://www.linkedin.com/in/aris-culala"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-500 hover:text-accent-blue transition-colors duration-200 text-sm"
          >
            <FiLinkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <div className="w-px h-4 bg-slate-700" />
          <a
            href="mailto:arisculala@gmail.com"
            className="flex items-center gap-2 text-slate-500 hover:text-accent-cyan transition-colors duration-200 text-sm"
          >
            <FiMail size={18} />
            <span className="hidden sm:inline">arisculala@gmail.com</span>
          </a>
          <div className="w-px h-4 bg-slate-700" />
          <a
            href="https://github.com/arisculala"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors duration-200 text-sm"
          >
            <FiGithub size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-accent-cyan transition-colors animate-bounce"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <FiArrowDown size={16} />
      </a>
    </section>
  )
}
