import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const SkillTree = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeNodes, setActiveNodes] = useState([])
  const [particles, setParticles] = useState([])

  const DIAGRAM_W = 850
  const DIAGRAM_H = 540

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

  const labelWidth = (text, type) => {
    const len = (text || '').length
    if (type === 'pill') return Math.max(140, len * 9 + 44)
    return Math.max(68, len * 8 + 28)
  }

  const nodeBox = (name, node) => {
    const w = labelWidth(name, node.type)
    const h = node.type === 'pill' ? 44 : 36
    return { x: node.x - w / 2, y: node.y - h / 2, w, h }
  }

  const computedNodes = (() => {
    const next = { ...nodes }
    const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length

    const layoutRow = (names, centerX, y, gap) => {
      const widths = names.map((n) => labelWidth(n, 'chip'))
      const total = widths.reduce((a, b) => a + b, 0) + gap * (names.length - 1)
      let cursor = centerX - total / 2
      names.forEach((n, i) => {
        const w = widths[i]
        next[n] = { ...next[n], x: cursor + w / 2, y }
        cursor += w + gap
      })
    }

    // Space out chip rows so labels don't feel cramped on web/mobile
    layoutRow(['HTML', 'CSS', 'JS', 'React'], avg([nodes['HTML'].x, nodes['CSS'].x, nodes['JS'].x, nodes['React'].x]), nodes['HTML'].y, 22)
    layoutRow(['Django', 'Node.js', 'MongoDB', 'PostgreSQL'], avg([nodes['Django'].x, nodes['Node.js'].x, nodes['MongoDB'].x, nodes['PostgreSQL'].x]), nodes['Django'].y, 22)
    layoutRow(['RESTful', 'Web-Based'], avg([nodes['RESTful'].x, nodes['Web-Based'].x]), nodes['RESTful'].y, 22)

    next['Front-End'] = { ...next['Front-End'], x: avg([next['HTML'].x, next['CSS'].x, next['JS'].x, next['React'].x]) }
    next['Back-End'] = { ...next['Back-End'], x: avg([next['Django'].x, next['Node.js'].x, next['MongoDB'].x, next['PostgreSQL'].x]) }
    next['APIs'] = { ...next['APIs'], x: avg([next['RESTful'].x, next['Web-Based'].x]) }
    next['Web Development'] = { ...next['Web Development'], x: avg([next['Front-End'].x, next['Back-End'].x]) }

    return next
  })()

  const halfHeight = (node) => (node?.type === 'pill' ? 22 : 18)

  const anchor = (name, side) => {
    const n = computedNodes[name]
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

        <div className="relative pb-8">
          <div className="relative mx-auto overflow-hidden bg-gradient-to-b from-white to-violet-50/50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
            <svg
              viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient id="pillGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.10" />
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

              {Object.entries(computedNodes).map(([name, data]) => {
                const active = activeNodes.includes(name)
                const b = nodeBox(name, data)
                const isPill = data.type === 'pill'
                return (
                  <motion.g
                    key={name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={active ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 25, delay: Object.keys(computedNodes).indexOf(name) * 0.04 }}
                    style={{ transformOrigin: `${data.x}px ${data.y}px` }}
                    filter={isPill ? 'url(#softShadow)' : undefined}
                  >
                    <rect
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={b.h}
                      rx={isPill ? 18 : 12}
                      fill={isPill ? 'url(#pillGradient)' : '#ffffff'}
                      stroke={isPill ? 'rgba(255,255,255,0.0)' : '#d8b4fe'}
                      strokeWidth={isPill ? 0 : 1}
                    />
                    <text
                      x={data.x}
                      y={data.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={isPill ? 14 : 13}
                      fontWeight={isPill ? 700 : 600}
                      fill={isPill ? '#ffffff' : '#7c3aed'}
                    >
                      {name}
                    </text>
                  </motion.g>
                )
              })}
            </svg>
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
