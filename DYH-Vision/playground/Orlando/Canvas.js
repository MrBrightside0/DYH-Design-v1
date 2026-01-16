const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

let drawing = false; // Indicador para saber si se está dibujando o no
let start = false;   // Indicador para saber si el botón START fue presionado


//  ------ USO DE BOTONES ------

const Start = document.getElementById("start"); //  Permite empezar a Dibujar
Start.addEventListener("click", (e) => {
    start = true;
});

const Clear = document.getElementById("clear"); //  Genera un rectángulo en todo el lienzo para limpiarlo
Clear.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const Save = document.getElementById("save");   //  Descarga el dibujo
Save.addEventListener("click", (e) => {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'dibujo.png';
    link.click();
});


//  ------ FUNCIONAMIENTO DEL LIENZO ------

//  Función para dibujar siguiendo la ruta del mouse
function draw(e){
    if (start){
        if (!drawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
}

//  Eventos indispensables que se tienen que tomar en cuenta para que funcione bien el dibujo.
canvas.addEventListener("mousedown", (e) => {   //  Detecta si se está haciendo click con el mouse para empeazar el dibujo
    drawing = true;
    draw(e);
});

canvas.addEventListener("mousemove", (e) => {   // Detecta el movimiento del mouse para la función draw(e)
    draw(e);
});

canvas.addEventListener("mouseup", (e) => {     // Si se deja de presionar se cancela la animación y se reinicia el path
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mouseout", (e) => {    // Si el mouse se sale del canvas se cancela la animación y se reinicia el path
    drawing = false;
    ctx.beginPath();
});