import { FiLinkedin, FiMail, FiGithub, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 border-t border-slate-800/50 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-mono text-accent-cyan font-bold">Aris Culala</span>
          <span className="text-slate-600 text-xs">
            Software Engineer · {year}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-xs">
          <span>Built with</span>
          <FiHeart size={12} className="text-red-500" />
          <span>using Next.js & Tailwind</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/aris-culala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-accent-blue transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href="mailto:arisculala@gmail.com"
            className="text-slate-600 hover:text-accent-cyan transition-colors"
            aria-label="Email"
          >
            <FiMail size={18} />
          </a>
          <a
            href="https://github.com/arisculala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-200 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
