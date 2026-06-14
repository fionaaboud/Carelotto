# Smart Contract Deployment

## Contract

`CareLottoSplit` handles the core purchase split:

- One third of each image purchase goes to the artist wallet.
- One third goes to the selected social impact cause wallet.
- The remaining third stays in the contract lottery pool.
- Each artwork purchase is also recorded as a lottery ticket entry in the active round.
- The entry records the buyer payout wallet, so Privy/card flows can still pay the eventual winner.

The lottery pool is held for Chainlink VRF winner selection. An operator closes the active round, requests VRF winner selection, Chainlink fulfills the request, and the selected buyer claims the round pool.

## Local Compile

```bash
npm run contracts:compile
```

If Hardhat cannot download the compiler or write to its global compiler cache on this machine, run the project-level validation instead:

```bash
npm run contracts:validate
```

## Local Deployment

```bash
ARTIST_WALLET=0x0000000000000000000000000000000000000001 npm run contracts:deploy:local
```

## Sepolia Deployment Notes

Set these values in `.env` before deploying to Sepolia:

```bash
ARTIST_WALLET=
SEPOLIA_RPC_URL=
SEPOLIA_PRIVATE_KEY=
CHAINLINK_VRF_SUBSCRIPTION_ID=
CHAINLINK_VRF_COORDINATOR=0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B
CHAINLINK_VRF_KEY_HASH=0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae
CHAINLINK_VRF_CALLBACK_GAS_LIMIT=200000
CHAINLINK_VRF_NATIVE_PAYMENT=false
```

Deploy with:

```bash
npm run contracts:deploy:sepolia
```

After deployment:

- Copy the deployed contract address.
- Add it as an approved consumer in the Chainlink VRF subscription manager.
- Add it to local and Vercel environment variables as `VITE_CARELOTTO_CONTRACT_ADDRESS`.
- Redeploy the frontend so the dashboard can send real `requestLotteryWinner()` transactions.

Current Sepolia deployment:

- Contract: `0x6124d9ed4ddd306f434ebfbd93c82963eefa6142`
- Transaction: `0xb7c8e5153f8a4f1cfb153a3a75166b69a6dcd4588cfe553ffbcd0456d0d4d2d0`
- Funded subscription ID: `68708946863532012447477294872412151512706447898369376774965116309887808902076`
