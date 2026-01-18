// Importamos las librerías necesarias
const http = require("http");
const { Server } = require("socket.io");

// Creamos el servidor HTTP
const server = http.createServer();

// Conectamos Socket.io al servidor
const io = new Server(server, {
  cors: {
    origin: "*", // permite conexiones desde cualquier cliente
  },
});

// Evento cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Escuchar mensajes del chat
  socket.on("chat-message", (msg) => {
    console.log("Mensaje recibido:", msg);

    // Reenviar a todos los clientes
    io.emit("chat-message", msg);
  });

  // Evento para medir latencia 
  socket.on("ping-latency", (startTime) => {
    socket.emit("pong-latency", startTime);
  });

  // Evento cuando un cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Levantamos el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});