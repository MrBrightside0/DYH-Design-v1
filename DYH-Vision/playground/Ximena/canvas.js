const canvas = document.getElementById('drawingBoard');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop; 

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

ctx.clearRect(0, 0, canvas.width, canvas.height);

let isPainting = false;
let lineWidth = 5;
let startX;
let startY; 

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return; 
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
}

canvas.addEventListener('pointerdown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
    ctx.beginPath();

});

canvas.addEventListener('pointermove', draw);

canvas.addEventListener('pointerup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.closePath();
    const drawData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(drawData);

});



