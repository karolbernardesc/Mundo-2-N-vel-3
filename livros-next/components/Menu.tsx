import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand text-light">Loja Next</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/catalogo" className="nav-link text-light">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link href="/novo" className="nav-link text-light">Novo</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;