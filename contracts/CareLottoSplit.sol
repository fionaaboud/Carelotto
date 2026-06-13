// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title CareLottoSplit
/// @notice Splits each image purchase between the artist, a social impact cause, and a lottery pool.
contract CareLottoSplit {
    address public owner;
    address public artistWallet;
    uint256 public totalImagesPurchased;
    uint256 public totalLotteryPool;

    struct CauseStats {
        uint256 totalReceived;
        uint256 purchaseCount;
        bool exists;
    }

    mapping(address => CauseStats) public causeStats;

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
    event LotteryPrizeWithdrawn(address indexed winner, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    error InvalidAddress();
    error InvalidPayment();
    error TransferFailed();
    error Unauthorized();
    error InsufficientLotteryPool();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor(address initialArtistWallet) {
        if (initialArtistWallet == address(0)) revert InvalidAddress();

        owner = msg.sender;
        artistWallet = initialArtistWallet;

        emit OwnershipTransferred(address(0), msg.sender);
    }

    function purchaseImage(address socialImpactCause, bytes32 imageId) external payable {
        if (msg.value == 0) revert InvalidPayment();
        if (socialImpactCause == address(0)) revert InvalidAddress();

        uint256 artistShare = msg.value / 3;
        uint256 causeShare = msg.value / 3;
        uint256 lotteryShare = msg.value - artistShare - causeShare;

        totalImagesPurchased += 1;
        totalLotteryPool += lotteryShare;

        CauseStats storage stats = causeStats[socialImpactCause];
        stats.totalReceived += causeShare;
        stats.purchaseCount += 1;
        stats.exists = true;

        _sendValue(artistWallet, artistShare);
        _sendValue(socialImpactCause, causeShare);

        emit ImagePurchased(
            msg.sender,
            imageId,
            socialImpactCause,
            msg.value,
            artistShare,
            causeShare,
            lotteryShare
        );
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
