
import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '../../../classes/controle/ControleEditora';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.status(200).json(controleEditora.getEditoras());
    } else if (req.method === 'POST') {
      const editora = req.body;
      controleEditora.getEditoras().push(editora); 
      res.status(201).json({ message: 'Editora adicionada com sucesso!' });
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}