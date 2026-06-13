function allowCors(response) {
  response.setHeader('access-control-allow-origin', '*');
  response.setHeader('access-control-allow-methods', 'POST, OPTIONS');
  response.setHeader('access-control-allow-headers', 'content-type');
}

export default async function handler(request, response) {
  allowCors(response);

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ success: false, message: 'Use POST.' });
    return;
  }

  const rpId = process.env.WORLD_RP_ID;

  if (!rpId) {
    response.status(500).json({
      success: false,
      message: 'Missing WORLD_RP_ID.',
    });
    return;
  }

  try {
    const verifyResponse = await fetch(`https://developer.worldcoin.org/api/v4/verify/${rpId}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(request.body?.result),
    });
    const payload = await verifyResponse.json();

    response.status(verifyResponse.ok ? 200 : verifyResponse.status).json(payload);
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'World proof verification failed.',
    });
  }
}
