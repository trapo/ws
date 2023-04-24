// Importaciones
const WebSocket = require("ws");
const http = require("http");

// Creamos una instacia del servidor HTTP (Web)
const server = http.createServer();
// Creamos y levantamos un servidor de WebSockets a partir del servidor HTTP
const wss = new WebSocket.Server({ server });

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

// Escuchamos los eventos de conexión
wss.on("connection", function connection(ws,req) {
    // Escuchamos los mensajes entrantes
    ws.id = wss.getUniqueID();
    console.log(ws.id)
    ws.on("message", function incoming(data) {
        // Iteramos todos los clientes que se encuentren conectados
        //console.log(JSON.stringify(req))
        
      
        wss.clients.forEach(function each(client) {
            
            if (client.readyState === WebSocket.OPEN && ws.id != client.id) {
                // Enviamos la información recibida
                client.send("mensaje enviado desde " + client.id +" contenido :" + data.toString());
                
            }
        });
    });
});

// Levantamos servidor HTTP
server.listen(8080);
console.log("Servidor funcionando. Utiliza ws://localhost:8080 para conectar.")

