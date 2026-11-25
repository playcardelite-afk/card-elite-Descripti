export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const CHAVE = process.env.FORNECEDOR_API_KEY?.trim();

  if (!CHAVE) {
    return res.status(500).json({
      erro: "A variável FORNECEDOR_API_KEY não chegou a esta função. Confira se está no projeto cardelitefinal, em Production, e publique um novo deploy."
    });
  }

  try {
    const resposta = await fetch("https://fornecedor.site/api/v1/produtos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CHAVE}`,
        Accept: "application/json"
      }
    });

    const texto = await resposta.text();

    let dados;
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = { resposta: texto };
    }

    return res.status(resposta.status).json(dados);
  } catch {
    return res.status(502).json({
      erro: "Não foi possível conectar ao fornecedor."
    });
  }
}