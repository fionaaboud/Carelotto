import fs from 'node:fs';

const contractPath = 'contracts/CareLottoSplit.sol';
const source = fs.readFileSync(contractPath, 'utf8');

const requiredSnippets = [
  'contract CareLottoSplit',
  'import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";',
  'import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";',
  'contract CareLottoSplit is VRFConsumerBaseV2Plus',
  'function purchaseImage(address buyerWallet, address socialImpactCause, bytes32 imageId) external payable',
  'if (buyerWallet == address(0)) revert InvalidAddress();',
  'uint256 artistShare = msg.value / 3;',
  'uint256 causeShare = msg.value / 3;',
  'uint256 lotteryShare = msg.value - artistShare - causeShare;',
  'totalLotteryPool += lotteryShare;',
  '_sendValue(artistWallet, artistShare);',
  '_sendValue(socialImpactCause, causeShare);',
  'event ImagePurchased(',
  'uint256 public currentRoundId;',
  'struct LotteryRound',
  'mapping(uint256 => LotteryRound) public lotteryRounds;',
  'event LotteryRoundOpened(uint256 indexed roundId);',
  'event LotteryEntryRecorded(uint256 indexed roundId, address indexed purchaser, uint256 lotteryShare);',
  'event LotteryRoundClosed(uint256 indexed roundId, uint256 entryCount, uint256 pool);',
  'event LotteryWinnerRequested(uint256 indexed roundId, uint256 indexed requestId);',
  'event LotteryWinnerSelected(',
  'function closeCurrentLotteryRound() external onlyOwner',
  'function requestLotteryWinner() external onlyOwner returns (uint256 requestId)',
  's_vrfCoordinator.requestRandomWords(',
  'VRFV2PlusClient.RandomWordsRequest({',
  'function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override',
  'function openNextLotteryRound() external onlyOwner',
  'function claimLotteryPrize(uint256 roundId) external',
  'round.entryCount += 1;',
  'round.pool += lotteryShare;',
  'round.vrfRequestId = requestId;',
  'vrfRequestRoundIds[requestId] = currentRoundId;',
  'uint256 winningEntryIndex = randomWord % round.entryCount;',
  'lotteryRoundEntries[currentRoundId].push(buyerWallet);',
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
