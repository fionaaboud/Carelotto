# Smart Contract Deployment

## Contract

`CareLottoSplit` handles the core purchase split:

- One third of each image purchase goes to the artist wallet.
- One third goes to the selected social impact cause wallet.
- The remaining third stays in the contract lottery pool.

The lottery pool is held for the Chainlink VRF milestone, where winner selection will be added.

## Local Compile

```bash
npm run contracts:compile
```

If Hardhat cannot write to its global compiler cache on this machine, run the project-level validation instead:

```bash
npm run contracts:validate
```

## Local Deployment

```bash
ARTIST_WALLET=0x0000000000000000000000000000000000000001 npm run contracts:deploy:local
```

## Testnet Deployment Notes

Set these values in `.env` before deploying to a public testnet:

```bash
ARTIST_WALLET=
SEPOLIA_RPC_URL=
SEPOLIA_PRIVATE_KEY=
```

Public testnet deployment is intentionally not automatic yet. It should happen once the wallet and RPC account are chosen.
