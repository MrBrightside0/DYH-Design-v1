const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let mode = "pen";
let color = "#000000";
let lineWidth = 5;

let history = [];
let redoStack = [];

function saveState() {
  history.push(canvas.toDataURL());
  redoStack = [];
}

function restoreState(fromStack, toStack) {
  if (fromStack.length === 0) return;

  toStack.push(canvas.toDataURL());
  const img = new Image();
  img.src = fromStack.pop();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

// controles
document.getElementById("colorPicker").addEventListener("change", e => {
  color = e.target.value;
});

document.getElementById("lineWidth").addEventListener("input", e => {
  lineWidth = e.target.value;
});

document.getElementById("penBtn").addEventListener("click", () => {
  mode = "pen";
});

document.getElementById("eraserBtn").addEventListener("click", () => {
  mode = "eraser";
});

document.getElementById("undoBtn").addEventListener("click", () => {
  restoreState(history, redoStack);
});

document.getElementById("redoBtn").addEventListener("click", () => {
  restoreState(redoStack, history);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", e => {
  saveState();
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;

  ctx.strokeStyle = mode === "eraser" ? "#ffffff" : color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();

  analizarDibujo();
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  ctx.closePath();
});

document.addEventListener("paste", (event) => {
  const items = event.clipboardData.items;

  for (let item of items) {
    if (item.type.startsWith("image")) {
      const blob = item.getAsFile();
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        saveState();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        analizarDibujo();
      };

      img.src = url;
    }
  }
});

// leer píxeles
function obtenerImageData() {
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// binarizar imagen
function binarizarImagen(imageData) {
  const { data, width, height } = imageData;
  const mascara = new Array(width * height);

  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // si no es blanco cuenta como dibujo
    const esDibujo = !(r > 240 && g > 240 && b > 240);
    mascara[j] = esDibujo ? 1 : 0;
  }

  return { mascara, width, height };
}

// calcular área (masa)
function calcularArea(mascara) {
  let area = 0;
  for (let i = 0; i < mascara.length; i++) {
    area += mascara[i];
  }
  return area;
}

// calcular centroide
function calcularCentroide(mascara, width, height) {
  let sumaX = 0;
  let sumaY = 0;
  let masa = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;

      if (mascara[index] === 1) {
        sumaX += x;
        sumaY += y;
        masa++;
      }
    }
  }

  if (masa === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: sumaX / masa,
    y: sumaY / masa
  };
}

function analizarDibujo() {
  const imageData = obtenerImageData();
  const { mascara, width, height } = binarizarImagen(imageData);

  const area = calcularArea(mascara);
  const centroide = calcularCentroide(mascara, width, height);

  const datosHeroe = {
    stats: {
      area: area,
      centroid: {
        x: centroide.x,
        y: centroide.y
      }
    },
    metadata: {
      canvasWidth: width,
      canvasHeight: height,
      timestamp: Date.now()
    }
  };

  console.log("JSON generado:", datosHeroe);

  return datosHeroe;
}