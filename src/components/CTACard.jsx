import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CTACard = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-12 md:p-16"
        >
          {/* Floating Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8"
            >
              <div className="flex -space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white/90"></div>
                ))}
              </div>
              <span className="text-white text-sm font-medium">Join thousands of learners</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Connecting your <span className="underline decoration-white/40 underline-offset-8">DOT</span> with DOT APP
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Start your AI-powered learning journey today. Connect, learn, and grow with a community of passionate learners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-50 transition-colors shadow-xl">
                Start Learning
              </button>
              <button className="px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Become an Editor
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTACard
