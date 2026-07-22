// src/App.jsx
import { useState } from 'react';
import DrawingCanvas from './components/Drawing/DrawingCanvas';
import Arena from './components/Arena/Arena';
import Chat from './components/Chat/Chat';
import './App.css';

function App() {
  const [screen, setScreen] = useState('drawing')  // Se pone de default el estado 'drawing'
  const [characterData, setCharacterData] = useState(null)

  // Se reciben los datos del objeto JSON de DrawingCanvas.jsx al terminar de procesar el dibujo
  const handleDrawingComplete = (characterClass, stats, draw, sprites) => {
    setCharacterData({characterClass, stats, draw, sprites})
    setScreen('arena') // Se pone la pantalla arena
  };

  //Zona de dibujo
  if (screen === 'drawing') return <DrawingCanvas onComplete={handleDrawingComplete} />

  //Zona de arena y chat
  if (screen === 'arena') {
    return (
      //Contenedor que envuelve a la arena y el chat, evita que haya errores de acomodo entre los dos
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        
        <Arena character={characterData} />  {/*Se muestra la arena*/}
        
        <Chat/>  {/*Se muestra el chat*/}
        
      </div>
    );
  }
  return null;
}

export default App;