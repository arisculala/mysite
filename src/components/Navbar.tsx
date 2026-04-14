'use client'

import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="font-mono text-xl font-bold text-gradient">AC</span>
          <span className="hidden sm:block text-slate-400 text-sm group-hover:text-slate-200 transition-colors">
            /aris-culala
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-accent-cyan text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-cyan group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:arisculala@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-cyan/40 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-200"
        >
          Reach Out
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-accent-cyan transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-accent-cyan/10">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-slate-300 hover:text-accent-cyan text-sm font-medium transition-colors py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:arisculala@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-cyan/40 text-accent-cyan text-sm font-medium hover:bg-accent-cyan/10 transition-all"
              >
                Reach Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
