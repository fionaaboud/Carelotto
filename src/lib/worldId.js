export const worldConfig = {
  appId: import.meta.env.VITE_WORLD_APP_ID,
  action: import.meta.env.VITE_WORLD_ACTION || 'carelotto_purchase',
  rpContextEndpoint: import.meta.env.VITE_WORLD_RP_CONTEXT_ENDPOINT || '/api/world/rp-context',
  verifyEndpoint: import.meta.env.VITE_WORLD_VERIFY_ENDPOINT || '/api/world/verify',
};

export function isWorldConfigured() {
  return Boolean(worldConfig.appId && worldConfig.action);
}

export function getWorldProofSignal({ wallet, roundId }) {
  return `${wallet}:round-${roundId}`;
}

export async function fetchWorldRpContext({ signal }) {
  const response = await fetch(worldConfig.rpContextEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: worldConfig.action,
      signal,
    }),
  });

  if (!response.ok) {
    throw new Error('World ID request signing failed.');
  }

  const payload = await response.json();
  return payload.rp_context;
}

export async function verifyWorldProof({ result, signal }) {
  const response = await fetch(worldConfig.verifyEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      action: worldConfig.action,
      signal,
      result,
    }),
  });

  if (!response.ok) {
    throw new Error('World ID proof verification failed.');
  }

  const payload = await response.json();

  if (payload.success === false) {
    throw new Error(payload.message || 'World ID proof was rejected.');
  }

  return payload;
}

export function getWorldProofId(result) {
  const response = result?.responses?.[0];
  return response?.nullifier || response?.session_nullifier?.join(':') || result?.nonce || 'world-proof';
}
