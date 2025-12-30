import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const HowWeUnderstand = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [active, setActive] = useState(0)

  const DIAGRAM_W = 1180
  const DIAGRAM_H = 460

  // Node definitions
  const nodes = [
    { id: 'you', x: 120, y: 230, r: 50, label: 'YOU', type: 'root', icon: 'person', textOffsetY: 20 },
    
    { id: 'info1', x: 320, y: 90, r: 34, label: 'Personal Info', type: 'dot', dotIndex: 0 },
    { id: 'info2', x: 320, y: 170, r: 34, label: 'Your Education', type: 'dot', dotIndex: 1 },
    { id: 'info3', x: 320, y: 250, r: 34, label: 'Your Skills', type: 'dot', dotIndex: 2 },
    { id: 'info4', x: 320, y: 330, r: 34, label: 'Your Goal', type: 'dot', dotIndex: 3 },
    
    { id: 'mentor', x: 520, y: 230, r: 46, label: 'DOT\nMentor', type: 'mentor' },
    { id: 'mentorship', x: 690, y: 230, r: 52, label: 'Courses', type: 'mentorship' },
    
    { id: 'topic1', x: 1000, y: 70, r: 32, label: 'Web\nDevelopment', type: 'topic' },
    { id: 'topic2', x: 1000, y: 150, r: 32, label: 'Data\nScience', type: 'topic' },
    { id: 'topic3', x: 1000, y: 230, r: 32, label: 'AI', type: 'topic' },
    { id: 'topic4', x: 1000, y: 310, r: 32, label: 'Python\nProgramming', type: 'topic' },
    { id: 'topic5', x: 1000, y: 390, r: 32, label: 'Machine\nLearning', type: 'topic' },
  ]

  const connections = [
    { from: 'you', to: 'info1' },
    { from: 'you', to: 'info2' },
    { from: 'you', to: 'info3' },
    { from: 'you', to: 'info4' },
    { from: 'info1', to: 'mentor' },
    { from: 'info2', to: 'mentor' },
    { from: 'info3', to: 'mentor' },
    { from: 'info4', to: 'mentor' },
    { from: 'mentor', to: 'mentorship' },
    { from: 'mentorship', to: 'topic1' },
    { from: 'mentorship', to: 'topic2' },
    { from: 'mentorship', to: 'topic3' },
    { from: 'mentorship', to: 'topic4' },
    { from: 'mentorship', to: 'topic5' },
  ]

  const dotIndexFromId = (id) => {
    if (id === 'info1') return 0
    if (id === 'info2') return 1
    if (id === 'info3') return 2
    if (id === 'info4') return 3
    return -1
  }

  const topicIndexFromId = (id) => {
    if (id === 'topic1') return 0
    if (id === 'topic2') return 1
    if (id === 'topic3') return 2
    if (id === 'topic4') return 3
    if (id === 'topic5') return 4
    return -1
  }

  const getNode = (id) => nodes.find(n => n.id === id)

  const getNodeColor = (type, dotIndex) => {
    if (type === 'dot' && dotIndex === active) {
      return { fill: 'url(#activeGrad)', stroke: '#7c3aed', ring: '#c4b5fd' }
    }
    switch (type) {
      case 'root': return { fill: 'url(#rootGrad)', stroke: '#7c3aed', ring: '#c4b5fd' }
      case 'dot': return { fill: '#ffffff', stroke: '#94a3b8', ring: '#e2e8f0' }
      case 'mentor': return { fill: '#ffffff', stroke: '#6366f1', ring: '#a5b4fc' }
      case 'mentorship': return { fill: 'url(#mentorshipGrad)', stroke: '#ec4899', ring: '#f9a8d4' }
      case 'topic': return { fill: '#ffffff', stroke: '#22c55e', ring: '#86efac' }
      default: return { fill: '#ffffff', stroke: '#e5e7eb', ring: '#f3f4f6' }
    }
  }

  const getLineColor = (fromType, toType) => {
    if (fromType === 'root' || toType === 'dot') return '#a78bfa'
    if (fromType === 'dot') return '#94a3b8'
    if (fromType === 'mentor') return '#6366f1'
    if (fromType === 'mentorship') return '#22c55e'
    return '#e5e7eb'
  }

  const renderMultilineText = (node, color = '#111827') => {
    const lines = String(node.label || '').split('\n').filter(Boolean)
    if (lines.length === 0) return null
    const lineHeight = node.type === 'dot' ? 11 : (node.type === 'topic' ? 10 : 13)
    const baseY = node.y + (node.textOffsetY || 0) + (node.type === 'topic' ? -1 : 0)

    const dotFontSize = (() => {
      if (node.type !== 'dot') return null
      const text = String(node.label || '')
      if (text.length >= 13) return 8.6
      if (text.length >= 11) return 9.2
      return 10.2
    })()

    return (
      <text
        x={node.x}
        y={baseY - ((lines.length - 1) * lineHeight) / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={node.type === 'dot' ? dotFontSize : (node.type === 'topic' ? (lines.length >= 2 ? 9.1 : 10) : (node.r >= 48 ? 13 : 11))}
        fontWeight={700}
        fill={color}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={node.x} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    )
  }

  const connectorPath = (from, to) => {
    if (from.id === 'mentorship' && String(to.id).startsWith('topic')) {
      const idx = topicIndexFromId(to.id)
      const spread = [-36, -18, 0, 18, 36]
      const s = spread[idx] ?? 0
      const dx = to.x - from.x
      const dy = to.y - from.y
      const startX = from.x + from.r
      const startY = from.y + s * 0.25
      const endX = to.x - to.r
      const endY = to.y
      const cx = from.x + dx * 0.55
      const cy = from.y + dy * 0.7 + s
      return `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`
    }
    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const ux = dx / dist
    const uy = dy / dist
    const x1 = from.x + ux * from.r
    const y1 = from.y + uy * from.r
    const x2 = to.x - ux * to.r
    const y2 = to.y - uy * to.r
    return `M ${x1} ${y1} L ${x2} ${y2}`
  }

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
            How we <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">understand</span> you
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four key dots that help us create your perfect learning experience
          </p>
        </motion.div>

        {/* SVG Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative pb-8"
        >
          <div className="relative mx-auto overflow-x-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-4 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <svg
              viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto min-w-[900px] md:min-w-0 max-w-5xl mx-auto"
            >
              <defs>
                <linearGradient id="rootGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="activeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="mentorshipGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Connection lines */}
              {connections.map((conn, idx) => {
                const from = getNode(conn.from)
                const to = getNode(conn.to)
                if (!from || !to) return null

                const activeDotIndex = dotIndexFromId(conn.to)
                const activeFromDotIndex = dotIndexFromId(conn.from)

                const isYouToDot = conn.from === 'you' && activeDotIndex !== -1
                const isDotToMentor = conn.to === 'mentor' && activeFromDotIndex !== -1
                const isMentorChain = conn.from === 'mentor' && conn.to === 'mentorship'

                const isActiveLink = (isYouToDot && activeDotIndex === active) || (isDotToMentor && activeFromDotIndex === active)

                const lineColor = getLineColor(from.type, to.type)
                const d = connectorPath(from, to)
                return (
                  <motion.path
                    key={`line-${idx}`}
                    d={d}
                    stroke={lineColor}
                    strokeWidth={isActiveLink ? 3.5 : (isMentorChain ? 3 : 2.2)}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: isActiveLink ? 0.95 : (isMentorChain ? 0.85 : 0.45) } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node, idx) => {
                const colors = getNodeColor(node.type, node.dotIndex)
                const isRoot = node.type === 'root'
                const isMentorship = node.type === 'mentorship'
                const textColor = (isRoot || isMentorship || (node.type === 'dot' && node.dotIndex === active)) ? '#ffffff' : '#111827'

                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.06 }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    onClick={() => {
                      if (node.type === 'dot' && node.dotIndex !== undefined) {
                        setActive(node.dotIndex)
                      }
                    }}
                    className={node.type === 'dot' ? 'cursor-pointer' : ''}
                  >
                    {/* Outer ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 5}
                      fill="none"
                      stroke={colors.ring}
                      strokeWidth="2.5"
                      opacity="0.5"
                    />

                    {/* Main circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="2.5"
                      filter="url(#nodeShadow)"
                    />

                    {/* Icons */}
                    {node.icon === 'person' && (
                      <g transform={`translate(${node.x - 16}, ${node.y - 22})`}>
                        <circle cx="16" cy="8" r="6" fill="#ffffff" />
                        <path d="M16 16c-6 0-10 4-10 8v2h20v-2c0-4-4-8-10-8z" fill="#ffffff" />
                      </g>
                    )}

                    {/* Label */}
                    {renderMultilineText(node, textColor)}
                  </motion.g>
                )
              })}

              {/* Mentorship subtitle label */}
              <text
                x={690}
                y={305}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#6b7280"
                className="dark:fill-gray-400"
              >
                Use DOTAPP · Follow AI Learning
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeUnderstand
