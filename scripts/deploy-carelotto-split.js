import 'dotenv/config';
import { artifacts, network } from 'hardhat';

const DEFAULT_LOCAL_ARTIST = '0x0000000000000000000000000000000000000001';

function encodeAddress(address) {
  return address.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

const artistWallet = process.env.ARTIST_WALLET || DEFAULT_LOCAL_ARTIST;
const { provider, networkName } = await network.create();
const accounts = await provider.request({ method: 'eth_accounts' });
const [deployer] = accounts;

if (!deployer) {
  throw new Error(`No deployer account available for ${networkName}.`);
}

const artifact = await artifacts.readArtifact('CareLottoSplit');
const constructorArgs = encodeAddress(artistWallet);

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
console.log(`Transaction: ${txHash}`);
console.log(`Contract: ${receipt.contractAddress}`);
