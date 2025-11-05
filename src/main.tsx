import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KawaHeader from './components/navBar.tsx'
import BackGroundImage from './components/Background.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <KawaHeader />
         <BackGroundImage />

  </StrictMode>,
)
