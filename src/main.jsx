import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
const queryClient = new QueryClient()
import './index.css'
import {HeroUIProvider} from '@heroui/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HeroUIProvider>  {/* Wrap your app with HeroUIProvider */}  {/* Add your own theme here */}
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
