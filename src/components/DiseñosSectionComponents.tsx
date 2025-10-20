import Diseno from "../assets/Diseños.png"
import "./styles/DisenosSectionStyles.css"

const DisenosSection = () => {
    const designs = [
        { title: "Diseño minimalista", image: Diseno },
        { title: "Interior moderno", image: Diseno },
        { title: "Diseño modernos", image: Diseno },
        { title: "Diseño futurista", image: Diseno },
    ] 

    return (
        <section className="designs-section">
            <div className="container">
                <h2 className="designs-section__title">Nuestros diseños</h2>
                <div className="designs-section__grid">
                    {designs.map((item, index) => (
                        <div key={index} className="designs-section__card">
                            <div
                                className="designs-section__image"
                                style={{ backgroundImage: `url(${item.image})` }}>
                            </div>
                            <div className="designs-section__overlay">
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DisenosSection;