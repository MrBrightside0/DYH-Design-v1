// src/components/DrawingCanvas.jsx
import { useRef, useState, useEffect } from "react";
import { calculateStats, classifyCharacter } from "../../utils/gameRules";
import "./DrawingCanvas.css";

const DrawingCanvas = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Estados para las herramientas
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5); // Grosor inicial
  const [tool, setTool] = useState("pencil"); // 'pencil', 'eraser', 'spray'

// Configuración inicial
  useEffect(() => {
    const canvas = canvasRef.current;
    
    // CAMBIO AQUÍ: De 500 a 800 para hacerlo panorámico (Wide)
    canvas.width = 512; 
    canvas.height = 512; // La altura se queda igual o la subes a 600 si quieres
    
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // --- Lógica de Dibujo ---
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    // Si es spray, pintamos un punto inicial
    if (tool === 'spray') spray(ctx, offsetX, offsetY);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");

    // Configurar herramienta
    if (tool === "eraser") {
      ctx.strokeStyle = "white"; // Borrar es pintar de blanco
      ctx.lineWidth = 20; // El borrador es más grande
    } else if (tool === "pencil") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }

    if (tool === "spray") {
      spray(ctx, offsetX, offsetY);
    } else {
      // Dibujo normal (Línea sólida)
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  // Función especial para efecto de Spray/Difuminado
  const spray = (ctx, x, y) => {
    ctx.fillStyle = tool === "eraser" ? "white" : color;
    const radio = brushSize * 2;
    // Generar puntitos aleatorios alrededor del mouse
    for (let i = 0; i < 10; i++) {
      const offsetX = (Math.random() - 0.5) * radio;
      const offsetY = (Math.random() - 0.5) * radio;
      ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
    }
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  // Función para limpiar todo el canvas (Bote de basura)
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Darle click a listo
  const handleInvocar = async  () => {
    
    // Código para exportar el dibujo y poder pasarlo al render
    const canvas = canvasRef.current;
    const dataAvatar = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataAvatar;
    link.download = 'Avatar.png';

    // Función del equipo anterior para calcular las stats y generar el JSON
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Contar píxeles que NO sean blancos
    let pixelCount = 0;
    for (let i = 0; i < imgData.data.length; i += 4) {
      const r = imgData.data[i];
      const g = imgData.data[i + 1];
      const b = imgData.data[i + 2];
      // Si no es blanco puro (255,255,255), cuenta como dibujo
      if (r < 255 || g < 255 || b < 255) pixelCount++;
    }

    const stats = calculateStats(pixelCount, canvas.width, canvas.height);
    
    const characterClass = classifyCharacter (stats);

    const characterData = {
    playerId: "socket_id_" + Math.floor(Math.random() * 999),
    class: characterClass,
    stats: stats,
    color: color,
    dibujo: dataAvatar // Aquí se guarda el dibujo junto a las stats del personaje
    };

    // Coso para mandar el dibujo que está dentro del JSON hacia el archivo Python donde se procesará y se hará el render 3D
    try {
      const response = await fetch("http://localhost:8000/process_Image", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(characterData)
      });

      const sprites = await response.json();

      // Condicional nuevo para llamar a onComplete para pasar los datos a App.jsx y de ahí pasarlo a las pantallas necesarias
      if (onComplete){
        onComplete(characterClass, stats, dataAvatar, `data:image/png;base64,${sprites}`);
      }

    } catch(error){
      console.error("No se pudo mandar el papoy: ", error)
      console.error('Se sustituyó el sprite por el dibujo')
      onComplete(characterClass, stats, dataAvatar, dataAvatar);
    }
  
    console.log("--- JSON GÉNESIS ---"); // ESTO SE PUEDE BORRAR PAPOY AAAAAAA
    console.log(JSON.stringify(characterData, null, 2));
    alert(`¡Personaje Creado!
      Clase: ${characterClass}
      HP: ${stats.hp}
      Velocidad: ${stats.speed}
      Escala: ${stats.scale}`);
  };

  return (
    <div className="genesis-container">
      
      {/* BARRA IZQUIERDA: Herramientas */}
      <div className="toolbar-left">
        <div className="tool-section">
          <h4>Útiles</h4>
          <div className="icon-grid">
            {/* Lápiz */}
            <button 
              className={`tool-btn ${tool === 'pencil' ? 'active' : ''}`}
              onClick={() => setTool('pencil')}
              title="Lápiz"
            >✏️</button>
            
            {/* Borrador */}
            <button 
              className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Borrador"
            >🧼</button>

             {/* Spray */}
            <button 
              className={`tool-btn ${tool === 'spray' ? 'active' : ''}`}
              onClick={() => setTool('spray')}
              title="Spray"
            >💨</button>

            {/* Limpiar Todo */}
            <button className="tool-btn" onClick={clearCanvas} title="Limpiar hoja">🗑️</button>
          </div>
        </div>

        <div className="tool-section">
          <h4>Grosor</h4>
          <div className="icon-grid">
            <button className={`tool-btn ${brushSize === 2 ? 'active' : ''}`} onClick={() => setBrushSize(2)}>•</button>
            <button className={`tool-btn ${brushSize === 5 ? 'active' : ''}`} onClick={() => setBrushSize(5)}>●</button>
            <button className={`tool-btn ${brushSize === 10 ? 'active' : ''}`} onClick={() => setBrushSize(10)}>⦾</button>
          </div>
        </div>
      </div>

      {/* CENTRO: Título + Canvas */}
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h2 className="canvas-title">✨ Mi Personaje ✨</h2>
        </div>
        
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        <button className="btn-invocar" onClick={handleInvocar}>
          Listo ✔
        </button>
      </div>

      {/* BARRA DERECHA: Colores */}
      <div className="palette-right">
        {['#000000', '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6'].map((c) => (
          <div 
            key={c}
            className={`color-swatch ${color === c ? 'active' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => {
              setColor(c);
              setTool('pencil'); // Si eliges color, vuelves al lápiz automáticamente
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default DrawingCanvas;