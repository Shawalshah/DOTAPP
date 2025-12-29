import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      desc: "Perfect for exploring",
      features: ["Access to free courses", "Basic AI explanations", "Community access", "Progress tracking"],
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      desc: "For serious learners",
      features: ["All Starter features", "Unlimited courses", "Advanced AI mentor", "Audio learning", "Certificates"],
      popular: true
    },
    {
      name: "Editor",
      price: "$49",
      period: "/month",
      desc: "Create & monetize",
      features: ["All Pro features", "Course creation tools", "Revenue sharing", "Analytics dashboard", "Priority support"],
      popular: false
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">transparent</span> pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={plan.popular ? 'md:-mt-4' : ''}
            >
              <div className={`relative p-8 rounded-3xl h-full ${
                plan.popular 
                  ? 'bg-gradient-to-b from-fuchsia-500 to-indigo-600 text-white shadow-xl shadow-fuchsia-500/20' 
                  : 'bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600'
              }`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-fuchsia-600 text-sm font-medium rounded-full shadow">
                    Most Popular
                  </span>
                )}

                <div className="text-center mb-8">
                  <h3 className={`font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? 'text-white/70' : 'text-gray-500'}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-fuchsia-600'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular 
                    ? 'bg-white text-fuchsia-600 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white hover:opacity-90'
                }`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          All plans include 14-day free trial • Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}

export default Pricing
