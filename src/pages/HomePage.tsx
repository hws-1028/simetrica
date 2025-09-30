// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import HeaderLayout from "../layouts/HeaderLayout.tsx";
import "./styles/HomeStyle.css"
import Fondo from "../assets/image-inicio.png"

const Home = () => {
  // Estado para manejar la carga de la imagen de fondo
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Precargar imagen de fondo para mejor performance
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = Fondo;
  }, []);

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
    </>
  );
};

export default Home;