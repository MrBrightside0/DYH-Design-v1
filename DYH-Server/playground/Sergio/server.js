const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Escuchamos el evento 'chat-mensaje'
  socket.on('chat-mensaje', (paquete) => {
    
    // 1. Verificamos si el usuario escribió "Ping" (ignorando mayúsculas/minúsculas)
    if (paquete.texto.toLowerCase() === 'ping') {
      
      // 2. El servidor responde SOLO al usuario que preguntó (socket.emit)
      // Devolvemos la misma estampa de tiempo que nos envió el cliente
      socket.emit('chat-respuesta', {
        texto: 'Pong',
        esPing: true,
        horaOriginal: paquete.horaEnvio // its so peak, es clave Bv
      });

    } else {
      // Si es un mensaje normal, lo enviamos a TODOS (io.emit)
      io.emit('chat-respuesta', {
        texto: paquete.texto,
        esPing: false
      });
    }
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});