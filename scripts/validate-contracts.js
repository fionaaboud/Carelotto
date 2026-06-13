import fs from 'node:fs';

const contractPath = 'contracts/CareLottoSplit.sol';
const source = fs.readFileSync(contractPath, 'utf8');

const requiredSnippets = [
  'contract CareLottoSplit',
  'function purchaseImage(address socialImpactCause, bytes32 imageId) external payable',
  'uint256 artistShare = msg.value / 3;',
  'uint256 causeShare = msg.value / 3;',
  'uint256 lotteryShare = msg.value - artistShare - causeShare;',
  'totalLotteryPool += lotteryShare;',
  '_sendValue(artistWallet, artistShare);',
  '_sendValue(socialImpactCause, causeShare);',
  'event ImagePurchased(',
  'function withdrawLotteryPrize(address winner, uint256 amount) external onlyOwner',
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));

if (missing.length > 0) {
  console.error(`Contract validation failed for ${contractPath}`);
  for (const snippet of missing) {
    console.error(`Missing: ${snippet}`);
  }
  process.exit(1);
}

console.log('Contract validation passed: CareLottoSplit purchase split is present.');
