const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // 1. ESCUCHAR PETICIÓN DE ESTADO
  socket.on('verificar-estado', () => {
    console.log(`El usuario ${socket.id} preguntó por el estado.`); // Log para debug
    
    // Respondemos al usuario marcando el mensaje como 'esSistema'
    socket.emit('chat-respuesta', {
      texto: '✅ Conexión exitosa: El servidor te escucha fuerte y claro.',
      esSistema: true 
    });
  });

  // 2. CHAT Y PING
  socket.on('chat-mensaje', (paquete) => {
    if (paquete.texto.toLowerCase() === 'ping') {
      socket.emit('chat-respuesta', {
        texto: 'Pong',
        esPing: true,
        horaOriginal: paquete.horaEnvio
      });
    } else {
      // Mensaje normal
      io.emit('chat-respuesta', {
        texto: paquete.texto,
        esPing: false,
        esSistema: false
      });
    }
  });
});


io.on('connection', (socket) => {
    // console.log para debugging
    console.log('Nuevo jugador:', socket.id);

    socket.on('mover-personaje', (datos) => {
        
        // EMPAQUETAMOS TODO
        const paqueteDeMovimiento = {
            id: socket.id,
            x: datos.x,
            y: datos.y,
            z: datos.z,
            color: datos.color // <--- ¡IMPORTANTE! Reenviamos el color
        };

        // El servidor actúa como espejo para los DEMÁS
        socket.broadcast.emit('posicion-actualizada', paqueteDeMovimiento);
    });

    // Limpieza básica para que no queden fantasmas
    socket.on('disconnect', () => {
        io.emit('jugador-desconectado', socket.id);
    });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});