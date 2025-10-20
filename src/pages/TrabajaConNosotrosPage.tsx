import React, { useState } from 'react';
import HeaderLayout from '../layouts/HeaderLayout';
import Footer from '../layouts/Footer/Footer';
import './styles/TrabajaConNosotrosPageStyle.css';

// Datos del Footer
import LogoSimetrica from '../assets/logo-simetrica-blanco.png';

const TrabajaConNosotrosPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos personales
    nombreCompleto: '',
    numeroIdentificacion: '',
    numeroContacto: '',
    fechaNacimiento: '',
    correoElectronico: '',
    ciudadDepartamento: '',
    
    // Información laboral
    especialidades: [] as string[],
    otroEspecialidad: '',
    anosExperiencia: '',
    tieneCertificaciones: '',
    disponibilidad: '',
    
    // Proyectos realizados
    cantidadProyectos: '',
    descripcionExperiencia: '',
    fotosProyectos: [] as File[],
    referencias: [{ nombre: '', telefono: '' }],
    observaciones: ''
  });

  // Configuración de datos para Footer
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (especialidad: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(especialidad)
        ? prev.especialidades.filter(e => e !== especialidad)
        : [...prev.especialidades, especialidad]
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, fotosProyectos: Array.from(e.target.files || []) }));
    }
  };

  const addReferencia = () => {
    setFormData(prev => ({
      ...prev,
      referencias: [...prev.referencias, { nombre: '', telefono: '' }]
    }));
  };

  const updateReferencia = (index: number, field: 'nombre' | 'telefono', value: string) => {
    setFormData(prev => ({
      ...prev,
      referencias: prev.referencias.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const handleContinuar = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnterior = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnviar = () => {
    // Aquí se enviará a la API de Express/MongoDB
    console.log('Datos del formulario:', formData);
    alert('Formulario enviado (pendiente integración con backend)');
  };

  return (
    <>
      <HeaderLayout />
      
      <main className="trabajo-page">
        <div className="trabajo-page__container">
          
          {/* Hero section */}
          <div className="trabajo-page__hero">
            <h1 className="trabajo-page__title">Comienza a trabajar con nosotros</h1>
          </div>

          {/* Progress steps */}
          <div className="trabajo-page__steps">
            <div className={`trabajo-page__step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="trabajo-page__step-circle">Datos personales</div>
            </div>
            <div className="trabajo-page__step-line"></div>
            <div className={`trabajo-page__step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="trabajo-page__step-circle">Información laboral</div>
            </div>
            <div className="trabajo-page__step-line"></div>
            <div className={`trabajo-page__step ${currentStep === 3 ? 'active' : ''}`}>
              <div className="trabajo-page__step-circle">Proyectos realizados</div>
            </div>
          </div>

          {/* Formulario */}
          <div className="trabajo-page__form-container">
            
            {/* Paso 1: Datos personales */}
            {currentStep === 1 && (
              <div className="trabajo-page__form-step">
                <div className="trabajo-page__field">
                  <input
                    type="text"
                    name="nombreCompleto"
                    placeholder="Nombre completo"
                    value={formData.nombreCompleto}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field">
                  <input
                    type="text"
                    name="numeroIdentificacion"
                    placeholder="Número de identificación"
                    value={formData.numeroIdentificacion}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field">
                  <input
                    type="tel"
                    name="numeroContacto"
                    placeholder="Número de contacto"
                    value={formData.numeroContacto}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field">
                  <input
                    type="text"
                    name="fechaNacimiento"
                    placeholder="Fecha de nacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field">
                  <input
                    type="email"
                    name="correoElectronico"
                    placeholder="Correo electrónico"
                    value={formData.correoElectronico}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field">
                  <input
                    type="text"
                    name="ciudadDepartamento"
                    placeholder="Ciudad y departamento de residencia"
                    value={formData.ciudadDepartamento}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__actions">
                  <button onClick={handleContinuar} className="trabajo-page__btn">
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Paso 2: Información laboral */}
            {currentStep === 2 && (
              <div className="trabajo-page__form-step">
                <div className="trabajo-page__field-full">
                  <label className="trabajo-page__label">Especialidad</label>
                  <div className="trabajo-page__checkboxes">
                    {[
                      'Constructor de obra negra (Construcción y reparación de estructuras con ladrillos, cemento y otros materiales)',
                      'Constructor de obra blanca (Terminaciones como instalación de pisos, enchapes, cielo raso, y acabados finales)',
                      'Carpintería (Fabricación e instalación de estructuras de madera como puertas, ventanas ,muebles, closets entre otros)',
                      'Electricidad (Instalaciones y mantenimiento de sistemas eléctricos)',
                      'Plomería (Instalación y reparación de tuberías y sistemas de agua)',
                      'Estructuras metálicas (Fabricación e instalación de estructuras en acero y otros metales)'
                    ].map((esp, index) => (
                      <label key={index} className="trabajo-page__checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.especialidades.includes(esp)}
                          onChange={() => handleCheckboxChange(esp)}
                          className="trabajo-page__checkbox"
                        />
                        <span>{esp}</span>
                      </label>
                    ))}
                    <label className="trabajo-page__checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.especialidades.includes('Otro')}
                        onChange={() => handleCheckboxChange('Otro')}
                        className="trabajo-page__checkbox"
                      />
                      <span>Otro:</span>
                    </label>
                    {formData.especialidades.includes('Otro') && (
                      <input
                        type="text"
                        name="otroEspecialidad"
                        value={formData.otroEspecialidad}
                        onChange={handleInputChange}
                        className="trabajo-page__input trabajo-page__input--inline"
                      />
                    )}
                  </div>
                </div>

                <div className="trabajo-page__field-full">
                  <label className="trabajo-page__label">Años de experiencia</label>
                  <div className="trabajo-page__radios">
                    {['Menos de un año', '1 a 3 años', '3 a 5 años', '5 a 10 años', 'Más de 10 años'].map((option) => (
                      <label key={option} className="trabajo-page__radio-label">
                        <input
                          type="radio"
                          name="anosExperiencia"
                          value={option}
                          checked={formData.anosExperiencia === option}
                          onChange={() => handleRadioChange('anosExperiencia', option)}
                          className="trabajo-page__radio"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="trabajo-page__field-full">
                  <label className="trabajo-page__label">¿Cuenta con certificaciones o estudios en el área de construcción?</label>
                  <div className="trabajo-page__radios">
                    {['Sí', 'No'].map((option) => (
                      <label key={option} className="trabajo-page__radio-label">
                        <input
                          type="radio"
                          name="tieneCertificaciones"
                          value={option}
                          checked={formData.tieneCertificaciones === option}
                          onChange={() => handleRadioChange('tieneCertificaciones', option)}
                          className="trabajo-page__radio"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="trabajo-page__field-full">
                  <label className="trabajo-page__label">Disponibilidad de Trabajo</label>
                  <div className="trabajo-page__radios">
                    {['Tiempo completo', 'Medio tiempo', 'Solo fines de semana', 'Por contrato específico'].map((option) => (
                      <label key={option} className="trabajo-page__radio-label">
                        <input
                          type="radio"
                          name="disponibilidad"
                          value={option}
                          checked={formData.disponibilidad === option}
                          onChange={() => handleRadioChange('disponibilidad', option)}
                          className="trabajo-page__radio"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="trabajo-page__actions">
                  <button onClick={handleAnterior} className="trabajo-page__btn trabajo-page__btn--secondary">
                    Anterior
                  </button>
                  <button onClick={handleContinuar} className="trabajo-page__btn">
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Paso 3: Proyectos realizados */}
            {currentStep === 3 && (
              <div className="trabajo-page__form-step">
                <div className="trabajo-page__field">
                  <input
                    type="text"
                    name="cantidadProyectos"
                    placeholder="Cantidad de proyectos en los que ha trabajado"
                    value={formData.cantidadProyectos}
                    onChange={handleInputChange}
                    className="trabajo-page__input"
                  />
                </div>

                <div className="trabajo-page__field-full">
                  <textarea
                    name="descripcionExperiencia"
                    placeholder="Describa su experiencia en construcción"
                    value={formData.descripcionExperiencia}
                    onChange={handleInputChange}
                    className="trabajo-page__textarea"
                    rows={5}
                  />
                  <span className="trabajo-page__char-count">{formData.descripcionExperiencia.length}/200</span>
                </div>

                <div className="trabajo-page__field-full">
                  <label className="trabajo-page__upload-label">
                    <span className="trabajo-page__upload-text">Suba fotos de sus proyectos realizados</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="trabajo-page__file-input"
                    />
                    <div className="trabajo-page__upload-icon">📤</div>
                  </label>
                  {formData.fotosProyectos.length > 0 && (
                    <p className="trabajo-page__file-count">{formData.fotosProyectos.length} archivo(s) seleccionado(s)</p>
                  )}
                </div>

                <div className="trabajo-page__field-full">
                  <div className="trabajo-page__referencias-header">
                    <label className="trabajo-page__label">Referencias laborales</label>
                    <button onClick={addReferencia} className="trabajo-page__add-btn">+</button>
                  </div>
                  {formData.referencias.map((ref, index) => (
                    <div key={index} className="trabajo-page__referencia">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={ref.nombre}
                        onChange={(e) => updateReferencia(index, 'nombre', e.target.value)}
                        className="trabajo-page__input trabajo-page__input--half"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={ref.telefono}
                        onChange={(e) => updateReferencia(index, 'telefono', e.target.value)}
                        className="trabajo-page__input trabajo-page__input--half"
                      />
                    </div>
                  ))}
                </div>

                <div className="trabajo-page__field-full">
                  <textarea
                    name="observaciones"
                    placeholder="¿Tiene alguna observación adicional o comentario que desee agregar?"
                    value={formData.observaciones}
                    onChange={handleInputChange}
                    className="trabajo-page__textarea"
                    rows={4}
                  />
                  <span className="trabajo-page__char-count">{formData.observaciones.length}/200</span>
                </div>

                <div className="trabajo-page__actions">
                  <button onClick={handleAnterior} className="trabajo-page__btn trabajo-page__btn--secondary">
                    Anterior
                  </button>
                  <button onClick={handleEnviar} className="trabajo-page__btn">
                    Enviar
                  </button>
                </div>
              </div>
            )}

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

export default TrabajaConNosotrosPage;
