import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  FileText,
  HelpCircle,
  Laptop,
  Mail,
  MessageCircle,
  Rocket,
  Settings,
  Sparkles,
  Trophy,
  Users2,
  Video,
} from 'lucide-react'

const Support = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [openCategoryId, setOpenCategoryId] = useState(null)

  const resources = useMemo(
    () => [
      {
        icon: Video,
        title: 'Video Tutorials',
        desc: 'Quick step-by-step walkthroughs for common tasks and features.'
      },
      {
        icon: FileText,
        title: 'Documentation',
        desc: 'Clear guides to help you understand features, settings, and best practices.'
      },
      {
        icon: Users2,
        title: 'Community Forum',
        desc: 'Ask questions, share tips, and learn from other DOT APP learners.'
      },
      {
        icon: Sparkles,
        title: 'Feature Request',
        desc: 'Suggest improvements and vote on new features you want to see next.'
      },
    ],
    []
  )

  const categories = useMemo(
    () => [
      {
        id: 'getting-started',
        icon: Rocket,
        title: 'Getting Started',
        subtitle: 'Setup, onboarding, and first steps',
        content: {
          summary:
            'If you are new to DOT APP, start here. These steps help you set up your profile, explore courses, and begin learning smoothly.',
          items: [
            {
              q: 'How do I create my account?',
              a: 'Open DOT APP, choose Sign Up, enter your details, and verify your email. Then complete your basic profile so we can personalize your experience.'
            },
            {
              q: 'How do I choose a learning path?',
              a: 'Go to Explore and pick a topic. Start with beginner modules, then move to intermediate. Your progress helps DOT Mentor recommend next lessons.'
            },
            {
              q: 'Tips for best results',
              a: 'Set a weekly goal, complete short modules daily, and use quizzes to validate understanding. Save notes and revisit summaries before moving ahead.'
            }
          ]
        }
      },
      {
        id: 'courses-learning',
        icon: BookOpen,
        title: 'Courses & Learning',
        subtitle: 'Content, quizzes, and progress tracking',
        content: {
          summary:
            'Everything related to courses, lesson flow, quizzes, certificates, and progress tracking.',
          items: [
            {
              q: 'A course is not loading',
              a: 'Check your internet connection, refresh the page, and try again. If it still fails, clear browser cache and disable ad-blockers for this site.'
            },
            {
              q: 'My progress is not updating',
              a: 'Make sure you finish the lesson completely and wait a few seconds. If you are switching devices, sign in with the same account and refresh.'
            },
            {
              q: 'Quizzes feel too hard/easy',
              a: 'DOT Mentor adapts based on your attempts. Complete a few quizzes and it will calibrate difficulty. You can also revisit prerequisites.'
            }
          ]
        }
      },
      {
        id: 'billing',
        icon: CreditCard,
        title: 'Billing & Subscription',
        subtitle: 'Plans, invoices, and payments',
        content: {
          summary:
            'Manage your plan, payment method, invoices, and subscription changes.',
          items: [
            {
              q: 'How do I upgrade or change plan?',
              a: 'Go to Pricing, choose a plan, and confirm payment. Your plan updates immediately and features unlock right away.'
            },
            {
              q: 'Payment failed',
              a: 'Double-check card details and available balance. Try another payment method. If you still face issues, contact support with your email and screenshot.'
            },
            {
              q: 'Where can I find invoices?',
              a: 'Open your account billing page and download invoices from your subscription history.'
            }
          ]
        }
      },
      {
        id: 'account-settings',
        icon: Settings,
        title: 'Account Settings',
        subtitle: 'Profile, password, and preferences',
        content: {
          summary:
            'Update your account details, privacy preferences, and learning personalization settings.',
          items: [
            {
              q: 'Forgot password',
              a: 'Use the Forgot Password option on login. You will receive a reset link on your registered email.'
            },
            {
              q: 'Change email or profile details',
              a: 'Open Settings, update your information, and save changes. Some changes may require re-verification for security.'
            },
            {
              q: 'Notifications',
              a: 'You can enable or disable reminders from Settings so you stay consistent with your learning goals.'
            }
          ]
        }
      },
      {
        id: 'achievements',
        icon: Trophy,
        title: 'Achievements & Rewards',
        subtitle: 'Badges, milestones, and recognition',
        content: {
          summary:
            'Track badges and milestones earned from your learning activities and consistent progress.',
          items: [
            {
              q: 'Why did I not receive a badge?',
              a: 'Badges are awarded after completing required modules and quizzes. If your progress is pending, refresh and ensure you are logged into the correct account.'
            },
            {
              q: 'How do rewards work?',
              a: 'Rewards are tied to learning streaks and course completion. Keep a steady weekly routine to unlock more milestones.'
            },
            {
              q: 'Can I share achievements?',
              a: 'Yes. Open the achievement and use the share option to post on your social profiles or copy a link.'
            }
          ]
        }
      },
      {
        id: 'technical',
        icon: Laptop,
        title: 'Technical Issues',
        subtitle: 'Login, performance, and bugs',
        content: {
          summary:
            'Troubleshooting for performance issues, login problems, or unexpected errors.',
          items: [
            {
              q: 'App feels slow',
              a: 'Close unused tabs/apps, refresh, and check your connection. If you are on mobile, update your browser/app to the latest version.'
            },
            {
              q: 'Login not working',
              a: 'Verify email/password, try password reset, and ensure caps lock is off. If you use Google login, try signing out and back in.'
            },
            {
              q: 'I found a bug',
              a: 'Please contact support with steps to reproduce, screenshots, and your device/browser details. This helps us fix it faster.'
            }
          ]
        }
      },
    ],
    []
  )

  const openCategory = categories.find((c) => c.id === openCategoryId) || null

  useEffect(() => {
    if (!openCategory) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [openCategory])

  useEffect(() => {
    if (!openCategory) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenCategoryId(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openCategory])

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
            <span className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">Support Center</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            How we can <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">help you</span>?
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find guides, tutorials, and quick solutions to common problems so you can keep learning without interruptions.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="group p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4 group-hover:from-fuchsia-200 group-hover:to-indigo-200 dark:group-hover:from-fuchsia-900/50 dark:group-hover:to-indigo-900/50 transition-colors">
                <r.icon className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">categories</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a category to explore common issues and step-by-step fixes.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              onClick={() => setOpenCategoryId(c.id)}
              className="text-left group p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-fuchsia-200 dark:hover:border-fuchsia-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-fuchsia-100 to-indigo-100 dark:from-fuchsia-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:from-fuchsia-200 group-hover:to-indigo-200 dark:group-hover:from-fuchsia-900/50 dark:group-hover:to-indigo-900/50 transition-colors">
                  <c.icon className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-fuchsia-500 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{c.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div id="contact-support" className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-fuchsia-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-2xl bg-white/70 dark:bg-gray-700 flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Still need help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              Send us a message and our team will guide you to the right solution.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl text-white bg-gradient-to-r from-fuchsia-500 to-indigo-500 font-medium hover:opacity-90 transition-opacity"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>

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
        </div>

      </div>

      {openCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpenCategoryId(null)}
            className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl"
          >
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-medium">Browse</p>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{openCategory.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{openCategory.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenCategoryId(null)}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{openCategory.content.summary}</p>

              <div className="mt-6 space-y-4">
                {openCategory.content.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">{item.q}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-fuchsia-50 to-indigo-50 dark:from-fuchsia-900/10 dark:to-indigo-900/10 border border-fuchsia-100 dark:border-fuchsia-800">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you still cannot resolve this issue, open Contact Support and share screenshots and your device/browser details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Support
