import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, Cpu, Users, Edit3, Award, Compass } from 'lucide-react'

const WhatMakesDifferent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const items = [
    { icon: BookOpen, title: "Learning", desc: "Structured, engaging content designed for real understanding" },
    { icon: Cpu, title: "AI & Technology", desc: "Cutting-edge AI that adapts to your unique learning style" },
    { icon: Users, title: "Community", desc: "Connect with learners and experts worldwide" },
    { icon: Edit3, title: "Editor", desc: "Create and share your own courses with powerful tools" },
    { icon: Award, title: "Quality Content", desc: "Expert-curated courses that meet high standards" },
    { icon: Compass, title: "Goal Oriented", desc: "Everything aligned with your personal objectives" }
  ]

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What makes us <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">different</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Six key reasons why students choose DOT APP
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-800 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-5 group-hover:from-fuchsia-200 group-hover:to-indigo-200 transition-colors">
                <item.icon className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatMakesDifferent
