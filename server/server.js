const WebSocketServer = require("websocket").server;
const http = require("http");
const sensor = require("./modules/sensor");
const config = require("./config.json");

const server = http.createServer(function(request, response) {});

server.listen(config.port, function() {});

// create the WebSocket server
wsServer = new WebSocketServer({
  httpServer: server
});

// handle client request
wsServer.on("request", function(request) {
  const connection = request.accept(null, request.origin);

  const tempInfo = new sensor().getRealTimeTempInfo();
  connection.send(JSON.stringify(tempInfo));

  sendPeriodicAlert();
  // Mimic sensor is periodically sending the alert regarding undesired temperature
  function sendPeriodicAlert() {
    setInterval(() => {
      const tempInfo = new sensor().sendAlert();
      connection.send(JSON.stringify(tempInfo));
    }, 10000);
  }

  // close the connection
  connection.on("close", function(connection) {});
});
