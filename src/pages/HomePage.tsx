// src/pages/HomePages.tsx
import HeaderLayout from "../layouts/HeaderLayout.tsx";
import "./styles/HomeStyle.css"
import Fondo from "../assets/image-inicio.png"

const Home = () => {
  return (
    <section style={{ backgroundImage: `url(${Fondo})` }}>
      <header>
        <HeaderLayout />
      </header>
    </section>
  );
};

export default Home;