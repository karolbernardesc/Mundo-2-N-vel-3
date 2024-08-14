
import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '../../../classes/controle/ControleEditora';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { codEditora } = req.query;

  try {
    if (typeof codEditora === 'string') {

      const editora = controleEditora.getEditoras().find(e => e.codEditora === parseInt(codEditora, 10));

      if (editora) {
        res.status(200).json(editora);
      } else {
        res.status(404).json({ message: 'Editora não encontrada' });
      }
    } else {
      res.status(400).json({ message: 'Código da editora inválido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}