const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let start = false;

//  FUNCION NUEVA PARA CÁLCULO DE MASA Y CENTROIDE

function PixelProcessing(PixelData){
    let drawnPixels = 0;
    let MasaTotal = 0;
    let xSuma = 0;
    let ySuma = 0;

    for (let i = 0; i < PixelData.length; i += 4) {
        const a = PixelData[i + 3];
        if (a > 0) {
            let PixelCord = i/4;
            let masa = a/255;
            let x = PixelCord % canvas.width;
            let y = Math.floor(PixelCord / canvas.width);

            MasaTotal += masa;
            xSuma += x * masa;
            ySuma += y * masa;
        }
    }

    let Xcentro
    let Ycentro

    if (MasaTotal < 0.001){
        Xcentro = 0;
        Ycentro = 0;
    }
    else {
        Xcentro = xSuma / MasaTotal;
        Ycentro = ySuma / MasaTotal;
    }
    
    let Centroide = [Xcentro, Ycentro];

    const output = document.createElement('div');
    output.innerHTML = `<p>Masa del Dibujo: ${MasaTotal}</p><p>Centroide del Dibujo: ${Centroide}</p>`;
    document.body.appendChild(output);
}

//  ------ USO DE BOTONES ------

const Start = document.getElementById("start");
Start.addEventListener("click", (e) => {
    start = true;
});

const Clear = document.getElementById("clear");
Clear.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const Save = document.getElementById("save");
Save.addEventListener("click", (e) => {
    const ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const PixelData = ImageData.data;

    PixelProcessing(PixelData) // Aqui se usa la papufunción B)
});



//  ------ FUNCIONAMIENTO DEL LIENZO ------

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

//  Eventos a tomar en cuenta para que funcione bien el dibujo.
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    draw(e);
});

canvas.addEventListener("mousemove", (e) => {
    draw(e);
});

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mouseout", (e) => {
    drawing = false;
    ctx.beginPath();
});