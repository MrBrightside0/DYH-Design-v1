// src/App.jsx
import { useState } from 'react';
import DrawingCanvas from './components/Drawing/DrawingCanvas';
import Arena from './components/Arena/Arena';
import './App.css';

function App() {
  const [screen, setScreen] = useState('drawing')  // Se pone de default el estado 'drawing'
  const [characterData, setCharacterData] = useState(null)

  // Se reciben los datos del objeto JSON de DrawingCanvas.jsx al terminar de procesar el dibujo
  const handleDrawingComplete = (characterClass, stats, draw, sprites) => {
    setCharacterData({characterClass, stats, draw, sprites})
    setScreen('arena')  // Se pone la pantalla arena
  }

  // Coso para manejar el cambio de pantlallas
  if (screen === 'drawing') return <DrawingCanvas onComplete = {handleDrawingComplete} />
  if (screen === 'arena') return <Arena character = {characterData} />
}

export default App;