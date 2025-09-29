// src/layouts/HeaderLayout.tsx
import Logo from '../assets/logo-simetrica.png';
import { Link } from 'react-router-dom';
import "./styles/HeaderStyle.css"

const HeaderLayout = () => {
    return (
        <>
          <div className='logo-container'>
            <img src={Logo} alt="Logo Simetrica" />
            <h1>SIMÉTRICA</h1>
          </div>

          <nav className='nav-container'>
            <Link to="/">Inicio</Link>
            <Link to="/asociados">Asociados</Link>
            <Link to="/proyectos">Proyectos</Link>
            <Link to="/diseños">Diseños</Link>
            <Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link>
            <Link className='link' to="/contacto">Contacto</Link>
          </nav>
        </>
    )
}

export default HeaderLayout;