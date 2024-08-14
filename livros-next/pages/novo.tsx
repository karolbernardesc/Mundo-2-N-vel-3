import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import Menu from '../components/Menu';

const controleEditora = new ControleEditora();
const baseURL = "/api/livros";

const incluirLivro = async (livro: Livro): Promise<boolean> => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });
    const result = await response.json();
    console.log(result); 
    return result.message === 'Livro adicionado com sucesso!';
  } catch (error) {
    console.error("Erro ao incluir livro:", error);
    return false;
  }
};

const Novo: React.FC = () => {
  const router = useRouter();
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [opcoes, setOpcoes] = useState<{ value: number, text: string }[]>([]);
  const [mensagem, setMensagem] = useState<string>(''); 

  useEffect(() => {
    const editoras = controleEditora.getEditoras().map(editora => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editoras);
  }, []);

  const tratarCombo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(e.target.value));
  };

  const incluir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titulo || !resumo || !autores || codEditora === 0) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }
    const livro: Livro = {
      codigo: 0, 
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };
    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      setMensagem('Livro adicionado com sucesso!');
      setTimeout(() => {
        router.push('/catalogo');
      }, 1000); 
    } else {
      setMensagem('Falha ao adicionar o livro. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Adicionar Livro</h1>
        {mensagem && <div className={styles.alert}>{mensagem}</div>} {}
        <form onSubmit={incluir}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo</label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores</label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editora">Editora</label>
            <select
              id="editora"
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
      </main>
    </div>
  );
};

export default Novo;