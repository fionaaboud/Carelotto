import { signRequest } from '@worldcoin/idkit/signing';

const defaultAction = process.env.VITE_WORLD_ACTION || 'carelotto_purchase';

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
  const signingKey = process.env.WORLD_RP_SIGNING_KEY;

  if (!rpId || !signingKey) {
    response.status(500).json({
      success: false,
      message: 'Missing WORLD_RP_ID or WORLD_RP_SIGNING_KEY.',
    });
    return;
  }

  try {
    const action = request.body?.action || defaultAction;
    const signature = signRequest({
      action,
      signingKeyHex: signingKey,
    });

    response.status(200).json({
      rp_context: {
        rp_id: rpId,
        nonce: signature.nonce,
        created_at: signature.createdAt,
        expires_at: signature.expiresAt,
        signature: signature.sig,
      },
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'World request signing failed.',
    });
  }
}
