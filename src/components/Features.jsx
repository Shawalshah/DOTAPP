import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Headphones, BarChart3, BookOpen, HelpCircle, Users } from 'lucide-react'

const Features = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    { icon: Brain, title: "AI-Powered Learning", desc: "Get personalized explanations that adapt to your unique learning style and pace." },
    { icon: Headphones, title: "Audio Learning", desc: "Listen to courses anytime, anywhere with high-quality voice narration." },
    { icon: BarChart3, title: "Smart Analytics", desc: "Track your progress and get insights to improve your learning journey." },
    { icon: BookOpen, title: "Module Based Courses", desc: "Learn step-by-step with bite-sized modules designed for students." },
    { icon: HelpCircle, title: "Smart Quizzes", desc: "Test your knowledge with adaptive quizzes that match your level." },
    { icon: Users, title: "DOT Mentor", desc: "Get guidance from AI mentors and connect with fellow learners." }
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
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">learn smarter</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed specifically for students like you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-5 group-hover:from-fuchsia-200 group-hover:to-indigo-200 dark:group-hover:from-fuchsia-900/50 dark:group-hover:to-indigo-900/50 transition-colors">
                <feature.icon className="w-7 h-7 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
