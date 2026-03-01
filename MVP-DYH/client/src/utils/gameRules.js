// src/utils/gameRules.js
// Aquí lo que queremos hacer es convertir el dibujo del usuario en estadisticas para que juegue
export const calculateStats = (drawingArea, canvasWidth, canvasHeight) => {

  // 1. Calcular área del canvas (todo el espacio dibujable)
  const totalArea = canvasWidth * canvasHeight;

  // Solo evitamos que en caso de que no haya dibujo no divida erroneamente
  // EL área minima es de cero
  const safeArea = Math.max(drawingArea, 1);

  // 2. Calcular densidad (0 - 1) 
  // La densidad es el % del canvas donde haya dibujo
  const density = Math.min(safeArea / totalArea, 1);

  // 3. Calcular escala (0.5 - 2.5) 
  let scale = 0.5 + density * 2;
  scale = Math.min(Math.max(scale, 0.5), 2.5);

  // 4. Calcular Vida (HP) (100 - 500)
  // Más dibujo = más vida
  const hp = Math.floor(100 + density * 400);

  // 5. Calcular velocidad (1.0 - 10.0)
  // Entre más espacio ocupe será cada vez más lento
  const speed = parseFloat((10 - density * 9).toFixed(1));

  // 6. Calcular masa (0.0 - 1.0)
  const mass = parseFloat(density.toFixed(2));

  return { hp, speed, scale, mass };
};

// Aquí con los stats ya impuestos se le da una clasificación al dibujo
export const classifyCharacter = (stats) => {
  const { hp, speed, mass, scale } = stats;

  // 1. Torre (Demasiado grande)
  if (scale >= 2.3){
    return "Torre";
  }

  // 2. Tanque (Mucha vida)
  if (hp >= 380){
    return "Tanque";
  }

  // 3. Asesino (Muy veloz)
  if (speed >= 8){
    return "Asesino";
  }

  // 4. Escaramuzador (Alta ligereza)
  if (mass <= 0.3){
    return "Escaramuzador";
  }

  // 5. Soldado (En caso de no entrar en ninguna de las categorías anteriores)
  return "Soldado";
}