export default async function handler(req, res) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const response = await fetch('https://api.promisse.com.br/transactions', {
      method: 'POST',
      headers: {
        'Authorization': process.env.PROMISSE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1790, // R$17,90 em centavos
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao criar pagamento', details: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno', message: error.message });
  }
}
