const http = require("http");
const { Server } = require("socket.io");

// Importamos nuestro módulo de validación
const { validateMovement } = require("./movementHandler");

// Creamos servidor HTTP
const server = http.createServer();

// Conectamos Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Cuando un jugador se conecta
io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);

  // Evento de movimiento del jugador
  socket.on("player-move", (data) => {
    console.log("Movimiento recibido:", data);

    // Validación autoritativa
    const isValid = validateMovement(data);

    if (isValid) {
      console.log("Movimiento válido:", data);

      // Reenviar a todos los jugadores
      io.emit("player-move", {
        id: socket.id,
        ...data,
      });
    } else {
      console.log("❌ Movimiento inválido:", data);
    }
  });

  // Desconexión
  socket.on("disconnect", () => {
    console.log("Jugador desconectado:", socket.id);
  });
});

// Levantar servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
