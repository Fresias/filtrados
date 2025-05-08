"use client"

export function StaticBackground() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#FFEDCO]"
      style={{ willChange: "transform", contain: "content" }} // Optimizaciones de rendimiento
    >
      {/* Texto FILTRADOS grande en el fondo - Simplificado para carga más rápida */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
        style={{ userSelect: "none" }}
      >
        <h1 className="text-[20vw] font-bold font-display text-[#570B0A]/10">FILTRADOS</h1>
      </div>

      {/* Elemento V60 simplificado */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none">
        <div className="w-full h-full relative">
          {/* SVG de V60 basado en la imagen proporcionada */}
          <svg
            viewBox="0 0 100 70"
            className="w-full h-full"
            fill="none"
            stroke="#570B0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Forma principal del V60 */}
            <path d="M20,15 L80,15 L65,50 L35,50 Z" />

            {/* Líneas internas (ranuras) */}
            <line x1="35" y1="50" x2="42" y2="20" />
            <line x1="43" y1="50" x2="48" y2="20" />
            <line x1="50" y1="50" x2="50" y2="20" />
            <line x1="57" y1="50" x2="52" y2="20" />
            <line x1="65" y1="50" x2="58" y2="20" />

            {/* Asa */}
            <path d="M80,15 Q90,20 85,30" />

            {/* Base */}
            <path d="M35,50 L30,55 L70,55 L65,50" />
            <ellipse cx="50" cy="60" rx="15" ry="5" />
          </svg>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="absolute bottom-8 right-8 flex space-x-4 z-10">
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
