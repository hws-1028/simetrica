import { useParams } from 'react-router-dom';
import { useState } from 'react';
import HeaderLayout from "../layouts/HeaderLayout";
import Footer from "../layouts/Footer";
import "./styles/DesignDetailPageStyle.css";
import LogoSimetrica from "../assets/logo-simetrica-blanco.png";
import Design from "../assets/Diseno.png"


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

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

interface CommentFormData {
  author: string;
  text: string;
}

const DesignDetailPage = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(1900);
  const [dislikes, setDislikes] = useState(2);
  const [userInteraction, setUserInteraction] = useState<'like' | 'dislike' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentFormData, setCommentFormData] = useState<CommentFormData>({
    author: '',
    text: ''
  });
  
  const handleLike = () => {
    if (userInteraction === 'like') {
      setLikes(prev => prev - 1);
      setUserInteraction(null);
    } else {
      if (userInteraction === 'dislike') {
        setDislikes(prev => prev - 1);
      }
      setLikes(prev => prev + 1);
      setUserInteraction('like');
    }
  };

  const handleDislike = () => {
    if (userInteraction === 'dislike') {
      setDislikes(prev => prev - 1);
      setUserInteraction(null);
    } else {
      if (userInteraction === 'like') {
        setLikes(prev => prev - 1);
      }
      setDislikes(prev => prev + 1);
      setUserInteraction('dislike');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCommentFormData({ author: '', text: '' });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el comentario
    console.log('Nuevo comentario:', commentFormData);
    handleCloseModal();
  };
  
  // Datos de ejemplo de diseños
  const designs = [
    {
      id: 1,
      image: Design,
      type: "Residencial",
      title: "Casa Moderna",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod tellus sed lacus tincidunt lacinia sed sit amet odio. Etiam vitae bibendum elit.",
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
      year: "2024"
    }
  ];

  // Encontrar el diseño basado en el ID de la URL
  const design = designs.find(d => d.id === Number(id)) || designs[0];

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

  // Diseños similares (ejemplo)
  const similarDesigns = [
    { id: 2, image: Design, title: "Diseño Similar 1" },
    { id: 3, image: Design, title: "Diseño Similar 2" },
    { id: 4, image: Design, title: "Diseño Similar 3" },
    { id: 5, image: Design, title: "Diseño Similar 4" },
    { id: 6, image: Design, title: "Diseño Similar 5" },
    { id: 7, image: Design, title: "Diseño Similar 6" },
  ];

  // Comentarios de ejemplo
  const comments = [
    {
      id: 1,
      author: "Maria V.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod tellus sed lacus tincidunt lacinia sed sit amet odio. Etiam vitae bibendum elit."
    },
    {
      id: 2,
      author: "Carlos A.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod tellus sed lacus tincidunt lacinia sed sit amet odio. Etiam vitae bibendum elit."
    },
    {
      id: 3,
      author: "Mariana S.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod tellus sed lacus tincidunt lacinia sed sit amet odio. Etiam vitae bibendum elit."
    }
  ];

  return (
    <>
      <HeaderLayout />
      <main className="design-detail">
        <button className="back-button" onClick={() => window.history.back()}>
          Volver
        </button>

        <div className="design-detail__content">
          <div className="design-detail__gallery">
            <div className="main-image">
              <img src={design.image} alt={design.title} />
            </div>
            <div className="thumbnail-images">
              <img src={design.image} alt={design.title} />
              <img src={design.image} alt={design.title} />
              <img src={design.image} alt={design.title} />
            </div>
          </div>

          <div className="design-detail__info">
            <div className="design-detail__header">
              <div className="design-detail__title-section">
                <div className="design-detail__title-category">
                  <h1>{design.title}</h1>
                  <span className="design-category">{design.type}</span>
                </div>
                <p className="design-detail__description">{design.description}</p>
              </div>
              <div className="design-detail__stats">
                <button 
                  className={`likes ${userInteraction === 'like' ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <span className="icon">♥</span> {formatNumber(likes)}
                </button>
                <button 
                  className={`dislikes ${userInteraction === 'dislike' ? 'active' : ''}`}
                  onClick={handleDislike}
                >
                  <span className="icon">×</span> {formatNumber(dislikes)}
                </button>
              </div>
            </div>

            <div className="comments-section">
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <h3>{comment.author}</h3>
                  <p>{comment.text}</p>
                </div>
              ))}
              <button className="add-comment-button" onClick={handleOpenModal}>
                Agregar un comentario
              </button>
            </div>

            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Agregar Comentario</h2>
                  <form onSubmit={handleSubmitComment}>
                    <div className="form-group">
                      <label htmlFor="author">Nombre:</label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={commentFormData.author}
                        onChange={handleCommentChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Comentario:</label>
                      <textarea
                        id="text"
                        name="text"
                        value={commentFormData.text}
                        onChange={handleCommentChange}
                        required
                      />
                    </div>
                    <div className="modal-actions">
                      <button type="submit" className="submit-button">
                        Publicar Comentario
                      </button>
                      <button type="button" className="cancel-button" onClick={handleCloseModal}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="similar-designs">
              <h2>Diseños similares</h2>
              <div className="similar-designs__grid">
                {similarDesigns.map((design) => (
                  <div key={design.id} className="similar-design-card">
                    <img src={design.image} alt={design.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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

export default DesignDetailPage;