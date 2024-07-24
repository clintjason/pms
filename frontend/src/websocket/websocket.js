// websocket.js
import store from '../store';
import { addNotification } from '../reducers/notificationsSlice';

const WebSocketClient = new WebSocket('ws://localhost:3001');

WebSocketClient.onmessage = (message) => {
  const newNotification = JSON.parse(message.data);
  store.dispatch(addNotification(newNotification));
};

export default WebSocketClient;