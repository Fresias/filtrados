# Documentación General del Proyecto

## 1. Descripción General

Este proyecto es una aplicación web moderna construida con Next.js, TypeScript y Tailwind CSS, orientada a la documentación, visualización y experimentación con animaciones avanzadas, componentes de UI reutilizables y una arquitectura escalable. Incluye catálogos, guías, dashboards de rendimiento, tienda, secciones de inspiración y aprendizaje, y más.

---

## 2. Estructura de Carpetas

- **/app**: Rutas y páginas principales (cada subcarpeta es una sección).
- **/components**: Componentes reutilizables (UI, animaciones, navegación, etc.).
- **/components/animations**: Componentes específicos de animaciones.
- **/components/ui**: Componentes de UI (botones, tabs, cards, formularios, etc.).
- **/hooks**: Hooks personalizados para animaciones, toasts, mobile, etc.
- **/lib**: Utilidades y helpers.
- **/public**: Imágenes y assets estáticos.
- **/styles**: Estilos globales.
- **/docs**: Documentación y catálogos de tokens/animaciones.
- **/tests**: Pruebas unitarias (en `components/__tests__`).

---

## 3. Librerías y Dependencias Principales

- **Next.js**: Framework principal (v15.2.4)
- **React**: Librería de UI (v19)
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Utilidades de estilos
- **GSAP**: Animaciones avanzadas
- **Three.js**: Gráficos 3D
- **Radix UI**: Componentes accesibles y personalizables
- **React Hook Form**: Formularios y validación
- **Zod**: Validación de esquemas
- **Jest + Testing Library**: Testing unitario
- **Lucide React**: Iconos SVG
- **date-fns**: Utilidades de fechas
- **embla-carousel-react**: Carruseles
- **Recharts**: Gráficos y visualizaciones
- **Sonner**: Notificaciones/toasts
- **Otros**: class-variance-authority, clsx, autoprefixer, postcss, etc.

---

## 4. Componentes Principales

### Navegación y Layout
- **Navigation**: Barra de navegación principal, responsive, con menú móvil animado.
- **Footer**: Pie de página con información de contacto y enlaces.
- **ClientLayout**: Layout general para páginas.

### Animaciones
- **basic-animation.tsx**: Animación básica de figuras geométricas.
- **text-animation.tsx**: Animación de texto carácter por carácter.
- **hover-animation.tsx**: Animación al hacer hover sobre elementos.
- **timeline-animation.tsx**: Animación tipo timeline.
- **scroll-animation.tsx**: Animación activada por scroll.
- **enhanced-***: Variantes avanzadas de animaciones.
- **animation-showcase.tsx**: Muestra varias animaciones.

### UI y Utilidades
- **ui/button.tsx**: Botón reutilizable con variantes.
- **ui/card.tsx**: Tarjeta de contenido.
- **ui/tabs.tsx**: Sistema de tabs.
- **ui/toast.tsx, ui/toaster.tsx**: Sistema de notificaciones.
- **ui/input.tsx, ui/textarea.tsx**: Inputs personalizados.
- **ui/accordion, ui/dialog, ui/tooltip, etc.**: Componentes Radix UI adaptados.
- **ui/carousel.tsx**: Carrusel de productos o imágenes.
- **ui/table.tsx, ui/chart.tsx**: Tablas y gráficos.

### Tienda y Productos
- **product-item.tsx**: Tarjeta de producto con animación y botón.
- **product-carousel.tsx**: Carrusel de productos.
- **shop-section.tsx**: Sección de tienda.

### Experiencia y Comunidad
- **experiencia/page.tsx**: Página de comunidad, workshops y testimonios.
- **poetry-section.tsx**: Sección de poesía animada.
- **about.tsx**: Sobre nosotros.

### Otros
- **contact.tsx**: Formulario de contacto animado.
- **menu.tsx**: Menú lateral o contextual.
- **logo-canvas.tsx**: Logo animado en canvas.
- **static-background.tsx**: Fondo estático decorativo.

---

## 5. Hooks Personalizados

- **use-animation-performance**: Mide el rendimiento de animaciones.
- **use-animation-tokens**: Proporciona tokens de animación (duración, easing, etc.).
- **use-gsap-animation**: Hook para animaciones GSAP.
- **use-reduced-motion**: Detecta si el usuario prefiere menos animaciones.
- **use-toast**: Manejo de toasts/notificaciones.
- **use-mobile**: Detecta si el usuario está en móvil.

---

## 6. Utilidades (`/lib`)

- **utils.ts**: Funciones auxiliares para clases, helpers, etc.

---

## 7. Páginas y Secciones Principales (`/app`)

- **/animation-catalog**: Catálogo de animaciones y tokens.
- **/animation-guide**: Guía de animaciones.
- **/performance-dashboard**: Dashboard de rendimiento de animaciones.
- **/refactorization-plan**: Plan de refactorización/documentación técnica.
- **/animation-examples**: Ejemplos de animaciones.
- **/animation-docs**: Documentación técnica de animaciones.
- **/experiencia**: Comunidad, workshops, testimonios.
- **/inspirate**: Inspiración visual y de animaciones.
- **/aprende**: Sección educativa.
- **/tienda** y **/shop**: Tienda de productos.
- **layout.tsx**: Layout general de la app.
- **globals.css**: Estilos globales.

---

## 8. Estilos

- **/styles/globals.css**: Tailwind + estilos personalizados.
- **tailwind.config.ts**: Configuración de Tailwind (colores, fuentes, etc.).
- **postcss.config.mjs**: Configuración de PostCSS.

---

## 9. Assets y Públicos

- **/public**: Imágenes de portada, productos, placeholders, logos, etc.

---

## 10. Testing

- **Jest + Testing Library**: Pruebas unitarias para componentes clave.
- **Cobertura**: Puedes ejecutar `npm run test:coverage` para ver la cobertura.
- **Mocks**: Se mockean GSAP y otros módulos para evitar errores en tests.

---

## 11. Scripts Útiles

- **npm run dev**: Inicia el servidor de desarrollo.
- **npm run build**: Compila la app para producción.
- **npm run lint**: Linting de código.
- **npm test**: Ejecuta los tests.
- **bash autofix.sh**: Script para autofix de linting (si existe).

---

## 12. Buenas Prácticas

- **TypeScript estricto**: El proyecto usa tipado estricto.
- **Componentes desacoplados y reutilizables**.
- **Animaciones accesibles y con soporte para reduced motion**.
- **Documentación de tokens y guías para mantener consistencia**.
- **Cobertura de tests en componentes críticos**.

---

## 13. Diagrama de Arquitectura (Visual y Flujo de Datos)

```
[Usuario]
   |
   v
[Next.js App Router]
   |
   v
[Páginas en /app] <----> [Componentes en /components]
   |                          |
   |                          v
   |                  [Hooks personalizados en /hooks]
   |                          |
   |                          v
   |                  [Librerías externas (GSAP, Three, Radix, etc.)]
   |
   v
[API de Next.js (si aplica)]
   |
   v
[Base de datos o servicios externos (si aplica)]
```

**Flujo de datos típico:**
- El usuario navega por la app (rutas en `/app`).
- Cada página usa componentes reutilizables de `/components`.
- Los componentes usan hooks personalizados para lógica de animación, UI, etc.
- Los hooks y componentes pueden interactuar con librerías externas.
- Los assets se sirven desde `/public`.
- Los estilos globales y de componentes se gestionan con Tailwind y CSS Modules.

---

## 14. Roadmap (Visión a Futuro)

**Fase 1: Refactorización y Documentación (Completada)**
- Documentar animaciones y tokens.
- Implementar hooks de animación y soporte para reduced motion.
- Monitoreo de rendimiento.

**Fase 2: Mejoras en Componentes Críticos (Semana 1-2)**
- Refactorizar y optimizar: IntroAnimation, WordsCarousel, ProductCarousel, SectionsNavigation.
- Pruebas y validación visual.

**Fase 3: Mejoras en Componentes Secundarios (Semana 3-4)**
- Refactorizar: PoetrySection, Menu, Contact, Footer.
- Pruebas y validación.

**Fase 4: Optimización Final y QA (Semana 5-6)**
- Refactorizar componentes de baja prioridad.
- Pruebas finales, documentación y capacitación.

**Fase 5: Futuro**
- Internacionalización (i18n).
- Integración con APIs externas.
- Mejoras de accesibilidad.
- Nuevas animaciones y ejemplos.
- Dashboard de métricas en tiempo real.
- PWA y soporte offline.

---

## 15. Proceso de Onboarding para Nuevos Desarrolladores

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd v0web
   ```

2. **Instala dependencias:**
   ```bash
   npm install
   ```

3. **Arranca el entorno de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Estructura clave:**
   - `/app`: Páginas y rutas.
   - `/components`: Componentes reutilizables.
   - `/hooks`: Hooks personalizados.
   - `/public`: Imágenes y assets.
   - `/styles`: Estilos globales.
   - `/docs`: Documentación y catálogos.

5. **Testing:**
   - Ejecuta `npm test` para correr los tests.
   - Los tests están en `components/__tests__`.

6. **Convenciones:**
   - Usa TypeScript estricto.
   - Sigue las convenciones de nombres (ver abajo).
   - Usa Tailwind para estilos.
   - Los componentes deben ser funcionales y desacoplados.

7. **Recursos útiles:**
   - Lee los archivos en `/docs` para entender tokens y guías.
   - Consulta los hooks en `/hooks` para lógica avanzada de animación.

---

## 16. Convenciones de Nombrado

- **Componentes:** PascalCase (`ProductItem`, `ShopSection`, `BasicAnimation`)
- **Hooks:** camelCase y prefijo `use` (`useAnimationTokens`, `useToast`)
- **Archivos de test:** mismo nombre que el componente + `.test.tsx`
- **Props:** camelCase (`isActive`, `onClick`)
- **Clases CSS:** BEM o utilidades de Tailwind.
- **Variables:** camelCase.
- **Constantes globales:** MAYÚSCULAS_SNAKE_CASE si aplica.
- **Directorio:** inglés, singular para componentes (`/component`, `/hook`), plural para colecciones (`/components`, `/hooks`).

---

## 17. Recursos Útiles y Consejos

- **Documentación interna:** `/docs/animation-catalog.tsx`, `/docs/refactorization-plan.tsx`.
- **Tokens y guías:** Usa los hooks y tokens para mantener consistencia en animaciones.
- **Testing:** Mockea librerías externas en los tests para evitar errores de entorno.
- **Accesibilidad:** Usa siempre soporte para prefers-reduced-motion y roles ARIA cuando sea necesario.
- **Performance:** Usa el dashboard de rendimiento y los hooks para monitorear FPS y recursos.

---

¿Dudas? Consulta este documento o pregunta a los mantenedores del proyecto. 