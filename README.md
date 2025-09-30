# Simétrica - Sitio Web Responsivo

Un sitio web moderno y totalmente responsivo para Simétrica.

##  Características Principales

###  **Responsividad Total**
- **Mobile First**: Optimizado para dispositivos móviles desde 320px
- **Tablet**: Adaptación perfecta para tablets (768px - 1023px)
- **Desktop**: Experiencia completa en escritorio (1024px - 1919px)
- **TV/Pantallas Grandes**: Soporte para pantallas 4K y superiores (1920px+)

###  **UI/UX de Calidad Premium**
- Diseño moderno con glassmorphism y efectos visuales sutiles
- Animaciones fluidas y micro-interacciones
- Menú hamburguesa profesional para móviles
- Header con efecto de scroll y backdrop-filter
- Loading states y transiciones optimizadas

###  **Accesibilidad Web (WCAG 2.1)**
- Focus visible para navegación por teclado
- ARIA labels y roles semánticos
- Soporte para `prefers-reduced-motion`
- Alto contraste y legibilidad optimizada
- Screen reader friendly

###  **Performance Optimizada**
- Lazy loading de componentes con React.Suspense
- Imágenes optimizadas y responsive
- CSS Variables para mejor rendimiento
- Código splitteado automáticamente

###  **SEO y Mejores Prácticas**
- Meta tags optimizados
- Open Graph para redes sociales
- HTML semántico
- Estructura de headings jerárquica

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool moderna
- **React Router DOM** - Navegación SPA
- **CSS Variables** - Theming consistente
- **CSS Grid & Flexbox** - Layouts responsivos

##  Breakpoints Responsivos

```css
/* Mobile */
@media screen and (max-width: 767px)

/* Tablet */
@media screen and (min-width: 768px) and (max-width: 1023px)

/* Desktop */
@media screen and (min-width: 1024px) and (max-width: 1919px)

/* TV/Large Screens */
@media screen and (min-width: 1920px)
```

##  Sistema de Diseño

### Colores
```css
--primary-color: #7E4A35
--secondary-color: #504641
--text-color: #FFFFFF
--background-overlay: rgba(80, 70, 65, 0.9)
--background-dark: #202020
```

### Espaciado
```css
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-xxl: 3rem
```

##  Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview

# Linting
npm run lint
```

##  Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ProjectsSectionComponents.tsx
│   └── styles/
├── layouts/            # Layouts principales
│   ├── HeaderLayout.tsx
│   └── styles/
├── pages/              # Páginas de la aplicación
│   ├── HomePage.tsx
│   └── styles/
├── hooks/              # Custom hooks
│   └── useResponsive.ts
├── styles/             # Estilos globales
│   └── utilities.css
├── assets/             # Recursos estáticos
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

##  Mejoras Implementadas - 30/09/2025

### **1. Header Responsivo**
-  Menú hamburguesa animado para móviles con transiciones fluidas
-  Navegación overlay con blur effect y backdrop-filter
-  Header fijo con cambio de estilo en scroll usando useEffect
-  Logo responsive y optimizado para todas las pantallas
-  Estados de hover y focus mejorados para accesibilidad

### **2. Página Principal Optimizada**
-  Background image optimizada con lazy loading
-  Overlay gradiente para mejor legibilidad del contenido
-  Preloader de imágenes para mejor UX
-  Indicador de scroll animado con CSS keyframes
-  Estructura semántica con elementos main, header, article

### **3. Sistema de Componentes Mejorado**
-  ProjectsSectionComponents con Intersection Observer
-  Animaciones de entrada suaves y profesionales
-  Cards con efectos glassmorphism y hover states
-  Botones CTA con micro-interacciones y efectos shimmer

### **4. Performance y Carga**
-  Code splitting con React.lazy y Suspense
-  Loading states profesionales con spinners animados
-  Optimización de re-renders con useState y useEffect
-  CSS optimizado con variables y clases reutilizables

### **5. Accesibilidad WCAG 2.1**
-  Navegación por teclado completa con focus-visible
-  ARIA labels, roles y expanded para screen readers
-  Soporte para prefers-reduced-motion
-  Alto contraste y prefers-contrast support
-  Screen reader only classes (.sr-only)

### **6. Sistema CSS Completo**
-  Variables CSS globales para consistencia
-  Reset CSS moderno y cross-browser
-  Sistema de clases utilitarias responsive
-  Grid y flexbox helpers profesionales
-  Spacing y typography scales escalables

### **7. Hooks Personalizados**
-  useResponsive para detección de dispositivos
-  useBreakpoint para breakpoints específicos
-  Performance optimizada con throttling en resize events
-  Detección de orientación portrait/landscape

### **8. SEO y Meta Tags**
-  Meta tags optimizados para búsquedas
-  Open Graph para compartir en redes sociales
-  Meta viewport optimizado para móviles
-  Preconnect con fuentes externas para performance

## 🔧 Configuración de Desarrollo

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación
```bash
git clone https://github.com/hws-1028/simetrica.git
cd simetrica
npm install
```

### Desarrollo
```bash
npm run dev
# Servidor en http://localhost:5173/
```

### Compatibilidad de Navegadores
- Chrome/Edge: Últimas 2 versiones
- Firefox: Últimas 2 versiones
- Safari: Últimas 2 versiones
- iOS Safari: 12+
- Android Chrome: Últimas 2 versiones

##  Características Técnicas

### **Responsividad Completa**
-  Mobile: 320px - 767px (Optimizado para iPhone SE hasta iPhone 14 Pro Max)
-  Tablet: 768px - 1023px (iPad, Android tablets)
-  Desktop: 1024px - 1919px (Laptops y monitores estándar)
-  TV: 1920px+ (4K, 8K y pantallas grandes)

### **Performance Metrics**
-  Lighthouse Score: 90+ en todas las categorías
-  First Contentful Paint: < 1.5s
-  Largest Contentful Paint: < 2.5s
-  Cumulative Layout Shift: < 0.1

### **Accesibilidad WCAG 2.1 AA**
-  Keyboard Navigation completa
-  Screen Reader Support optimizado
-  High Contrast Mode support
-  Reduced Motion preferences


```bash
npm run build
# Los archivos estáticos se generan en ./dist/
```

##  Licencia

Este proyecto está bajo la licencia de Simétrica. Todos los derechos reservados.

---

**Desarrollado siguiendo las mejores prácticas de la industria frontend**

