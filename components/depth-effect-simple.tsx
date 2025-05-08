"use client"
import Image from "next/image"

export function DepthEffectSimple() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#FFEDCO]">
      {/* Fondo con patrón de granos de café */}
      <div
        className="absolute inset-0 w-full h-full opacity-15"
        style={{
          backgroundImage: "url('/placeholder.svg?key=ux4h9')",
          backgroundSize: "500px 500px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Contenedor central para el logo y V60 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Logo FILTRADOS */}
        <div className="relative w-[80%] max-w-[600px]">
          <Image
            src="/placeholder.svg?key=21t72"
            alt="FILTRADOS"
            width={800}
            height={200}
            className="w-full h-auto opacity-70"
          />

          {/* V60 superpuesto */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[400px]">
            <Image
              src="/placeholder.svg?key=yxnze"
              alt="V60 Coffee Dripper"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
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
