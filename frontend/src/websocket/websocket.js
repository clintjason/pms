// websocket.js
import store from '../store';
import { addNotification } from '../reducers/notificationsSlice';

const WebSocketClient = new WebSocket('ws://localhost:3000/ws');

WebSocketClient.onopen = () => {
  console.log('WebSocket Client Connected');
};

WebSocketClient.onmessage = (message) => {
  const newNotification = JSON.parse(message.data);
  store.dispatch(addNotification(newNotification));
};

WebSocketClient.onerror = function() {
  console.log('WebSocket Connection Error');
};

export default WebSocketClient;