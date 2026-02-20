"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const GOLD = { r: 212, g: 168, b: 83 }
    const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000))

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: (Math.random() * 0.5 + 0.2) * 0.02,
    }))

    let animId: number
    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fond gradient subtil
      const bg = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.8
      )
      bg.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.04)`)
      bg.addColorStop(1, "rgba(7,7,14,0)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grille dorée
      ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.04)`
      ctx.lineWidth = 1
      const grid = 70
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Particules
      for (const p of particles) {
        p.pulse += p.pulseSpeed
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha})`
        ctx.fill()

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6)
        grd.addColorStop(0, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha * 0.3})`)
        grd.addColorStop(1, "rgba(0,0,0,0)")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Connexions
        for (const q of particles) {
          if (p === q) continue
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${(1 - dist / 130) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Mouvement
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      // Lignes animées horizontales (scan lines)
      if (frame % 3 === 0) {
        const scanY = (frame * 0.5) % canvas.height
        ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.015)`
        ctx.fillRect(0, scanY, canvas.width, 1)
      }

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}
