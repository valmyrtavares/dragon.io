import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Vitrine</Link>
          </li>
          <li>
            <Link to="/form">Formulário</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
