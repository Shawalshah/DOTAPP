import { motion, useInView } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { Briefcase, CreditCard, Mail, MessageCircle, Phone, Send, Settings, Users2 } from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const topics = useMemo(
    () => [
      { id: 'general', label: 'General Inquiry', icon: MessageCircle },
      { id: 'technical', label: 'Technical Support', icon: Settings },
      { id: 'billing', label: 'Billing Question', icon: CreditCard },
      { id: 'partnership', label: 'Partnership', icon: Users2 },
      { id: 'careers', label: 'Careers', icon: Briefcase },
    ],
    []
  )

  const [topic, setTopic] = useState('general')

  return (
    <section ref={ref} className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-50 to-indigo-50 dark:from-fuchsia-900/20 dark:to-indigo-900/20 border border-fuchsia-100 dark:border-fuchsia-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" />
            <span className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">Contact</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">Support</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Share your issue with details (screenshots, device, browser). Our team will help you as soon as possible.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">support@dotapp.com</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Response within 24 hours</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Average wait: 2 minutes</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-fuchsia-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Priority Help</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              For urgent issues, submit the form with full details and we will escalate it.
            </p>
          </div>
        </div>

        <div className="mt-10 p-5 sm:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Full Name *</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address *</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                placeholder="john@example.com"
                type="email"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">What can we help with?</label>
              <div className="flex flex-wrap gap-3">
                {topics.map((t) => {
                  const Icon = t.icon
                  const isActive = topic === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTopic(t.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                        isActive
                          ? 'border-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-fuchsia-300 dark:hover:border-fuchsia-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-300'}`} />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Subject *</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Message *</label>
              <textarea
                className="w-full min-h-[200px] px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                placeholder="Please provide as much detail as possible so we can best assist you..."
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-gray-900 text-white font-medium hover:opacity-95 transition-opacity"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
