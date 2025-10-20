/* ARCHIVO AÑADIDO: ContactPage para demostrar ContactForm - 2025-10-01 */
// src/pages/ContactPage.tsx
// Página de contacto que utiliza el componente ContactForm

import React from 'react';
import HeaderLayout from '../layouts/HeaderLayout';
import Footer from '../layouts/Footer/Footer';
import ContactForm from '../components/ContactForm';
import './styles/ContactPageStyle.css';

// Datos del Footer (reutilizados de HomePage)
import LogoSimetrica from '../assets/logo-simetrica-blanco.png';

const ContactPage: React.FC = () => {
  // Configuración de datos para Footer (manteniendo consistencia con HomePage)
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

  // Callbacks para el formulario
  const handleContactSuccess = () => {
    console.log('✅ Formulario enviado exitosamente');
  };

  const handleContactError = (error: Error) => {
    console.error('❌ Error al enviar formulario:', error.message);
  };

  return (
    <>
      {/* Header fijo */}
      <HeaderLayout />
      
      {/* Contenido principal de la página */}
      <main className="contact-page">
        <div className="contact-page__container">
          
          {/* Hero section */}
          <section className="contact-page__hero">
            <div className="container">
              <h1 className="contact-page__title">
                Contáctanos
              </h1>
              <p className="contact-page__subtitle">
                Estamos aquí para ayudarte con tus proyectos de diseño y construcción
              </p>
            </div>
          </section>

          {/* Sección del formulario */}
          <section className="contact-page__form-section">
            <div className="container">
              <div className="contact-page__form-wrapper">
                <div className="contact-page__form-header">
                  <h2 className="contact-page__form-title">
                    Envíanos un mensaje
                  </h2>
                  <p className="contact-page__form-description">
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible
                  </p>
                </div>
                
                {/* Formulario de contacto */}
                <ContactForm 
                  onSuccess={handleContactSuccess}
                  onError={handleContactError}
                  className="contact-page__form"
                  ariaLabel="Formulario de contacto principal"
                />
              </div>
            </div>
          </section>

          {/* Información de contacto adicional */}
          <section className="contact-page__info">
            <div className="container">
              <div className="contact-page__info-grid">
                
                <div className="contact-page__info-item">
                  <h3 className="contact-page__info-title">
                    Oficina Principal
                  </h3>
                  <p className="contact-page__info-text">
                    Calle 123 #45-67<br />
                    Bogotá, Colombia<br />
                    CP 110111
                  </p>
                </div>

                <div className="contact-page__info-item">
                  <h3 className="contact-page__info-title">
                    Teléfono
                  </h3>
                  <p className="contact-page__info-text">
                    <a href="tel:+571234567890" className="contact-page__info-link">
                      +57 1 234 567 890
                    </a>
                  </p>
                </div>

                <div className="contact-page__info-item">
                  <h3 className="contact-page__info-title">
                    Email
                  </h3>
                  <p className="contact-page__info-text">
                    <a href="mailto:info@simetrica.com" className="contact-page__info-link">
                      info@simetrica.com
                    </a>
                  </p>
                </div>

                <div className="contact-page__info-item">
                  <h3 className="contact-page__info-title">
                    Horario de Atención
                  </h3>
                  <p className="contact-page__info-text">
                    Lunes a Viernes<br />
                    8:00 AM - 6:00 PM<br />
                    Hora Colombia
                  </p>
                </div>

              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer reutilizable */}
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

export default ContactPage;