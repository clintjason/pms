const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

const sendNotification = (userId, notification) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.userId === userId) {
      client.send(JSON.stringify(notification));
    }
  });
};

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    ws.userId = JSON.parse(message).userId; // Assuming the client sends userId on connection
  });
});

module.exports = sendNotification;