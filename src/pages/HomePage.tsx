// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import HeaderLayout from "../layouts/HeaderLayout.tsx";
import Footer from "../components/Footer/Footer.tsx"; // AÑADIDO: Import del componente Footer
import "./styles/HomeStyle.css"
import Fondo from "../assets/image-inicio.png"
import LogoSimetrica from "../assets/logo-simetrica.png" // AÑADIDO: Import del logo para Footer

const Home = () => {
  // Estado para manejar la carga de la imagen de fondo
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Precargar imagen de fondo para mejor performance
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = Fondo;
  }, []);

  // AÑADIDO: Configuración de datos para Footer (manteniendo colores y branding existentes)
  const footerColumns = [
    {
      title: "Servicios",
      links: [
        { label: "Proyectos", href: "/proyectos" },
        { label: "Diseños", href: "/diseños" },
        { label: "Construcción", href: "/construccion" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Asociados", href: "/asociados" },
        { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
        { label: "Contacto", href: "/contacto" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Política de Privacidad", href: "/privacidad" },
        { label: "Términos de Servicio", href: "/terminos" }
      ]
    }
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/company/simetrica", external: true },
    { label: "Instagram", href: "https://instagram.com/simetrica", external: true }
  ];

  return (
    <>
      {/* Header fijo */}
      <HeaderLayout />
      
      {/* Sección principal con imagen de fondo */}
      <main className={`home-section ${isImageLoaded ? 'home-section--loaded' : ''}`}>
        {/* Imagen de fondo optimizada */}
        <div 
          className="home-section__background"
          style={{ 
            backgroundImage: isImageLoaded ? `url(${Fondo})` : 'none',
          }}
          role="img"
          aria-label="Imagen de fondo de la página principal de Simétrica"
        >
          {/* Overlay para mejorar legibilidad del contenido */}
          <div className="home-section__overlay"></div>
        </div>

        {/* Contenido principal de la página */}
        <div className="home-section__content">
          <div className="container">
            {/* Aquí se puede agregar contenido futuro como hero section, etc. */}
            <div className="hero-placeholder">
              {/* Contenido hero se agregará aquí en futuras iteraciones */}
            </div>
          </div>
        </div>

        {/* Indicador de scroll para UX mejorada */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-indicator__arrow"></div>
        </div>
      </main>

      {/* AÑADIDO: Footer reutilizable con configuración específica */}
      <Footer
        logoSrc={LogoSimetrica}
        logoAlt="Logo Simétrica - Empresa de diseño y construcción"
        columns={footerColumns}
        socialLinks={socialLinks}
        copyright="© 2025 Simétrica. Todos los derechos reservados."
        ariaLabel="Pie de página de Simétrica"
      />
    </>
  );
};

export default Home;