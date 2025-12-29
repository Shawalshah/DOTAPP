import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { User, GraduationCap, Lightbulb, Target } from 'lucide-react'

const HowWeUnderstand = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [active, setActive] = useState(0)

  const dots = [
    { icon: User, title: "Personal Information", desc: "We learn about your background, preferences, and how you like to learn best." },
    { icon: GraduationCap, title: "Your Education", desc: "Understanding your educational background helps us identify where to start." },
    { icon: Lightbulb, title: "Your Skills", desc: "We map your existing skills to identify strengths and growth opportunities." },
    { icon: Target, title: "Your Goal", desc: "Your goals drive our recommendations and shape your personalized learning path." }
  ]

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.10),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.14),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How we <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">understand</span> you
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four key dots that help us create your perfect learning experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 flex items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">YOU</span>
              </div>

              {/* Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-indigo-200/70 dark:border-indigo-800/50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-indigo-100/60 dark:border-indigo-900/50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-gray-200/70 dark:border-gray-700/70"></div>

              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {dots.map((_, i) => {
                  const angle = (i * 90 - 45) * (Math.PI / 180)
                  const endX = 50 + Math.cos(angle) * 38
                  const endY = 50 + Math.sin(angle) * 38
                  return (
                    <line
                      key={i}
                      x1="50%" y1="50%"
                      x2={`${endX}%`} y2={`${endY}%`}
                      stroke={active === i ? "#6366f1" : "#e5e7eb"}
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="transition-colors duration-300"
                    />
                  )
                })}
              </svg>

              {/* Dots */}
              {dots.map((dot, i) => {
                const angle = (i * 90 - 45) * (Math.PI / 180)
                const x = 50 + Math.cos(angle) * 38
                const y = 50 + Math.sin(angle) * 38
                return (
                  <button
                    key={i}
                    className="absolute transition-transform duration-300 hover:scale-110"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    onClick={() => setActive(i)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      active === i 
                        ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-indigo-500/25' 
                        : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200/70 dark:border-gray-700/70'
                    }`}>
                      <dot.icon className="w-7 h-7" />
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 order-1 lg:order-2"
          >
            {dots.map((dot, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  active === i 
                    ? 'bg-white dark:bg-gray-800 shadow-lg border border-indigo-200/70 dark:border-indigo-800/60' 
                    : 'bg-white/60 dark:bg-gray-900/30 border border-gray-200/60 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    active === i 
                      ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 border border-gray-200/70 dark:border-gray-700/70'
                  }`}>
                    <dot.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${active === i ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>
                      {dot.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dot.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HowWeUnderstand
