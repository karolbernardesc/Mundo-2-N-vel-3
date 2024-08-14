
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivro } from '../controle/ControleLivros';
import { ControleEditora } from '../controle/ControleEditora';

interface Editora {
    value: number;
    text: string;
}

const LivroDados: React.FC = () => {
    
    const controleLivro = new ControleLivro();
    const controleEditora = new ControleEditora();

    
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<Editora[]>([]);

    
    const navigate = useNavigate();

    
    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    
    const incluir = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro = {
            codigo: 0, 
            titulo: titulo,
            resumo: resumo,
            codEditora: codEditora,
            autores: autores.split('\n') 
        };
        controleLivro.incluir(livro);
        navigate('/');
    };

    
    useEffect(() => {
        const carregarEditoras = async () => {
            const editoras = await controleEditora.getEditoras();
            setOpcoes(editoras.map(ed => ({
                value: ed.codEditora,
                text: ed.nome
            })));
        };

        carregarEditoras();
    }, [controleEditora]);

    return (
        <main className="main-content">
            <h1>Inclusão de Livro</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resumo">Resumo:</label>
                    <textarea
                        id="resumo"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="autores">Autores:</label>
                    <textarea
                        id="autores"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editora">Editora:</label>
                    <select
                        id="editora"
                        value={codEditora}
                        onChange={tratarCombo}
                        className="form-control"
                    >
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Incluir</button>
            </form>
        </main>
    );
};

export default LivroDados;