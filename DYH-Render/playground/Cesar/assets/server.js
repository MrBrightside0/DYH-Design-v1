import WebSocket, { WebSocketServer } from "ws"

// esto es de q el servidor
// aun no lo entiendo mucho pero ya masomenos se que rollito
// aqui se crea de q nomas, aun no le entiendo al lore al 100% pero papi chat me lo explica jeje
const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws) => {
  ws.on("message", (data) => {

    // en teoria esto es de q el poderocicimo camion q me lleva a la uni

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString())
      }
    })
  })
})

// y esto signifca q ps jala y q todo mola
console.log("Servidor WebSocket activo en puerto 8080")
