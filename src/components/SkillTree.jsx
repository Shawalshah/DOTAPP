import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const SkillTree = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeNodes, setActiveNodes] = useState([])
  const [particles, setParticles] = useState([])

  const nodes = {
    "Web Development": { x: 425, y: 60, type: 'pill' },
    "Front-End": { x: 200, y: 160, type: 'pill' },
    "Back-End": { x: 650, y: 160, type: 'pill' },
    "HTML": { x: 80, y: 270, type: 'chip' },
    "CSS": { x: 160, y: 270, type: 'chip' },
    "JS": { x: 240, y: 270, type: 'chip' },
    "React": { x: 320, y: 270, type: 'chip' },
    "Django": { x: 520, y: 270, type: 'chip' },
    "Node.js": { x: 600, y: 270, type: 'chip' },
    "MongoDB": { x: 680, y: 270, type: 'chip' },
    "PostgreSQL": { x: 770, y: 270, type: 'chip' },
    "APIs": { x: 520, y: 370, type: 'pill' },
    "RESTful": { x: 450, y: 470, type: 'chip' },
    "Web-Based": { x: 590, y: 470, type: 'chip' }
  }

  const halfHeight = (node) => (node?.type === 'pill' ? 22 : 18)

  const anchor = (name, side) => {
    const n = nodes[name]
    if (!n) return { x: 0, y: 0 }
    const hh = halfHeight(n)
    return { x: n.x, y: side === 'bottom' ? n.y + hh : n.y - hh }
  }

  const groups = [
    { key: 'root', parent: 'Web Development', children: ['Front-End', 'Back-End'] },
    { key: 'frontend', parent: 'Front-End', children: ['HTML', 'CSS', 'JS', 'React'] },
    { key: 'backend', parent: 'Back-End', children: ['Django', 'Node.js', 'MongoDB', 'PostgreSQL'] },
    { key: 'apis', parent: 'APIs', children: ['RESTful', 'Web-Based'] },
  ]

  const connections = [
    ["Web Development", "Front-End"],
    ["Web Development", "Back-End"],
    ["Front-End", "HTML"],
    ["Front-End", "CSS"],
    ["Front-End", "JS"],
    ["Front-End", "React"],
    ["Back-End", "Django"],
    ["Back-End", "Node.js"],
    ["Back-End", "MongoDB"],
    ["Back-End", "PostgreSQL"],
    ["Django", "APIs"],
    ["APIs", "RESTful"],
    ["APIs", "Web-Based"]
  ]

  useEffect(() => {
    if (isInView) {
      const names = Object.keys(nodes)
      names.forEach((name, i) => {
        setTimeout(() => setActiveNodes(prev => [...prev, name]), i * 80)
      })

      // Particles disabled to keep the centered trunk/bus geometry crisp and professional.
      setParticles([])
      return () => {}
    }
  }, [isInView])

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Become a valuable <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">DOT</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore interconnected learning paths designed for students like you.
          </p>
        </motion.div>

        <div className="relative overflow-x-auto pb-8">
          <div className="min-w-[850px] h-[540px] relative mx-auto bg-gradient-to-b from-white to-violet-50/50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {groups.map((g, idx) => {
                const parentActive = activeNodes.includes(g.parent)
                const childrenActive = g.children.every((c) => activeNodes.includes(c))
                const active = parentActive && childrenActive

                const p = anchor(g.parent, 'bottom')
                const cs = g.children.map((c) => anchor(c, 'top'))

                const y = (p.y + Math.min(...cs.map((c) => c.y))) / 2
                const minX = Math.min(...cs.map((c) => c.x))
                const maxX = Math.max(...cs.map((c) => c.x))

                const trunk = `M ${p.x} ${p.y} L ${p.x} ${y}`
                const bus = `M ${minX} ${y} L ${maxX} ${y}`

                return (
                  <g key={g.key}>
                    <motion.path
                      d={trunk}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity={active ? 0.75 : 0}
                      initial={{ pathLength: 0 }}
                      animate={active ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                    />
                    <motion.path
                      d={bus}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity={active ? 0.75 : 0}
                      initial={{ pathLength: 0 }}
                      animate={active ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.35, delay: idx * 0.06 + 0.08 }}
                    />

                    {/* junction dots */}
                    {active && (
                      <>
                        <circle cx={p.x} cy={y} r="3" fill="#d1d5db" />
                        <circle cx={minX} cy={y} r="3" fill="#d1d5db" />
                        <circle cx={maxX} cy={y} r="3" fill="#d1d5db" />
                      </>
                    )}

                    {g.children.map((child, j) => {
                      const c = anchor(child, 'top')
                      const drop = `M ${c.x} ${y} L ${c.x} ${c.y}`
                      return (
                        <motion.path
                          key={`${g.key}-${child}`}
                          d={drop}
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeOpacity={active ? 0.75 : 0}
                          initial={{ pathLength: 0 }}
                          animate={active ? { pathLength: 1 } : {}}
                          transition={{ duration: 0.35, delay: idx * 0.06 + 0.16 + j * 0.03 }}
                        />
                      )
                    })}
                  </g>
                )
              })}

              {/* Django -> APIs vertical connector */}
              {(() => {
                const from = 'Django'
                const to = 'APIs'
                const active = activeNodes.includes(from) && activeNodes.includes(to)
                const a = anchor(from, 'bottom')
                const b = anchor(to, 'top')
                const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`
                return (
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity={active ? 0.75 : 0}
                    initial={{ pathLength: 0 }}
                    animate={active ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.55 }}
                  />
                )
              })()}
            </svg>

            {Object.entries(nodes).map(([name, data]) => (
              <motion.div
                key={name}
                className="absolute"
                style={{ left: data.x, top: data.y, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={activeNodes.includes(name) ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: Object.keys(nodes).indexOf(name) * 0.04 }}
              >
                {data.type === 'pill' ? (
                  <motion.div
                    className="px-5 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-lg cursor-pointer bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    {name}
                  </motion.div>
                ) : (
                  <motion.div
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-violet-200 text-violet-700 shadow-sm dark:bg-gray-800 dark:border-violet-700 dark:text-violet-300 cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                    transition={{ duration: 0.15 }}
                  >
                    {name}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
        >
          Watch the light flow through your learning journey ✨
        </motion.p>
      </div>
    </section>
  )
}

export default SkillTree
