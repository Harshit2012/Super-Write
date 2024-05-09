const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const penColorInput = document.getElementById('pen-color');
const textInput = document.getElementById('text-input');
const addTextBtn = document.getElementById('add-text-btn');
const downloadBtn = document.getElementById('download-btn');

ctx.lineWidth = 2;
ctx.strokeStyle = penColorInput.value;

let drawing = false;
let textX = 100;
let textY = 100;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

penColorInput.addEventListener('input', () => {
    ctx.strokeStyle = penColorInput.value;
});

addTextBtn.addEventListener('click', () => {
    const text = textInput.value;
    ctx.font = '16px Arial';
    ctx.fillText(text, textX, textY);
});

downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
});

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function home() {
    window.location = "index.html"
}

document.getElementById('clearBtn').addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
