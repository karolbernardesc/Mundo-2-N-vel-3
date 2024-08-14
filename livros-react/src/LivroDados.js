import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleEditora } from './controle/ControleEditora';
import { ControleLivro } from './controle/ControleLivros';
import './App.css';

const LivroDados = () => {
    const controleEditora = new ControleEditora();
    const controleLivro = new ControleLivro();

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    const [opcoes, setOpcoes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const editoras = controleEditora.getEditoras();
        setOpcoes(editoras.map(ed => ({
            value: ed.codEditora,
            text: ed.nome
        })));
    }, []);

    const incluir = (event) => {
        event.preventDefault();
        const livro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            codEditora: codEditora,
            autores: autores.split('\n'),
        };
        controleLivro.incluir(livro);
        navigate('/');
    };

    return (
        <main className="main-content centralizar-formulario">
            <h1>Dados do Livro</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resumo">Resumo</label>
                    <textarea
                        id="resumo"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editora">Editora:</label>
                    <select
                        id="editora"
                        value={codEditora}
                        onChange={(e) => setCodEditora(Number(e.target.value))}
                        className="form-control"
                    >
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="autores">Autores (1 por linha)</label>
                    <textarea
                        id="autores"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Dados</button>
            </form>
        </main>
    );
};

export default LivroDados;