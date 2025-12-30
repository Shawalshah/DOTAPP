import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const Hero = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Three.js setup
    let raf = 0
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    // Get container size
    const getSize = () => ({
      w: container.clientWidth,
      h: container.clientHeight
    })

    // Initialize with current size - more dots for full coverage
    const { w: initW, h: initH } = getSize()
    const area = Math.max(1, (initW * initH) / 1000)
    const count = Math.max(150, Math.min(300, Math.floor(area / 10)))

    // State
    const state = {
      count,
      speed: 0.0003,
      linkDist: 0.22,
      maxLinks: 1500
    }

    // Buffers
    const positions = new Float32Array(state.count * 3)
    const velocities = new Float32Array(state.count * 2)

    // Initialize dots with random positions and velocities
    for (let i = 0; i < state.count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1)
      positions[i * 3 + 1] = (Math.random() * 2 - 1)
      positions[i * 3 + 2] = 0
      velocities[i * 2] = (Math.random() - 0.5) * state.speed
      velocities[i * 2 + 1] = (Math.random() - 0.5) * state.speed
    }

    // Points (dots)
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color('#a855f7'),
      size: 0.018,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: false
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    scene.add(points)

    // Lines (connections)
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(state.maxLinks * 2 * 3)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setDrawRange(0, 0)
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#a855f7'),
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // Resize handler
    const resize = () => {
      const { w, h } = getSize()
      renderer.setSize(w, h, false)
    }

    // Animation loop
    const animate = () => {
      const pos = pointsGeo.getAttribute('position').array
      const n = state.count

      // Move dots
      for (let i = 0; i < n; i++) {
        const ix = i * 3
        pos[ix] += velocities[i * 2]
        pos[ix + 1] += velocities[i * 2 + 1]

        // Bounce off edges
        if (pos[ix] < -1 || pos[ix] > 1) {
          velocities[i * 2] *= -1
          pos[ix] = Math.max(-1, Math.min(1, pos[ix]))
        }
        if (pos[ix + 1] < -1 || pos[ix + 1] > 1) {
          velocities[i * 2 + 1] *= -1
          pos[ix + 1] = Math.max(-1, Math.min(1, pos[ix + 1]))
        }
      }
      pointsGeo.getAttribute('position').needsUpdate = true

      // Build line segments for nearby dots
      const linkDist2 = state.linkDist * state.linkDist
      let v = 0
      let links = 0

      for (let i = 0; i < n && links < state.maxLinks; i++) {
        const ax = pos[i * 3]
        const ay = pos[i * 3 + 1]
        for (let j = i + 1; j < n && links < state.maxLinks; j++) {
          const bx = pos[j * 3]
          const by = pos[j * 3 + 1]
          const dx = ax - bx
          const dy = ay - by
          const d2 = dx * dx + dy * dy
          if (d2 <= linkDist2) {
            linePositions[v++] = ax
            linePositions[v++] = ay
            linePositions[v++] = 0
            linePositions[v++] = bx
            linePositions[v++] = by
            linePositions[v++] = 0
            links++
          }
        }
      }

      lineGeo.setDrawRange(0, links * 2)
      lineGeo.getAttribute('position').needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    // Initialize
    resize()
    animate()

    // Event listener
    window.addEventListener('resize', resize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      pointsGeo.dispose()
      pointsMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-white dark:bg-gray-900">
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-90" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white dark:from-gray-900/40 dark:via-gray-900/70 dark:to-gray-900 z-10"></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center py-20">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-50 to-indigo-50 dark:from-fuchsia-900/20 dark:to-indigo-900/20 border border-fuchsia-100 dark:border-fuchsia-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500"></span>
          <span className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300">
            AI-POWERED LEARNING PLATFORM
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] mb-6 break-words"
        >
          <span className="block">
            Be a valuable{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">DOT</span>
          </span>
          <span className="block">
            then{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">connect</span>
            {' '}in the age of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">AI</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Transform your learning journey with AI-powered courses, voice interactions, 
          and smart mentorship. Connect your knowledge and build your future.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="px-8 py-3.5 text-white bg-gradient-to-r from-fuchsia-500 to-indigo-500 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-fuchsia-500/25">
            Start Learning
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button className="px-8 py-3.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-medium hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-colors">
            Become an Editor
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
