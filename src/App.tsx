// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";

// Lazy loading para mejor performance
const Home = lazy(() => import("./pages/HomePage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const TrabajaConNosotrosPage = lazy(() => import("./pages/TrabajaConNosotrosPage.tsx"));

// Componente de loading para Suspense
const LoadingSpinner = () => (
  <div className="loading-container" role="status" aria-label="Cargando página">
    <div className="loading-spinner"></div>
    <span className="sr-only">Cargando...</span>
  </div>
);

function App() {
  return (
    <div className="app-container">
      {/* Suspense para lazy loading con fallback de loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Rutas futuras se agregarán aquí */}
          <Route path="/asociados" element={<div>Página de Asociados (En desarrollo)</div>} />
          <Route path="/proyectos" element={<div>Página de Proyectos (En desarrollo)</div>} />
          <Route path="/diseños" element={<div>Página de Diseños (En desarrollo)</div>} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotrosPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          {/* Ruta 404 */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
