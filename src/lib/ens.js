const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const MAINNET_RPC_URL = import.meta.env.VITE_MAINNET_RPC_URL || 'https://cloudflare-eth.com';

const SELECTORS = {
  resolver: '0178b8bf',
  addr: '3b3b57de',
  name: '691f3431',
  text: '59d1d43c',
};

const textRecordKeys = ['avatar', 'description', 'url', 'com.twitter', 'com.github'];

const keccakRounds = 24;
const keccakRotation = [
  [0, 36, 3, 41, 18],
  [1, 44, 10, 45, 2],
  [62, 6, 43, 15, 61],
  [28, 55, 25, 21, 56],
  [27, 20, 39, 8, 14],
];
const keccakConstants = [
  1n,
  32898n,
  9223372036854808714n,
  9223372039002292224n,
  32907n,
  2147483649n,
  9223372039002292353n,
  9223372036854808585n,
  138n,
  136n,
  2147516425n,
  2147483658n,
  2147516555n,
  9223372036854775947n,
  9223372036854808713n,
  9223372036854808579n,
  9223372036854808578n,
  9223372036854775936n,
  32778n,
  9223372039002259466n,
  9223372039002292353n,
  9223372036854808704n,
  2147483649n,
  9223372039002292232n,
];

function rotateLeft(value, shift) {
  const normalized = BigInt(shift);
  return ((value << normalized) | (value >> (64n - normalized))) & 0xffffffffffffffffn;
}

function keccak256(bytes) {
  const rate = 136;
  const state = Array.from({ length: 25 }, () => 0n);
  const padded = [...bytes, 1];

  while (padded.length % rate !== rate - 1) {
    padded.push(0);
  }

  padded.push(128);

  for (let offset = 0; offset < padded.length; offset += rate) {
    for (let index = 0; index < rate / 8; index += 1) {
      let lane = 0n;
      for (let byte = 0; byte < 8; byte += 1) {
        lane |= BigInt(padded[offset + index * 8 + byte]) << BigInt(byte * 8);
      }
      state[index] ^= lane;
    }

    for (let round = 0; round < keccakRounds; round += 1) {
      const c = Array.from({ length: 5 }, (_, x) => state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20]);
      const d = Array.from({ length: 5 }, (_, x) => c[(x + 4) % 5] ^ rotateLeft(c[(x + 1) % 5], 1));

      for (let x = 0; x < 5; x += 1) {
        for (let y = 0; y < 5; y += 1) {
          state[x + 5 * y] ^= d[x];
        }
      }

      const b = Array.from({ length: 25 }, () => 0n);
      for (let x = 0; x < 5; x += 1) {
        for (let y = 0; y < 5; y += 1) {
          b[y + 5 * ((2 * x + 3 * y) % 5)] = rotateLeft(state[x + 5 * y], keccakRotation[x][y]);
        }
      }

      for (let x = 0; x < 5; x += 1) {
        for (let y = 0; y < 5; y += 1) {
          state[x + 5 * y] = b[x + 5 * y] ^ ((~b[((x + 1) % 5) + 5 * y]) & b[((x + 2) % 5) + 5 * y]);
        }
      }

      state[0] ^= keccakConstants[round];
    }
  }

  const output = [];
  for (let index = 0; output.length < 32; index += 1) {
    const lane = state[index];
    for (let byte = 0; byte < 8 && output.length < 32; byte += 1) {
      output.push(Number((lane >> BigInt(byte * 8)) & 0xffn));
    }
  }

  return bytesToHex(output);
}

function bytesToHex(bytes) {
  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex) {
  const clean = hex.replace(/^0x/, '');
  return clean.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? [];
}

function utf8Bytes(value) {
  return Array.from(new TextEncoder().encode(value));
}

function pad64(value) {
  return value.padStart(64, '0');
}

function encodeUint(value) {
  return pad64(BigInt(value).toString(16));
}

function encodeString(value) {
  const encoded = bytesToHex(utf8Bytes(value));
  const paddedLength = Math.ceil(encoded.length / 64) * 64;
  return `${encodeUint(encoded.length / 2)}${encoded.padEnd(paddedLength, '0')}`;
}

function decodeString(hex) {
  if (!hex || hex === '0x') {
    return null;
  }

  const clean = hex.replace(/^0x/, '');
  const offset = Number.parseInt(clean.slice(0, 64), 16) * 2;
  const length = Number.parseInt(clean.slice(offset, offset + 64), 16) * 2;
  const value = clean.slice(offset + 64, offset + 64 + length);

  return new TextDecoder().decode(new Uint8Array(hexToBytes(value)));
}

function decodeAddress(hex) {
  if (!hex || hex === '0x') {
    return null;
  }

  const address = `0x${hex.replace(/^0x/, '').slice(-40)}`;
  return address.toLowerCase() === ZERO_ADDRESS ? null : address;
}

function isAddress(value) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function normalizeAddress(value) {
  return value.toLowerCase();
}

function namehash(name) {
  let node = '00'.repeat(32);
  const labels = name.toLowerCase().split('.').filter(Boolean);

  for (let index = labels.length - 1; index >= 0; index -= 1) {
    const labelHash = keccak256(utf8Bytes(labels[index]));
    node = keccak256(hexToBytes(`${node}${labelHash}`));
  }

  return node;
}

async function rpc(method, params) {
  const response = await fetch(MAINNET_RPC_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });

  if (!response.ok) {
    throw new Error(`ENS RPC failed with ${response.status}`);
  }

  const payload = await response.json();

  if (payload.error) {
    throw new Error(payload.error.message || 'ENS RPC returned an error');
  }

  return payload.result;
}

async function ethCall(to, data) {
  return rpc('eth_call', [{ to, data }, 'latest']);
}

async function getResolver(node) {
  const result = await ethCall(ENS_REGISTRY, `0x${SELECTORS.resolver}${node}`);
  return decodeAddress(result);
}

async function resolveAddress(name) {
  const node = namehash(name);
  const resolver = await getResolver(node);

  if (!resolver) {
    return null;
  }

  return decodeAddress(await ethCall(resolver, `0x${SELECTORS.addr}${node}`));
}

async function resolveName(address) {
  const reverseNode = namehash(`${address.slice(2).toLowerCase()}.addr.reverse`);
  const resolver = await getResolver(reverseNode);

  if (!resolver) {
    return null;
  }

  const name = decodeString(await ethCall(resolver, `0x${SELECTORS.name}${reverseNode}`));

  if (!name) {
    return null;
  }

  const forwardAddress = await resolveAddress(name);

  if (forwardAddress?.toLowerCase() !== address.toLowerCase()) {
    return null;
  }

  return name;
}

async function getTextRecord(name, key) {
  const node = namehash(name);
  const resolver = await getResolver(node);

  if (!resolver) {
    return null;
  }

  const data = `0x${SELECTORS.text}${node}${encodeUint(64)}${encodeString(key)}`;
  return decodeString(await ethCall(resolver, data));
}

function normalizeAvatar(value) {
  if (!value) {
    return null;
  }

  if (value.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${value.replace('ipfs://', '')}`;
  }

  return value;
}

export function shortenAddress(address) {
  if (!isAddress(address)) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export async function lookupEnsIdentity(address) {
  if (!isAddress(address)) {
    return {
      status: 'invalid',
      address,
      displayName: address || 'No wallet connected',
      message: 'Connect a full Ethereum address to resolve ENS.',
      textRecords: {},
    };
  }

  const normalizedAddress = normalizeAddress(address);
  const name = await resolveName(normalizedAddress);

  if (!name) {
    return {
      status: 'fallback',
      address: normalizedAddress,
      displayName: shortenAddress(normalizedAddress),
      message: 'No reverse ENS name found. Showing wallet fallback.',
      textRecords: {},
    };
  }

  const textRecordEntries = await Promise.all(
    textRecordKeys.map(async (key) => {
      try {
        return [key, await getTextRecord(name, key)];
      } catch {
        return [key, null];
      }
    }),
  );
  const textRecords = Object.fromEntries(textRecordEntries.filter(([, value]) => Boolean(value)));

  return {
    status: 'resolved',
    name,
    address: normalizedAddress,
    displayName: name,
    avatar: normalizeAvatar(textRecords.avatar),
    avatarLabel: name.slice(0, 2).toUpperCase(),
    message: `Resolved ${name} from ${shortenAddress(normalizedAddress)}.`,
    textRecords,
  };
}

export async function lookupEnsName(name) {
  const address = await resolveAddress(name);

  if (!address) {
    return null;
  }

  return {
    name,
    address: normalizeAddress(address),
    displayName: name,
  };
}
