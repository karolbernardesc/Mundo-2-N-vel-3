
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '../../../classes/controle/ControleLivros';

export const controleLivro = new ControleLivro();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).json(controleLivro.obterLivros());
    } else if (req.method === 'POST') {
      const livro = req.body;

      if (livro && livro.titulo && livro.autores) {
        controleLivro.incluir(livro);
        res.status(200).json({ message: 'Livro adicionado com sucesso!' });
      } else {
        res.status(400).json({ message: 'Dados do livro inválidos' });
      }
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}