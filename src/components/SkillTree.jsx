import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SkillTree = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const el = document.documentElement
    const update = () => setIsDark(el.classList.contains('dark'))
    update()

    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const DIAGRAM_W = 1020
  const DIAGRAM_H = 640

  // Full structure (as provided)
  // Web Development
  //  - FrontEnd -> HTML, CSS, JavaScript, React
  //  - BackEnd  -> Django -> API's -> RestFull, Web-Based
  //            -> MongoDB, Node js, PostgreSql
  const nodes = [
    { id: 'root', x: 490, y: 70, r: 54, label: 'Web\nDevelopment', type: 'root', icon: 'cap' },

    { id: 'frontend', x: 270, y: 210, r: 46, label: 'FrontEnd', type: 'branch', icon: 'targetArrow' },
    { id: 'backend', x: 710, y: 210, r: 46, label: 'BackEnd', type: 'branch', icon: 'targetArrow' },

    { id: 'html', x: 140, y: 360, r: 36, label: 'HTML', type: 'leaf', icon: 'htmlLogo' },
    { id: 'css', x: 250, y: 360, r: 36, label: 'CSS', type: 'leaf', icon: 'cssLogo' },
    { id: 'javascript', x: 360, y: 360, r: 36, label: 'JavaScript', type: 'leaf', icon: 'jsLogo' },
    { id: 'reactLeaf', x: 470, y: 360, r: 36, label: 'React', type: 'leaf', icon: 'reactLogo' },

    { id: 'django', x: 610, y: 360, r: 38, label: 'Django', type: 'branch', icon: 'djangoLogo' },
    { id: 'mongo', x: 725, y: 360, r: 36, label: 'MongoDB', type: 'leaf', icon: 'mongoLogo' },
    { id: 'nodejs', x: 835, y: 360, r: 36, label: 'Node js', type: 'leaf', icon: 'nodeLogo' },
    { id: 'postgres', x: 945, y: 360, r: 36, label: 'Postgre\nSql', type: 'leaf', icon: 'postgresLogo' },

    { id: 'apis', x: 610, y: 500, r: 40, label: "API's", type: 'branch', icon: 'apiLogo' },
    { id: 'rest', x: 540, y: 600, r: 34, label: 'RestFull', type: 'leaf', icon: 'restLogo' },
    { id: 'webbased', x: 680, y: 600, r: 34, label: 'Web-\nBased', type: 'leaf', icon: 'webLogo' },
  ]

  const connections = [
    { from: 'root', to: 'frontend', curve: 0.18 },
    { from: 'root', to: 'backend', curve: 0.18 },

    { from: 'frontend', to: 'html', curve: 0 },
    { from: 'frontend', to: 'css', curve: 0 },
    { from: 'frontend', to: 'javascript', curve: 0 },
    { from: 'frontend', to: 'reactLeaf', curve: 0 },

    { from: 'backend', to: 'django', curve: 0 },
    { from: 'backend', to: 'mongo', curve: 0 },
    { from: 'backend', to: 'nodejs', curve: 0 },
    { from: 'backend', to: 'postgres', curve: 0 },

    { from: 'django', to: 'apis', curve: 0 },
    { from: 'apis', to: 'rest', curve: 0 },
    { from: 'apis', to: 'webbased', curve: 0 },
  ]

  const getNode = (id) => nodes.find(n => n.id === id)

  const getNodeColor = (type) => {
    if (isDark) {
      switch (type) {
        case 'root': return { fill: '#8b5cf6', stroke: '#a78bfa', ring: '#6d28d9' }
        case 'branch': return { fill: '#111827', stroke: '#93c5fd', ring: '#2563eb' }
        case 'leaf': return { fill: '#111827', stroke: '#86efac', ring: '#16a34a' }
        default: return { fill: '#111827', stroke: '#334155', ring: '#1f2937' }
      }
    }

    switch (type) {
      case 'root': return { fill: '#8b5cf6', stroke: '#7c3aed', ring: '#a78bfa' }
      case 'branch': return { fill: '#ffffff', stroke: '#3b82f6', ring: '#93c5fd' }
      case 'leaf': return { fill: '#ffffff', stroke: '#22c55e', ring: '#86efac' }
      default: return { fill: '#ffffff', stroke: '#cbd5e1', ring: '#e2e8f0' }
    }
  }

  const getLineColor = (fromType) => {
    if (isDark) {
      switch (fromType) {
        case 'root': return '#a78bfa'
        case 'branch': return '#60a5fa'
        case 'leaf': return '#34d399'
        default: return '#475569'
      }
    }

    switch (fromType) {
      case 'root': return '#8b5cf6'
      case 'branch': return '#2563eb'
      case 'leaf': return '#16a34a'
      default: return '#94a3b8'
    }
  }

  const getTextColor = (type) => {
    if (type === 'root') return '#ffffff'
    return isDark ? '#e5e7eb' : '#111827'
  }

  const renderMultilineText = (node) => {
    const lines = String(node.label || '').split('\n').filter(Boolean)
    const baseY = node.y + 16
    const lineHeight = 12
    return (
      <text
        x={node.x}
        y={baseY - ((lines.length - 1) * lineHeight) / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={node.r >= 50 ? 12.5 : 12}
        fontWeight={700}
        fill={getTextColor(node.type)}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={node.x} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    )
  }

  const connectorPath = (from, to, curve = 0) => {
    const x1 = from.x
    const y1 = from.y + from.r
    const x2 = to.x
    const y2 = to.y - to.r
    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const dx = x2 - x1
    const cx = mx
    const cy = my + Math.abs(dx) * curve
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
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
            Become a valuable <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">DOT</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore interconnected learning paths designed for students like you.
          </p>
        </motion.div>

        <div className="relative pb-8">
          <div className="relative mx-auto overflow-x-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-4 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <svg
              viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto min-w-[600px] md:min-w-0 max-w-5xl mx-auto"
            >
              <defs>
                <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Connection lines */}
              {connections.map((conn, idx) => {
                const from = getNode(conn.from)
                const to = getNode(conn.to)
                if (!from || !to) return null

                const lineColor = getLineColor(from.type)
                const d = connectorPath(from, to, conn.curve)

                return (
                  <motion.path
                    key={`line-${idx}`}
                    d={d}
                    stroke={lineColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node, idx) => {
                const colors = getNodeColor(node.type)
                const isRoot = node.type === 'root'
                const iconY = node.y - 16

                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.1 }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  >
                    {/* Outer ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 6}
                      fill="none"
                      stroke={colors.ring}
                      strokeWidth="3"
                      opacity="0.6"
                    />

                    {/* Main circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="3"
                      filter="url(#nodeShadow)"
                    />

                    {/* Icon */}
                    <g transform={`translate(${node.x - 12}, ${iconY - 12})`}>
                      {node.icon === 'cap' && (
                        <path
                          d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"
                          fill="#ffffff"
                          transform="scale(1)"
                        />
                      )}
                      {node.icon === 'target' && (
                        <g fill="none" stroke="#f472b6" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" fill="#f472b6" />
                        </g>
                      )}
                      {node.icon === 'targetArrow' && (
                        <>
                          <g fill="none" stroke="#fb7185" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="12" r="6" />
                          </g>
                          <circle cx="12" cy="12" r="2" fill="#fb7185" />
                          <path
                            d="M20 4 L13.8 10.2"
                            stroke="#60a5fa"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M20 4 L18.8 7.6 L16.4 5.2 Z"
                            fill="#60a5fa"
                          />
                        </>
                      )}
                    {node.icon === 'htmlLogo' && (
                      <g>
                        <path d="M5 3h14l-1.4 15.4L12 21l-5.6-2.6L5 3z" fill="#f97316" />
                        <path d="M12 19.4l4.4-2.1L17.6 4H12v15.4z" fill="#fb923c" />
                        <path d="M8 7h8l-.3 3H8.3l.2 2.4h5.9l-.4 4.3L12 18l-2.6-1.1-.2-2.2h2l.1 1.1L12 16l1.5-.7.2-2.1H8.7L8 7z" fill="#ffffff" opacity="0.95" />
                      </g>
                    )}
                    {node.icon === 'cssLogo' && (
                      <g>
                        <path d="M5 3h14l-1.4 15.4L12 21l-5.6-2.6L5 3z" fill="#3b82f6" />
                        <path d="M12 19.4l4.4-2.1L17.6 4H12v15.4z" fill="#60a5fa" />
                        <path d="M8 7h8l-.3 3H8.3l.2 2.2h5.8l-.4 4.1L12 18l-2.6-1.1-.2-2.2h2l.1 1.1L12 16l1.5-.7.2-2H8.7L8 7z" fill="#ffffff" opacity="0.95" />
                      </g>
                    )}
                    {node.icon === 'jsLogo' && (
                      <g>
                        <rect x="4" y="4" width="16" height="16" rx="3" fill="#facc15" />
                        <path d="M9 8v6c0 1.5-.9 2.3-2.2 2.3-.9 0-1.6-.4-2-1.1l1.4-.9c.2.4.4.6.8.6.4 0 .6-.1.6-.8V8h1.4z" fill="#111827" />
                        <path d="M13.2 16.3c-1.3 0-2.1-.6-2.5-1.5l1.4-.8c.3.5.6.8 1.2.8.5 0 .9-.2.9-.6 0-.4-.3-.6-1.1-.9l-.4-.2c-1.1-.5-1.8-1.1-1.8-2.4 0-1.2 1-2.1 2.5-2.1 1.1 0 1.9.4 2.4 1.3l-1.3.8c-.3-.5-.6-.7-1.1-.7-.5 0-.7.3-.7.6 0 .4.2.6.9.9l.4.2c1.3.6 2 1.2 2 2.5 0 1.4-1.1 2.1-2.8 2.1z" fill="#111827" />
                      </g>
                    )}
                    {node.icon === 'reactLogo' && (
                      <g fill="none" stroke="#22d3ee" strokeWidth="1.8">
                        <ellipse cx="12" cy="12" rx="9" ry="3.6" />
                        <ellipse cx="12" cy="12" rx="3.6" ry="9" transform="rotate(60 12 12)" />
                        <ellipse cx="12" cy="12" rx="3.6" ry="9" transform="rotate(-60 12 12)" />
                        <circle cx="12" cy="12" r="1.8" fill="#22d3ee" stroke="none" />
                      </g>
                    )}
                    {node.icon === 'djangoLogo' && (
                      <g>
                        <rect x="4" y="4" width="16" height="16" rx="4" fill="#16a34a" />
                        <path d="M9 7h2.2c2.3 0 3.8 1.2 3.8 3.6 0 2.6-1.5 4.4-4.3 4.4H9V7zm2.3 6.3c1.5 0 2.2-1 2.2-2.7 0-1.4-.6-2.2-2.1-2.2h-.9v4.9h.8z" fill="#ffffff" opacity="0.95" />
                      </g>
                    )}
                    {node.icon === 'mongoLogo' && (
                      <g>
                        <path d="M12 3c2.6 2.8 4.2 6 4.2 9.2 0 4-2.1 6.5-4.2 8.8-2.1-2.3-4.2-4.8-4.2-8.8C7.8 9 9.4 5.8 12 3z" fill="#22c55e" />
                        <path d="M12 6.3c.7 2.2.9 4.6.6 7.4-.2 2-.6 3.8-.6 5.6" stroke="#166534" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </g>
                    )}
                    {node.icon === 'nodeLogo' && (
                      <g>
                        <path d="M12 3l7.8 4.5v9L12 21 4.2 16.5v-9L12 3z" fill="#22c55e" />
                        <path d="M9 9.2c0-.4.3-.7.7-.7h.2c.2 0 .4.1.6.2l3.1 3.6V9.2c0-.4.3-.7.7-.7h.3c.4 0 .7.3.7.7v5.6c0 .4-.3.7-.7.7h-.2c-.2 0-.4-.1-.6-.2l-3.1-3.6v3.1c0 .4-.3.7-.7.7h-.3c-.4 0-.7-.3-.7-.7V9.2z" fill="#052e16" opacity="0.9" />
                      </g>
                    )}
                    {node.icon === 'postgresLogo' && (
                      <g>
                        <path d="M12 4c3 0 5.2 1.8 5.2 4.2 0 1.7-1.1 3-2.7 3.7v2.1c0 2.4-1.2 4.1-2.5 5.6-1.3-1.5-2.5-3.2-2.5-5.6v-2.1C5.9 11.2 4.8 9.9 4.8 8.2 4.8 5.8 7 4 10 4h2z" fill="#2563eb" />
                        <circle cx="10" cy="9.4" r="0.9" fill="#ffffff" />
                        <circle cx="14" cy="9.4" r="0.9" fill="#ffffff" />
                        <path d="M10.2 13.4c1.2.9 2.4.9 3.6 0" stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </g>
                    )}
                    {node.icon === 'apiLogo' && (
                      <g>
                        <rect x="4" y="5" width="16" height="14" rx="5" fill="#60a5fa" />
                        <path d="M9 10.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-3z" fill="#0b1220" opacity="0.18" />
                        <path d="M9.2 12h5.6" stroke="#0b1220" strokeWidth="1.7" strokeLinecap="round" />
                        <path d="M12 9.2v5.6" stroke="#0b1220" strokeWidth="1.7" strokeLinecap="round" />
                      </g>
                    )}
                    {node.icon === 'restLogo' && (
                      <g>
                        <rect x="4" y="5" width="16" height="14" rx="5" fill="#34d399" />
                        <path d="M9 9.2L6.8 12 9 14.8" fill="none" stroke="#052e16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 9.2l2.2 2.8L15 14.8" fill="none" stroke="#052e16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.4 15.2l3.2-6.4" fill="none" stroke="#052e16" strokeWidth="1.6" strokeLinecap="round" />
                      </g>
                    )}
                    {node.icon === 'webLogo' && (
                      <g fill="none" stroke="#22c55e" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M4 12h16" />
                        <path d="M12 4c2.2 2.5 2.2 13.5 0 16" />
                        <path d="M12 4c-2.2 2.5-2.2 13.5 0 16" />
                      </g>
                    )}
                  </g>

                  {/* Label (inside circle) */}
                  {renderMultilineText(node)}
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
