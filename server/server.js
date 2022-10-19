import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    console.log(data);
    io.emit('chat message', data);
  });
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
