import { useLoginWithEmail, usePrivy, useWallets } from '@privy-io/react-auth';

function getPrivyEmail(user) {
  return user?.email?.address ?? user?.google?.email ?? user?.apple?.email ?? null;
}

function getPrivyWalletAddress(user, wallets) {
  const embeddedWallet =
    wallets?.find((wallet) => wallet.walletClientType === 'privy' || wallet.connectorType === 'embedded') ??
    wallets?.[0] ??
    null;

  return (
    embeddedWallet?.address ??
    user?.wallet?.address ??
    user?.linkedAccounts?.find((account) => account.address)?.address ??
    null
  );
}

export default function PrivyBridge({ children }) {
  const { ready, authenticated, user, logout } = usePrivy();
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { wallets, ready: walletsReady } = useWallets();

  const privyAuth = {
    enabled: true,
    ready,
    authenticated,
    user,
    email: getPrivyEmail(user),
    walletAddress: getPrivyWalletAddress(user, wallets),
    walletsReady,
    sendCode,
    loginWithCode,
    logout,
  };

  return children(privyAuth);
}
