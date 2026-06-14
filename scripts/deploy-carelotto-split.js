import 'dotenv/config';
import { artifacts, network } from 'hardhat';

const DEFAULT_LOCAL_ARTIST = '0x0000000000000000000000000000000000000001';
const DEFAULT_LOCAL_COORDINATOR = '0x0000000000000000000000000000000000000002';
const SEPOLIA_COORDINATOR = '0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B';
const SEPOLIA_KEY_HASH = '0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae';

function encodeAddress(address) {
  return address.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

function encodeUint(value) {
  return BigInt(value || 0)
    .toString(16)
    .padStart(64, '0');
}

function encodeBytes32(value) {
  return value.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

function encodeBool(value) {
  return value === true || value === 'true' ? '1'.padStart(64, '0') : ''.padStart(64, '0');
}

const artistWallet = process.env.ARTIST_WALLET || DEFAULT_LOCAL_ARTIST;
const { provider, networkName } = await network.create();
const vrfSubscriptionId = process.env.CHAINLINK_VRF_SUBSCRIPTION_ID || '0';
const vrfCoordinator =
  process.env.CHAINLINK_VRF_COORDINATOR || (networkName === 'sepolia' ? SEPOLIA_COORDINATOR : DEFAULT_LOCAL_COORDINATOR);
const vrfKeyHash = process.env.CHAINLINK_VRF_KEY_HASH || SEPOLIA_KEY_HASH;
const vrfCallbackGasLimit = process.env.CHAINLINK_VRF_CALLBACK_GAS_LIMIT || '200000';
const vrfNativePayment = process.env.CHAINLINK_VRF_NATIVE_PAYMENT || 'false';
const accounts = await provider.request({ method: 'eth_accounts' });
const [deployer] = accounts;

if (!deployer) {
  throw new Error(`No deployer account available for ${networkName}.`);
}

if (networkName === 'sepolia' && BigInt(vrfSubscriptionId) === 0n) {
  throw new Error('CHAINLINK_VRF_SUBSCRIPTION_ID must be set before deploying to Sepolia.');
}

const artifact = await artifacts.readArtifact('CareLottoSplit');
const constructorArgs = [
  encodeAddress(artistWallet),
  encodeUint(vrfSubscriptionId),
  encodeAddress(vrfCoordinator),
  encodeBytes32(vrfKeyHash),
  encodeUint(vrfCallbackGasLimit),
  encodeBool(vrfNativePayment),
].join('');

const txHash = await provider.request({
  method: 'eth_sendTransaction',
  params: [
    {
      from: deployer,
      data: `${artifact.bytecode}${constructorArgs}`,
    },
  ],
});

let receipt = null;

while (receipt === null) {
  receipt = await provider.request({
    method: 'eth_getTransactionReceipt',
    params: [txHash],
  });
}

console.log(`CareLottoSplit deployed on ${networkName}`);
console.log(`Artist wallet: ${artistWallet}`);
console.log(`VRF subscription: ${vrfSubscriptionId}`);
console.log(`VRF coordinator: ${vrfCoordinator}`);
console.log(`VRF key hash: ${vrfKeyHash}`);
console.log(`VRF callback gas: ${vrfCallbackGasLimit}`);
console.log(`VRF native payment: ${vrfNativePayment}`);
console.log(`Transaction: ${txHash}`);
console.log(`Contract: ${receipt.contractAddress}`);
