
import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '../../../classes/controle/ControleLivros'; 


export const controleLivro = new ControleLivro();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { codigo } = req.query;

  try {
    if (req.method === 'DELETE') {
      if (typeof codigo === 'string') {
        const sucesso = controleLivro.excluir(parseInt(codigo, 10));
        if (sucesso) {
          res.status(200).json({ message: 'Livro excluído com sucesso!' });
        } else {
          res.status(404).json({ message: 'Livro não encontrado' });
        }
      } else {
        res.status(400).json({ message: 'Código do livro inválido' });
      }
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}