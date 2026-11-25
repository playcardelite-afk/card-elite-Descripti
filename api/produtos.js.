
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      erro: 'Método não permitido'
    });
  }

  const CHAVE = process.env.FORNECEDOR_API_KEY;

  if (!CHAVE) {
    return res.status(500).json({
      erro: 'Chave da API não configurada na Vercel'
    });
  }

  try {
    const resposta = await fetch(
      'https://fornecedor.site/api/v1/produtos',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CHAVE}`,
          Accept: 'application/json'
        }
      }
    );

    const dados = await resposta.json();

    return res.status(resposta.status).json(dados);

  } catch (erro) {
    return res.status(502).json({
      erro: 'Erro ao conectar com o fornecedor'
    });
  }
}
