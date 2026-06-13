import 'dotenv/config';
import http from 'node:http';
import { signRequest } from '@worldcoin/idkit/signing';

const port = Number(process.env.WORLD_VERIFY_PORT || 8787);
const rpId = process.env.WORLD_RP_ID;
const signingKey = process.env.WORLD_RP_SIGNING_KEY;
const defaultAction = process.env.VITE_WORLD_ACTION || 'carelotto_purchase';

function sendJson(response, status, body) {
  response.writeHead(status, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'content-type': 'application/json',
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function requireWorldConfig(response) {
  if (!rpId || !signingKey) {
    sendJson(response, 500, {
      success: false,
      message: 'Missing WORLD_RP_ID or WORLD_RP_SIGNING_KEY.',
    });
    return false;
  }

  return true;
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { success: false, message: 'Use POST.' });
    return;
  }

  try {
    if (request.url === '/api/world/rp-context') {
      if (!requireWorldConfig(response)) {
        return;
      }

      const body = await readBody(request);
      const action = body.action || defaultAction;
      const signature = signRequest({
        action,
        signingKeyHex: signingKey,
      });

      sendJson(response, 200, {
        rp_context: {
          rp_id: rpId,
          nonce: signature.nonce,
          created_at: signature.createdAt,
          expires_at: signature.expiresAt,
          signature: signature.sig,
        },
      });
      return;
    }

    if (request.url === '/api/world/verify') {
      if (!requireWorldConfig(response)) {
        return;
      }

      const body = await readBody(request);
      const verifyResponse = await fetch(`https://developer.worldcoin.org/api/v4/verify/${rpId}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body.result),
      });
      const payload = await verifyResponse.json();

      sendJson(response, verifyResponse.ok ? 200 : verifyResponse.status, payload);
      return;
    }

    sendJson(response, 404, { success: false, message: 'Unknown route.' });
  } catch (error) {
    sendJson(response, 500, {
      success: false,
      message: error instanceof Error ? error.message : 'World verification server failed.',
    });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`World ID dev verification server listening on http://127.0.0.1:${port}`);
});
