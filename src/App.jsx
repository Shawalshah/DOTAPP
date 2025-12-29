import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillTree from './components/SkillTree'
import Features from './components/Features'
import HowWeUnderstand from './components/HowWeUnderstand'
import WhatMakesDifferent from './components/WhatMakesDifferent'
import Pricing from './components/Pricing'
import ReadyCTA from './components/ReadyCTA'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <SkillTree />
        <Features />
        <HowWeUnderstand />
        <WhatMakesDifferent />
        <Pricing />
        <ReadyCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
