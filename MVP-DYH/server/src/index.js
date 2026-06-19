import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});

app.get('/', (_req, res) => {
  res.send('DYH Game Server Running');
});

io.on('connection', (socket) => {
  const playerId = socket.id;

  console.log(`Jugador conectado: ${playerId}`);

  socket.emit('playerId', { playerId });

  socket.on('disconnect', () => {
    console.log(`Jugador desconectado: ${playerId}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor Express listo en http://localhost:${PORT}`);
});
