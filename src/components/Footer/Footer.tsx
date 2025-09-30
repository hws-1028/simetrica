// src/components/Footer/Footer.tsx
import React from 'react';
import './FooterStyle.css';

/* Interfaces TypeScript para props tipadas y reutilización */
export interface LinkItem {
  label: string;
  href: string;
  external?: boolean; // Para enlaces externos que abren en nueva pestaña
}

export interface Column {
  title: string;
  links: LinkItem[];
}

export interface FooterProps {
  logoSrc?: string; // Logo opcional para branding
  logoAlt?: string; // Alt text para accesibilidad
  columns?: Column[]; // Columnas de navegación configurables
  copyright?: string; // Texto de copyright personalizable
  className?: string; // Clase CSS adicional para personalización
  ariaLabel?: string; // Label ARIA para accesibilidad
  socialLinks?: LinkItem[]; // Enlaces de redes sociales opcionales
}

/**
 * Componente Footer reutilizable y accesible
 * Sigue patrones de diseño del sistema existente manteniendo variables CSS globales
 * Implementa WCAG 2.1 AA y responsividad completa (mobile, tablet, desktop, TV)
 */
const Footer: React.FC<FooterProps> = ({
  logoSrc,
  logoAlt = "Logo",
  columns = [],
  copyright,
  className = '',
  ariaLabel = 'Pie de página',
  socialLinks = []
}) => {
  
  // Función para manejar click en enlaces externos con analytics tracking
  const handleExternalLinkClick = (href: string, label: string) => {
    // Aquí se podría agregar tracking de analytics si fuera necesario en el futuro
    console.debug(`External link clicked: ${label} -> ${href}`);
  };

  return (
    <footer 
      className={`footer ${className}`} 
      role="contentinfo" 
      aria-label={ariaLabel}
    >
      {/* Container principal con grid responsivo */}
      <div className="footer__container container">
        
        {/* Sección superior con logo y columnas de navegación */}
        <div className="footer__main">
          
          {/* Branding section - Logo y información de la empresa */}
          {logoSrc && (
            <div className="footer__brand">
              <img 
                src={logoSrc} 
                alt={logoAlt}
                className="footer__logo"
                loading="lazy" // Optimización de performance
              />
              <div className="footer__brand-info">
                <h3 className="footer__brand-title">SIMÉTRICA</h3>
                <p className="footer__brand-description">
                  Empresa líder en diseño, proyectos y construcción
                </p>
              </div>
            </div>
          )}

          {/* Navegación por columnas - Estructura semántica para SEO */}
          {columns.length > 0 && (
            <nav className="footer__navigation" aria-label="Enlaces del pie de página">
              <div className="footer__columns">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="footer__column">
                    <h4 className="footer__column-title">
                      {column.title}
                    </h4>
                    <ul className="footer__links" role="list">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex} role="listitem">
                          <a
                            href={link.href}
                            className="footer__link"
                            target={link.external ? '_blank' : '_self'}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            onClick={link.external ? () => handleExternalLinkClick(link.href, link.label) : undefined}
                            aria-label={link.external ? `${link.label} (abre en nueva pestaña)` : link.label}
                          >
                            {link.label}
                            {/* Indicador visual para enlaces externos */}
                            {link.external && (
                              <span className="footer__external-icon" aria-hidden="true">
                                ↗
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          )}

          {/* Redes sociales - Si se proporcionan */}
          {socialLinks.length > 0 && (
            <div className="footer__social">
              <h4 className="footer__social-title">Síguenos</h4>
              <nav className="footer__social-links" aria-label="Enlaces de redes sociales">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (abre en nueva pestaña)`}
                    onClick={() => handleExternalLinkClick(social.href, social.label)}
                  >
                    {social.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Sección inferior con copyright y información legal */}
        {copyright && (
          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>{copyright}</p>
            </div>
          </div>
        )}
      </div>

      {/* Separador visual sutil */}
      <div className="footer__divider" aria-hidden="true"></div>
    </footer>
  );
};

export default Footer;