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
import { setHeapSnapshotNearHeapLimit } from 'v8';

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

//Objeto para registrar al cliente conectado
const jugadoresConectados = {};

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

  //Se registra al cliente junto con sus propiedades iniciales
  socket.on('registerPlayer', (payload) => {
    // payload expected: { stats, color?, username?, sprites? }
    const { stats, color, username, sprites } = payload || {};
    if(stats && stats.hp !== undefined && stats.speed !== undefined && stats.scale !== undefined && stats.mass !== undefined){
      // Assign a color if the client didn't send one
      const assignedColor = color || (`#${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')}`);

      jugadoresConectados[playerId] = {
        playerId: playerId,
        stats: stats, //se utilizan los stats ya calculados en gameRules
        color: assignedColor,
        username: username || `Player-${playerId.slice(0,4)}`,
        sprites: sprites || null,
        position: {
          x: 0,
          y: 0
        }
      }

      //Enviar al jugador su playerId y los jugadores ya conectados
      socket.emit('playerId', { playerId });
      socket.emit('currentPlayers', jugadoresConectados);

      //Avisar a los demas sobre el nuevo jugador
      socket.broadcast.emit('newPlayer', jugadoresConectados[playerId]);

      //Recepcion en un cambio en el movimiento y retransmision de la posicion a los demas jugadores
      socket.on('playerMove', (data) => {
        if (jugadoresConectados[playerId]) {
          jugadoresConectados[playerId].position = {x: data.x, y: data.y};
          socket.broadcast.emit('retransmision', {
            playerId: playerId,
            position: jugadoresConectados[playerId].position
          });
        }
      });

        /*
        * 5. MANEJO DE DESCONEXIÓN
        *    Se dispara cuando el cliente cierra la pestaña, pierde conexión,
        *    o llama a socket.disconnect(). Aquí se debe limpiar el estado
        *    del jugador: removerlo de salas, notificar a otros, liberar recursos.
        */
       socket.on('disconnect', () => {
        console.log(`Jugador desconectado: ${playerId}`);

        //Avisa la eliminacion del jugador a los demas jugadores
        socket.broadcast.emit('disconnectPlayer', {playerId: playerId});
        
        //Elimina de la memoria los datos del jugador
        delete jugadoresConectados[playerId];
        });
      }
      else {
        console.log('ERROR: Datos entrantes incompletos.');
        socket.disconnect();
      }
  });

  //Sockets para comunicacion del chat
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', {
      body: msg.body,
      user: msg.user
    })
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