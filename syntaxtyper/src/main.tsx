import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LessonProvider } from "./context/LessonContext";
import {IndustryProvider} from "./context/IndustryContext.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <IndustryProvider>
      <LessonProvider>
    <App />
      </LessonProvider>
      </IndustryProvider>
  </StrictMode>,
)
