"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"

export function LogoCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    // Configuración básica de Three.js
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffedc0, 1) // Color de fondo Caminito Radiante

    // Crear el logo de fondo (FILTRADOS)
    const textureLoader = new THREE.TextureLoader()

    // Cargar la textura del logo
    textureLoader.load("/placeholder.svg?key=6y5l8", (logoTexture) => {
      const logoGeometry = new THREE.PlaneGeometry(10, 3)
      const logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
        opacity: 0.5,
      })
      const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial)
      logoMesh.position.z = -1
      scene.add(logoMesh)

      // Animación del logo
      gsap.to(logoMesh.position, {
        y: 0.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Efecto parallax con el movimiento del mouse
      window.addEventListener("mousemove", (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

        gsap.to(logoMesh.rotation, {
          x: mouseY * 0.05,
          y: mouseX * 0.05,
          duration: 1,
        })
      })
    })

    // Cargar la textura de la mascota
    textureLoader.load("/placeholder.svg?key=oysnn", (mascotTexture) => {
      const mascotGeometry = new THREE.PlaneGeometry(4, 4)
      const mascotMaterial = new THREE.MeshBasicMaterial({
        map: mascotTexture,
        transparent: true,
      })
      const mascotMesh = new THREE.Mesh(mascotGeometry, mascotMaterial)
      mascotMesh.position.z = 0
      scene.add(mascotMesh)

      // Animación de la mascota
      gsap.to(mascotMesh.position, {
        y: -0.1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Efecto parallax con el movimiento del mouse
      window.addEventListener("mousemove", (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

        gsap.to(mascotMesh.position, {
          x: mouseX * 0.3,
          y: mascotMesh.position.y + mouseY * 0.1,
          duration: 1,
        })
      })
    })

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Manejar el redimensionamiento de la ventana
    const handleResize = () => {
      if (!canvasRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animar la aparición de los iconos sociales
    if (socialRef.current) {
      gsap.fromTo(socialRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1 })
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", () => {})

      // Limpiar recursos de Three.js
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#FFEDCO]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none", userSelect: "none" }}
      />

      {/* Redes sociales */}
      <div ref={socialRef} className="absolute bottom-8 right-8 flex space-x-4 z-10">
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-twitter"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
