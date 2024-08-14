
import React, { useEffect, useState } from 'react';
import { Livro } from '../classes/modelo/Livro';
import Menu from '../components/Menu';
import styles from '../styles/Home.module.css';

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const response = await fetch('/api/livros');
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      }
    };
  
    carregarLivros();
  }, []);

 
  const excluirLivro = (codigo: number) => {
   
    console.log(`Excluir livro com código: ${codigo}`);
  };

  return (
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Catálogo de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Editora</th>
             
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.codigo}>
                <td>{livro.titulo}</td>
                <td>{livro.resumo}</td>
                <td>{livro.autores.join(', ')}</td>
                <td>{livro.codEditora}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => excluirLivro(livro.codigo)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;