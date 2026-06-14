import 'dotenv/config';

const args = new Set(process.argv.slice(2));
const requirePrivy = args.has('--require-privy');

const checks = [
  {
    name: 'Privy App ID',
    key: 'VITE_PRIVY_APP_ID',
    required: requirePrivy,
    help: 'Required for the real Privy email-code and embedded-wallet checkout flow.',
  },
  {
    name: 'Privy Client ID',
    key: 'VITE_PRIVY_CLIENT_ID',
    required: false,
    help: 'Optional. Use it when the Privy dashboard gives this app a dedicated client ID.',
  },
  {
    name: 'World App ID',
    key: 'VITE_WORLD_APP_ID',
    required: false,
    help: 'Required for real World ID verification.',
  },
  {
    name: 'World RP ID',
    key: 'WORLD_RP_ID',
    required: false,
    help: 'Required by the local World ID verifier server.',
  },
  {
    name: 'World signing key',
    key: 'WORLD_RP_SIGNING_KEY',
    required: false,
    help: 'Required by the local World ID verifier server. Keep this server-side only.',
  },
  {
    name: 'CareLotto contract',
    key: 'VITE_CARELOTTO_CONTRACT_ADDRESS',
    required: false,
    help: 'Required for real Chainlink VRF requests from the admin dashboard.',
  },
  {
    name: 'Supabase URL',
    key: 'VITE_SUPABASE_URL',
    required: false,
    help: 'Required for shared purchase totals.',
  },
  {
    name: 'Supabase anon key',
    key: 'VITE_SUPABASE_ANON_KEY',
    required: false,
    help: 'Required for shared purchase totals.',
  },
];

const missingRequired = [];

for (const check of checks) {
  const value = process.env[check.key]?.trim();

  if (value) {
    console.log(`ok   ${check.key} (${check.name})`);
    continue;
  }

  const level = check.required ? 'miss' : 'skip';
  console.log(`${level} ${check.key} (${check.name}) - ${check.help}`);

  if (check.required) {
    missingRequired.push(check.key);
  }
}

if (missingRequired.length > 0) {
  console.error(`\nMissing required environment values: ${missingRequired.join(', ')}`);
  process.exit(1);
}

if (!process.env.VITE_PRIVY_APP_ID?.trim()) {
  console.log('\nPrivy is not enabled. Checkout will show and use the local demo wallet fallback.');
} else {
  console.log('\nPrivy is enabled. Restart the dev server after changing .env values.');
}
