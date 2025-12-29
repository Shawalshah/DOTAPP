import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ReadyCTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-24 bg-violet-50/70 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4"
        >
          Ready to start learning?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Join thousands of learners who’ve discovered the joy of learning with AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-medium shadow-sm hover:opacity-95 transition-opacity"
          >
            Start Learning Free
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ReadyCTA
