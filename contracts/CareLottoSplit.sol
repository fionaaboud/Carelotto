// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title CareLottoSplit
/// @notice Splits each image purchase between the artist, a social impact cause, and a lottery pool.
contract CareLottoSplit {
    address public owner;
    address public artistWallet;
    uint256 public totalImagesPurchased;
    uint256 public totalLotteryPool;
    uint256 public currentRoundId;

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
    }

    mapping(address => CauseStats) public causeStats;
    mapping(uint256 => LotteryRound) public lotteryRounds;
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
    event LotteryPrizeWithdrawn(address indexed winner, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    error InvalidAddress();
    error InvalidPayment();
    error TransferFailed();
    error Unauthorized();
    error InsufficientLotteryPool();
    error LotteryRoundClosed();
    error LotteryRoundStillOpen();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor(address initialArtistWallet) {
        if (initialArtistWallet == address(0)) revert InvalidAddress();

        owner = msg.sender;
        artistWallet = initialArtistWallet;
        currentRoundId = 1;
        lotteryRounds[currentRoundId] = LotteryRound({
            id: currentRoundId,
            entryCount: 0,
            pool: 0,
            isOpen: true,
            winnerRequested: false,
            vrfRequestId: 0,
            randomWord: 0,
            winner: address(0)
        });

        emit OwnershipTransferred(address(0), msg.sender);
        emit LotteryRoundOpened(currentRoundId);
    }

    function purchaseImage(address buyerWallet, address socialImpactCause, bytes32 imageId) external payable {
        if (msg.value == 0) revert InvalidPayment();
        if (buyerWallet == address(0)) revert InvalidAddress();
        if (socialImpactCause == address(0)) revert InvalidAddress();
        if (!lotteryRounds[currentRoundId].isOpen) revert LotteryRoundClosed();

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
        if (!round.isOpen) revert LotteryRoundClosed();

        round.isOpen = false;

        emit LotteryRoundClosed(currentRoundId, round.entryCount, round.pool);
    }

    function requestLotteryWinner(uint256 requestId) external onlyOwner {
        LotteryRound storage round = lotteryRounds[currentRoundId];
        if (round.isOpen) revert LotteryRoundStillOpen();

        round.winnerRequested = true;
        round.vrfRequestId = requestId;

        emit LotteryWinnerRequested(currentRoundId, requestId);
    }

    function recordLotteryWinner(uint256 roundId, uint256 randomWord) external onlyOwner {
        LotteryRound storage round = lotteryRounds[roundId];
        if (round.isOpen) revert LotteryRoundStillOpen();
        if (round.entryCount == 0) revert InvalidPayment();

        uint256 winningEntryIndex = randomWord % round.entryCount;
        address winner = lotteryRoundEntries[roundId][winningEntryIndex];

        round.randomWord = randomWord;
        round.winner = winner;

        emit LotteryWinnerSelected(roundId, round.vrfRequestId, winner, winningEntryIndex, randomWord);
    }

    function openNextLotteryRound() external onlyOwner {
        if (lotteryRounds[currentRoundId].isOpen) revert LotteryRoundStillOpen();

        currentRoundId += 1;
        lotteryRounds[currentRoundId] = LotteryRound({
            id: currentRoundId,
            entryCount: 0,
            pool: 0,
            isOpen: true,
            winnerRequested: false,
            vrfRequestId: 0,
            randomWord: 0,
            winner: address(0)
        });

        emit LotteryRoundOpened(currentRoundId);
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

    function withdrawLotteryPrize(address winner, uint256 amount) external onlyOwner {
        if (winner == address(0)) revert InvalidAddress();
        if (amount > totalLotteryPool) revert InsufficientLotteryPool();

        totalLotteryPool -= amount;
        _sendValue(winner, amount);

        emit LotteryPrizeWithdrawn(winner, amount);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) revert InvalidAddress();

        address previousOwner = owner;
        owner = newOwner;

        emit OwnershipTransferred(previousOwner, newOwner);
    }

    function _sendValue(address recipient, uint256 amount) private {
        (bool success, ) = recipient.call{ value: amount }('');
        if (!success) revert TransferFailed();
    }
}
