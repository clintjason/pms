const http = require('http');
const app = require('./app');
const WebSocket = require("ws");

const normalizePort = val => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
	console.log('Listening on ' + bind);
});

const wss = new WebSocket.Server({ path: "/ws", server });
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

	ws.on('message', (message) => {
    ws.userId = JSON.parse(message).userId; // Assuming the client sends userId on connection
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

const sendNotification = (userId, notification) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.userId === userId) {
      client.send(JSON.stringify(notification));
    }
  });
};

server.listen(port);

module.exports = sendNotification;

console.log('Exports from server.js:', module.exports);