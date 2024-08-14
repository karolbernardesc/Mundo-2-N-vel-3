import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import './App.css';
import { ControleLivro } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dados">Novo</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <NavBar /> {}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<LivroLista />} />
                    <Route path="/dados" element={<LivroDados />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;