import React from 'react';
import { createRoot } from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App.jsx';
import PrivyBridge from './PrivyBridge.jsx';
import './styles.css';

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID;
const privyClientId = import.meta.env.VITE_PRIVY_CLIENT_ID;

const app = privyAppId ? (
  <PrivyProvider
    appId={privyAppId}
    clientId={privyClientId || undefined}
    config={{
      loginMethods: ['email'],
      embeddedWallets: {
        ethereum: {
          createOnLogin: 'users-without-wallets',
        },
      },
      appearance: {
        theme: 'light',
        accentColor: '#3f4513',
      },
    }}
  >
    <PrivyBridge>{(privyAuth) => <App privyAuth={privyAuth} />}</PrivyBridge>
  </PrivyProvider>
) : (
  <App privyAuth={{ enabled: false, ready: false, authenticated: false }} />
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
);
