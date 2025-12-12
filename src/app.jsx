import { useState } from 'react'
import ModeSelector from './shared/components/ModeSelector'
import ClassicMode from './features/classic-mode/ClassicMode'
//import SilhouetteMode from './features/silhouette-mode/SilhouetteMode'
import Dashboard from './features/dashboard/Dashboard'

function App() {
  const [currentMode, setCurrentMode] = useState('menu')

  const renderMode = () => {
    switch (currentMode) {
      case 'classic':
        return <ClassicMode onBack={() => setCurrentMode('menu')} />
      case 'silhouette':
        return <SilhouetteMode onBack={() => setCurrentMode('menu')} />
      case 'dashboard':
        return <Dashboard onBack={() => setCurrentMode('menu')} />
      default:
        return <ModeSelector onSelectMode={setCurrentMode} />
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="retro-title text-3xl md:text-5xl mb-4">Strivedle</h1>
          <p className="text-gray-300 text-lg">Guilty Gear Strive Wordle</p>
        </header>
        {renderMode()}
      </div>
    </div>
  )
}

export default App

