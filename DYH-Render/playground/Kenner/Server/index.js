const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors"); // Importante para que React no se queje

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Permite que cualquiera (tu React) se conecte
    methods: ["GET", "POST"]
  }
});

// Servir el archivo de prueba (el index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


let jugadores = {}; 

io.on('connection', (socket) => {
  console.log('Jugador conectado:', socket.id);

  // 1. Crear al nuevo jugador en la memoria del servidor
  jugadores[socket.id] = { x: 0, y: 0, z: 0 };

  // 2. Enviarle al NUEVO jugador la lista de los que ya estaban
  socket.emit('jugadores-actuales', jugadores);

  // 3. Avisar a los DEMÁS que entró alguien nuevo
  socket.broadcast.emit('nuevo-jugador', { 
    id: socket.id, 
    x: 0, y: 0, z: 0 
  });

  // 4. Cuando alguien se mueve
  socket.on('mover-personaje', (datos) => {
    // Actualizamos la posición en la memoria del servidor
    if (jugadores[socket.id]) {
        jugadores[socket.id].x = datos.x;
        jugadores[socket.id].y = datos.y;
        jugadores[socket.id].z = datos.z;
    }
    // Rebotamos el chisme a todos (MENOS al que se movió)
    // NOTA: Sin console.log aqui para evitar lag
    socket.broadcast.emit('jugador-se-movio', { id: socket.id, ...datos });
  });

  // 5. Cuando alguien se desconecta
  socket.on('disconnect', () => {
    console.log('Jugador desconectado:', socket.id);
    // Borramos al jugador de la memoria
    delete jugadores[socket.id];
    // Avisamos a todos para que borren el muñeco de su pantalla
    io.emit('jugador-desconectado', socket.id);
  });
});

server.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});