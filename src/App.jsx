import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillTree from './components/SkillTree'
import Features from './components/Features'
import HowWeUnderstand from './components/HowWeUnderstand'
import WhatMakesDifferent from './components/WhatMakesDifferent'
import Pricing from './components/Pricing'
import ReadyCTA from './components/ReadyCTA'
import Support from './components/Support'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [hash, setHash] = useState(() => window.location.hash || '#')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [hash])

  const isSupport = String(hash || '').startsWith('#support')
  const isContact = String(hash || '').startsWith('#contact')

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        {isSupport ? (
          <Support />
        ) : isContact ? (
          <Contact />
        ) : (
          <>
            <Hero />
            <SkillTree />
            <Features />
            <HowWeUnderstand />
            <WhatMakesDifferent />
            <Pricing />
            <ReadyCTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
