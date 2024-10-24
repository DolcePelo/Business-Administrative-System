import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Inicio</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/products" className="navbar-link">Productos</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/rental" className="navbar-link">Alquileres</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/sales" className="navbar-link">Ventas</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
