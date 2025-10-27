import "./styles/DesignPageStyle.css"
import HeaderLayout from "../layouts/HeaderLayout"
import Footer from "../layouts/Footer"

interface Design {
  id: number;
  image: string;
  type: string;
  title: string;
  description: string;
  features: string[];
  location: string;
  area: string;
  year: string;
}
import LogoSimetrica from "../assets/logo-simetrica-blanco.png";
import Design from "../assets/Diseno.png"

const DesignPage = () => {
  const footerColumns = [
    {
      title: "Servicios",
      links: [
        { label: "Proyectos", href: "/proyectos" },
        { label: "Diseños", href: "/diseños" },
        { label: "Construcción", href: "/construccion" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Asociados", href: "/asociados" },
        { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Política de Privacidad", href: "/privacidad" },
        { label: "Términos de Servicio", href: "/terminos" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/simetrica_ia/", external: true },
    { label: "Facebook", href: "https://www.facebook.com/share/17PvCWuUtm/?mibextid=wwXIfr", external: true },
    { label: "TikTok", href: "https://www.tiktok.com/@simetrica7?_t=ZS-90L6hiOnqKe&_r=1", external: true },
    { label: "Pinterest", href: "https://co.pinterest.com/insonorizacion_acustica7/?invite_code=dd12bf69cdd14ac8aecd84e3f084a435&sender=595601256878326965", external: true },
    { label: "WhatsApp", href: "https://wa.me/573103858223", external: true },
  ];
  


  const designs = [
    { 
      id: 1, 
      image: Design, 
      type: "Residencial", 
      title: "Casa Moderna",
      description: "Diseño moderno y minimalista para espacios residenciales contemporáneos.",
      features: ["Espacios abiertos", "Iluminación natural", "Materiales sostenibles"],
      location: "Bogotá",
      area: "250m²",
      year: "2025"
    },
    { 
      id: 2, 
      image: Design, 
      type: "Comercial", 
      title: "Oficina Ejecutiva",
      description: "Espacio corporativo diseñado para maximizar la productividad y el confort.",
      features: ["Salas de reuniones", "Áreas colaborativas", "Tecnología integrada"],
      location: "Medellín",
      area: "400m²",
      year: "2024",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 3, 
      image: Design, 
      type: "Industrial", 
      title: "Planta de Producción",
      description: "Diseño industrial optimizado para eficiencia y seguridad.",
      features: ["Flujo de trabajo optimizado", "Ventilación avanzada", "Áreas especializadas"],
      location: "Cali",
      area: "1200m²",
      year: "2025",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 4, 
      image: Design, 
      type: "Residencial", 
      title: "Apartamento Luxury",
      description: "Diseño de lujo que combina elegancia y funcionalidad.",
      features: ["Acabados premium", "Domótica", "Vistas panorámicas"],
      location: "Bogotá",
      area: "180m²",
      year: "2025",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 5, 
      image: Design, 
      type: "Comercial", 
      title: "Local Comercial",
      description: "Espacio comercial diseñado para maximizar la experiencia del cliente.",
      features: ["Vitrina destacada", "Iluminación estratégica", "Flujo de clientes optimizado"],
      location: "Medellín",
      area: "150m²",
      year: "2024",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 6, 
      image: Design, 
      type: "Industrial", 
      title: "Bodega Logística",
      description: "Centro logístico con diseño eficiente para operaciones de almacenamiento.",
      features: ["Altura optimizada", "Muelles de carga", "Sistema de ventilación"],
      location: "Cali",
      area: "2000m²",
      year: "2025",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 7, 
      image: Design, 
      type: "Residencial", 
      title: "Casa Campestre",
      description: "Diseño que integra la naturaleza con el confort moderno.",
      features: ["Grandes ventanales", "Materiales naturales", "Espacios al aire libre"],
      location: "Medellín",
      area: "450m²",
      year: "2024",
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 8, 
      image: Design, 
      type: "Comercial", 
      title: "Centro Comercial",
      description: "Complejo comercial con diseño moderno y funcional.",
      features: ["Plazoleta de comidas", "Áreas de descanso", "Estacionamiento integrado"],
      location: "Bogotá",
      area: "5000m²",
      year: "2025",
      likes: 0,
      dislikes: 0,
      comments: []
    }
  ]

  return (
    <>
      <HeaderLayout />
      <main className="design-section">
        <div className="design-section__content">
          <h1>Diseño de Interiores</h1>
          <p>Transformamos tus espacios en lugares únicos y funcionales.</p>

          <div className="design-section__filters">
            <input 
                type="text" 
                placeholder="Buscar diseños..."
                className="filter-input"
              />
              <select className="filter-select">
                <option value="">Categorías</option>
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="industrial">Industrial</option>
              </select>
              <select className="filter-select">
                <option value="">Región</option>
                <option value="bogota">Bogotá</option>
                <option value="medellin">Medellín</option>
                <option value="cali">Cali</option>
                <option value="otras">Otras regiones</option>
              </select>
          </div>

          <section className="design-gallery">
            {designs.map((proj) => (
              <div className="design-card" key={proj.id}>
                <img
                  src={proj.image}
                  alt={`${proj.title}`}
                  className="design-card__img"
                />
                <div className="design-card__overlay">
                  <div className="design-card__content">
                    <span className="design-card__type">{proj.type}</span>
                    <a 
                      href={`/diseno/${proj.id}`}
                      className="design-card__button"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

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

export default DesignPage;