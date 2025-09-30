
// src/components/ProjectsSectionComponents.tsx
import { useState, useEffect } from 'react';
import './styles/ProjectsSectionStyle.css';

const ProjectsSectionComponents = () => {
    // Estado para animaciones de entrada
    const [isVisible, setIsVisible] = useState(false);

    // Observer para animaciones al hacer scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const element = document.querySelector('.projects-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section className={`projects-section ${isVisible ? 'projects-section--visible' : ''}`}>
            <div className="container">
                <div className="projects-section__content">
                    {/* Contenedor del proyecto con mejores prácticas de accesibilidad */}
                    <article className="project-item">
                        <header className="project-item__header">
                            <h2 className="project-item__title">Nuestros proyectos</h2>
                        </header>
                        
                        <div className="project-item__content">
                            <p className="project-item__description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur 
                                euismod tellus sed lacus tincidunt lacinia sed sit amet odio. Etiam 
                                vitae bibendum elit.
                            </p>
                        </div>

                        {/* Call to action para mejor UX */}
                        <footer className="project-item__footer">
                            <button 
                                className="project-item__cta"
                                aria-label="Ver todos nuestros proyectos"
                            >
                                Ver proyectos
                            </button>
                        </footer>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default ProjectsSectionComponents;   