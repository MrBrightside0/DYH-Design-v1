

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); // Creamos la app de Express
const server = createServer(app); // Se la pasamos al servidor HTTP

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

const players = [];


app.get("/", (req, res) => {
  res.send("Servidor de Juego Corriendo ");
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  players.push({
    id: socket.id,
    position: [Math.random() * 3, 0, Math.random() * 3],
  });

  io.emit("players", players);

  socket.on("move", (newPosition) => {
    const player = players.find((p) => p.id === socket.id);
    if (player) {
      player.position = newPosition;
      io.emit("players", players);
    }
  });

  socket.on("disconnect", () => {
    const index = players.findIndex((p) => p.id === socket.id);
    if (index !== -1) players.splice(index, 1);
    io.emit("players", players);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor Express listo en http://localhost:${PORT}`);
});