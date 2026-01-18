const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let mode = "pen";
let color = "#000000";
let lineWidth = 5;

let history = [];
let redoStack = [];

// ---- utilidades ----
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

// ---- controles ----
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

// ---- dibujo ----
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
        saveState(); // para que undo funcione
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    }
  }
});

