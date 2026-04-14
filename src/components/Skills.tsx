'use client'

import { useInView } from 'react-intersection-observer'

const SKILL_GROUPS = [
  {
    category: 'Backend',
    color: 'accent-cyan',
    skills: [
      { name: 'Java / Spring Boot', level: 92 },
      { name: 'Node.js', level: 90 },
      { name: 'Go (Golang)', level: 85 },
      { name: 'Python', level: 60 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 84 },
      { name: 'gRPC / REST APIs', level: 90 },
    ],
  },
  {
    category: 'Frontend',
    color: 'accent-blue',
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'React / Next.js', level: 86 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Vue.js', level: 72 },
      { name: 'GraphQL', level: 78 },
      { name: 'Testing (Jest / Cypress)', level: 75 },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: 'accent-purple',
    skills: [
      { name: 'Docker / Kubernetes', level: 88 },
      { name: 'AWS', level: 84 },
      { name: 'GCP', level: 78 },
      { name: 'Terraform', level: 80 },
      { name: 'CI/CD (GitHub Actions)', level: 86 },
      { name: 'Prometheus / Grafana', level: 75 },
    ],
  },
  {
    category: 'Blockchain & Finance',
    color: 'accent-green',
    skills: [
      { name: 'Solidity / Smart Contracts', level: 82 },
      { name: 'Ethereum / EVM Chains', level: 80 },
      { name: 'DeFi Protocols', level: 76 },
      { name: 'Web3.js / Ethers.js', level: 82 },
      { name: 'FinTech APIs / Payments', level: 85 },
      { name: 'AI / ML Integration', level: 74 },
    ],
  },
]

const COLOR_MAP: Record<string, { bar: string; text: string; border: string }> = {
  'accent-cyan': {
    bar: 'bg-gradient-to-r from-accent-cyan to-accent-blue',
    text: 'text-accent-cyan',
    border: 'border-accent-cyan/20',
  },
  'accent-blue': {
    bar: 'bg-gradient-to-r from-accent-blue to-accent-purple',
    text: 'text-accent-blue',
    border: 'border-accent-blue/20',
  },
  'accent-purple': {
    bar: 'bg-gradient-to-r from-accent-purple to-accent-blue',
    text: 'text-accent-purple',
    border: 'border-accent-purple/20',
  },
  'accent-green': {
    bar: 'bg-gradient-to-r from-accent-green to-accent-cyan',
    text: 'text-accent-green',
    border: 'border-accent-green/20',
  },
}

function SkillBar({
  name,
  level,
  barClass,
  animate,
}: {
  name: string
  level: number
  barClass: string
  animate: boolean
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm">{name}</span>
        <span className="text-slate-500 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barClass}`}
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-16">
          <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase">
            02. Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Tech stack &{' '}
            <span className="text-gradient">expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group) => {
            const colors = COLOR_MAP[group.color]
            return (
              <div
                key={group.category}
                className={`glass rounded-2xl p-7 border ${colors.border}`}
              >
                <h3 className={`font-semibold text-base mb-6 ${colors.text} font-mono tracking-wide`}>
                  {group.category}
                </h3>
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    barClass={colors.bar}
                    animate={inView}
                  />
                ))}
              </div>
            )
          })}
        </div>

        {/* Tech badges */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {[
            'Java', 'Node.js', 'TypeScript', 'Go', 'Python', 'React', 'Next.js',
            'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'PostgreSQL', 'Redis',
            'Solidity', 'Ethereum', 'gRPC', 'GraphQL', 'Git', 'Linux', 'Nginx',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-navy-800 border border-slate-700/50 text-slate-400 text-xs font-mono hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
