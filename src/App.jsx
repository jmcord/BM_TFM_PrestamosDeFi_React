import { ConnectKitButton, ConnectKitProvider } from 'connectkit'
import { AppLayout } from './components/ui/layouts'
import { config } from './config/wagmi'
import { Home } from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider>
        <ConnectKitProvider>
        <AppLayout>
          <Home />
        </AppLayout>
        <ConnectKitButton />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App