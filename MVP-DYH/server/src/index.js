/* ============================================================
 *  DYH-Server — Servidor Principal de Draw Your Hero
 *  MVP-DYH | Express + Socket.io + CORS
 * ============================================================ */

/*
 * Express: Framework HTTP para Node.js. Maneja rutas y middleware.
 * createServer: Servidor HTTP nativo donde se monta Express
 *               para que Socket.io pueda compartir el mismo puerto.
 * Server: Clase principal de Socket.io. Comunicación bidireccional
 *         en tiempo real mediante WebSockets.
 */
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

/*
 * 1. INICIALIZAR SERVIDOR HTTP (EXPRESS)
 *    Se crea la app de Express y se envuelve en un servidor HTTP nativo.
 *    Esto es necesario porque Socket.io necesita acceso al servidor puro
 *    para hacer el upgrade de protocolo HTTP a WebSocket.
 */
const app = express();
const server = createServer(app);

/*
 * 2. CONFIGURAR SOCKET.IO CON CORS
 *    - origin: Solo el cliente React en Vite (localhost:5173) puede conectarse.
 *              Se incluye 127.0.0.1 para acceso desde otra interfaz de red.
 *    - methods: GET para el handshake de WebSocket, POST como fallback (polling).
 */
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST']
  }
});

/*
 * 3. RUTA RAIZ (Health Check)
 *    Mensaje simple para confirmar que el servidor está corriendo.
 *    Útil para pruebas rápidas con curl o navegador.
 */
app.get('/', (_req, res) => {
  res.send('DYH Game Server Running');
});

/*
 * 4. MANEJO DE CONEXIONES WEBSOCKET
 *    'connection' se dispara cada vez que un cliente establece una
 *    conexión WebSocket exitosa con el servidor.
 *
 *    Cada socket recibe un ID único generado por Socket.io (~20 caracteres).
 *    Este ID se usa como playerId para identificar al jugador durante la partida.
 *    No se reutiliza entre sesiones: cada refresh de página genera un ID nuevo.
 *
 *    Al conectarse, se emite 'playerId' al cliente con su ID para que
 *    sepa quién es desde el primer momento.
 */
io.on('connection', (socket) => {
  const playerId = socket.id;

  console.log(`Jugador conectado: ${playerId}`);

  // Enviar al cliente su playerId al instante
  socket.emit('playerId', { playerId });

  /*
   * 5. MANEJO DE DESCONEXIÓN
   *    Se dispara cuando el cliente cierra la pestaña, pierde conexión,
   *    o llama a socket.disconnect(). Aquí se debe limpiar el estado
   *    del jugador: removerlo de salas, notificar a otros, liberar recursos.
   */
  socket.on('disconnect', () => {
    console.log(`Jugador desconectado: ${playerId}`);
  });
});

/*
 * 6. INICIAR EL SERVIDOR
 *    PORT se lee de variable de entorno para compatibilidad con deploy en la nube.
 *    Si no está definida, usa 3000 por defecto (mismo puerto que DYH-Server).
 *    server.listen() arranca Express + Socket.io en un solo puerto.
 */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor Express listo en http://localhost:${PORT}`);
});
