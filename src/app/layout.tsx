import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aris Culala — Software Engineer',
  description:
    'Full-stack software engineer specializing in backend systems, frontend development, DevOps, and emerging technologies across Finance, Blockchain, and Real Estate AI.',
  keywords: [
    'Aris Culala',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Engineer',
    'Blockchain Developer',
    'DevOps',
    'Finance Technology',
  ],
  authors: [{ name: 'Aris Culala', url: 'https://www.linkedin.com/in/aris-culala' }],
  openGraph: {
    title: 'Aris Culala — Software Engineer',
    description:
      'Full-stack software engineer specializing in backend systems, DevOps, and emerging technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aris Culala — Software Engineer',
    description: 'Full-stack software engineer specializing in backend systems and emerging technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
