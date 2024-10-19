import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/products">Productos</Link>
                </li>
                <li>
                    <Link to="/rental">Alquileres</Link>
                </li>
                <li>
                    <Link to="/sales">Ventas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
