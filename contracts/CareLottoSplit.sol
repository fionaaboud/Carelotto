// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/// @title CareLottoSplit
/// @notice Splits each image purchase between the artist, a social impact cause, and a Chainlink VRF lottery pool.
contract CareLottoSplit is VRFConsumerBaseV2Plus {
    address public artistWallet;
    uint256 public totalImagesPurchased;
    uint256 public totalLotteryPool;
    uint256 public currentRoundId;
    uint256 public vrfSubscriptionId;
    bytes32 public vrfKeyHash;
    uint32 public vrfCallbackGasLimit;
    bool public vrfNativePayment;

    uint16 public constant VRF_REQUEST_CONFIRMATIONS = 3;
    uint32 public constant VRF_NUM_WORDS = 1;

    struct CauseStats {
        uint256 totalReceived;
        uint256 purchaseCount;
        bool exists;
    }

    struct LotteryRound {
        uint256 id;
        uint256 entryCount;
        uint256 pool;
        bool isOpen;
        bool winnerRequested;
        uint256 vrfRequestId;
        uint256 randomWord;
        address winner;
        bool prizeClaimed;
    }

    mapping(address => CauseStats) public causeStats;
    mapping(uint256 => LotteryRound) public lotteryRounds;
    mapping(uint256 => uint256) public vrfRequestRoundIds;
    mapping(uint256 => address[]) private lotteryRoundEntries;

    event ImagePurchased(
        address indexed purchaser,
        bytes32 indexed imageId,
        address indexed socialImpactCause,
        uint256 totalPaid,
        uint256 artistShare,
        uint256 causeShare,
        uint256 lotteryShare
    );

    event ArtistWalletUpdated(address indexed previousWallet, address indexed newWallet);
    event LotteryRoundOpened(uint256 indexed roundId);
    event LotteryEntryRecorded(uint256 indexed roundId, address indexed purchaser, uint256 lotteryShare);
    event LotteryRoundClosed(uint256 indexed roundId, uint256 entryCount, uint256 pool);
    event LotteryWinnerRequested(uint256 indexed roundId, uint256 indexed requestId);
    event LotteryWinnerSelected(
        uint256 indexed roundId,
        uint256 indexed requestId,
        address indexed winner,
        uint256 winningEntryIndex,
        uint256 randomWord
    );
    event LotteryPrizeWithdrawn(uint256 indexed roundId, address indexed winner, uint256 amount);
    event VrfConfigUpdated(
        uint256 subscriptionId,
        bytes32 keyHash,
        uint32 callbackGasLimit,
        bool nativePayment
    );

    error InvalidAddress();
    error InvalidPayment();
    error TransferFailed();
    error Unauthorized();
    error InsufficientLotteryPool();
    error LotteryRoundAlreadyClosed();
    error LotteryRoundStillOpen();
    error EmptyLotteryRound();
    error WinnerAlreadyRequested();
    error WinnerAlreadySelected();
    error WinnerNotSelected();
    error PrizeAlreadyClaimed();
    error UnknownVrfRequest();

    constructor(
        address initialArtistWallet,
        uint256 initialVrfSubscriptionId,
        address initialVrfCoordinator,
        bytes32 initialVrfKeyHash,
        uint32 initialVrfCallbackGasLimit,
        bool initialVrfNativePayment
    ) VRFConsumerBaseV2Plus(initialVrfCoordinator) {
        if (initialArtistWallet == address(0)) revert InvalidAddress();
        if (initialVrfCoordinator == address(0)) revert InvalidAddress();
        if (initialVrfKeyHash == bytes32(0)) revert InvalidPayment();
        if (initialVrfCallbackGasLimit == 0) revert InvalidPayment();

        artistWallet = initialArtistWallet;
        vrfSubscriptionId = initialVrfSubscriptionId;
        vrfKeyHash = initialVrfKeyHash;
        vrfCallbackGasLimit = initialVrfCallbackGasLimit;
        vrfNativePayment = initialVrfNativePayment;
        currentRoundId = 1;
        lotteryRounds[currentRoundId] = LotteryRound({
            id: currentRoundId,
            entryCount: 0,
            pool: 0,
            isOpen: true,
            winnerRequested: false,
            vrfRequestId: 0,
            randomWord: 0,
            winner: address(0),
            prizeClaimed: false
        });

        emit LotteryRoundOpened(currentRoundId);
        emit VrfConfigUpdated(
            initialVrfSubscriptionId,
            initialVrfKeyHash,
            initialVrfCallbackGasLimit,
            initialVrfNativePayment
        );
    }

    function purchaseImage(address buyerWallet, address socialImpactCause, bytes32 imageId) external payable {
        if (msg.value == 0) revert InvalidPayment();
        if (buyerWallet == address(0)) revert InvalidAddress();
        if (socialImpactCause == address(0)) revert InvalidAddress();
        if (!lotteryRounds[currentRoundId].isOpen) revert LotteryRoundAlreadyClosed();

        uint256 artistShare = msg.value / 3;
        uint256 causeShare = msg.value / 3;
        uint256 lotteryShare = msg.value - artistShare - causeShare;
        LotteryRound storage round = lotteryRounds[currentRoundId];

        totalImagesPurchased += 1;
        totalLotteryPool += lotteryShare;
        round.entryCount += 1;
        round.pool += lotteryShare;
        lotteryRoundEntries[currentRoundId].push(buyerWallet);

        CauseStats storage stats = causeStats[socialImpactCause];
        stats.totalReceived += causeShare;
        stats.purchaseCount += 1;
        stats.exists = true;

        _sendValue(artistWallet, artistShare);
        _sendValue(socialImpactCause, causeShare);

        emit ImagePurchased(
            buyerWallet,
            imageId,
            socialImpactCause,
            msg.value,
            artistShare,
            causeShare,
            lotteryShare
        );
        emit LotteryEntryRecorded(currentRoundId, buyerWallet, lotteryShare);
    }

    function closeCurrentLotteryRound() external onlyOwner {
        LotteryRound storage round = lotteryRounds[currentRoundId];
        if (!round.isOpen) revert LotteryRoundAlreadyClosed();

        round.isOpen = false;

        emit LotteryRoundClosed(currentRoundId, round.entryCount, round.pool);
    }

    function requestLotteryWinner() external onlyOwner returns (uint256 requestId) {
        LotteryRound storage round = lotteryRounds[currentRoundId];
        if (round.isOpen) revert LotteryRoundStillOpen();
        if (round.entryCount == 0) revert EmptyLotteryRound();
        if (round.winnerRequested) revert WinnerAlreadyRequested();

        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: vrfKeyHash,
                subId: vrfSubscriptionId,
                requestConfirmations: VRF_REQUEST_CONFIRMATIONS,
                callbackGasLimit: vrfCallbackGasLimit,
                numWords: VRF_NUM_WORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: vrfNativePayment})
                )
            })
        );

        round.winnerRequested = true;
        round.vrfRequestId = requestId;
        vrfRequestRoundIds[requestId] = currentRoundId;

        emit LotteryWinnerRequested(currentRoundId, requestId);
    }

    function openNextLotteryRound() external onlyOwner {
        LotteryRound storage round = lotteryRounds[currentRoundId];
        if (round.isOpen) revert LotteryRoundStillOpen();
        if (round.entryCount > 0 && round.winner == address(0)) revert WinnerNotSelected();

        currentRoundId += 1;
        lotteryRounds[currentRoundId] = LotteryRound({
            id: currentRoundId,
            entryCount: 0,
            pool: 0,
            isOpen: true,
            winnerRequested: false,
            vrfRequestId: 0,
            randomWord: 0,
            winner: address(0),
            prizeClaimed: false
        });

        emit LotteryRoundOpened(currentRoundId);
    }

    function claimLotteryPrize(uint256 roundId) external {
        LotteryRound storage round = lotteryRounds[roundId];
        if (round.winner == address(0)) revert WinnerNotSelected();
        if (msg.sender != round.winner) revert Unauthorized();
        if (round.prizeClaimed) revert PrizeAlreadyClaimed();
        if (round.pool == 0) revert InsufficientLotteryPool();

        uint256 amount = round.pool;
        round.prizeClaimed = true;
        round.pool = 0;
        totalLotteryPool -= amount;

        _sendValue(msg.sender, amount);

        emit LotteryPrizeWithdrawn(roundId, msg.sender, amount);
    }

    function getLotteryRoundEntry(uint256 roundId, uint256 index) external view returns (address) {
        return lotteryRoundEntries[roundId][index];
    }

    function getLotteryRoundEntryCount(uint256 roundId) external view returns (uint256) {
        return lotteryRoundEntries[roundId].length;
    }

    function setArtistWallet(address newArtistWallet) external onlyOwner {
        if (newArtistWallet == address(0)) revert InvalidAddress();

        address previousWallet = artistWallet;
        artistWallet = newArtistWallet;

        emit ArtistWalletUpdated(previousWallet, newArtistWallet);
    }

    function setVrfConfig(
        uint256 newSubscriptionId,
        bytes32 newKeyHash,
        uint32 newCallbackGasLimit,
        bool newNativePayment
    ) external onlyOwner {
        if (newKeyHash == bytes32(0)) revert InvalidPayment();
        if (newCallbackGasLimit == 0) revert InvalidPayment();

        vrfSubscriptionId = newSubscriptionId;
        vrfKeyHash = newKeyHash;
        vrfCallbackGasLimit = newCallbackGasLimit;
        vrfNativePayment = newNativePayment;

        emit VrfConfigUpdated(newSubscriptionId, newKeyHash, newCallbackGasLimit, newNativePayment);
    }

    function withdrawLotteryPrize(address winner, uint256 amount) external onlyOwner {
        if (winner == address(0)) revert InvalidAddress();
        if (amount > totalLotteryPool) revert InsufficientLotteryPool();

        totalLotteryPool -= amount;
        _sendValue(winner, amount);

        emit LotteryPrizeWithdrawn(0, winner, amount);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        uint256 roundId = vrfRequestRoundIds[requestId];
        if (roundId == 0) revert UnknownVrfRequest();

        _recordLotteryWinner(roundId, requestId, randomWords[0]);
    }

    function _recordLotteryWinner(uint256 roundId, uint256 requestId, uint256 randomWord) private {
        LotteryRound storage round = lotteryRounds[roundId];
        if (round.isOpen) revert LotteryRoundStillOpen();
        if (round.entryCount == 0) revert EmptyLotteryRound();
        if (round.winner != address(0)) revert WinnerAlreadySelected();

        uint256 winningEntryIndex = randomWord % round.entryCount;
        address winner = lotteryRoundEntries[roundId][winningEntryIndex];

        round.randomWord = randomWord;
        round.winner = winner;

        emit LotteryWinnerSelected(roundId, requestId, winner, winningEntryIndex, randomWord);
    }

    function _sendValue(address recipient, uint256 amount) private {
        (bool success, ) = recipient.call{value: amount}('');
        if (!success) revert TransferFailed();
    }
}
