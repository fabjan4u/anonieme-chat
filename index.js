const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());

// Beveiliging: Rate limiting tegen DDoS / Brute-force requests op HTTP niveau
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuut
  max: 100, // Max 100 verzoeken per IP per minuut
  message: 'Te veel verzoeken, probeer het later opnieuw.'
});
app.use(limiter);

// Serve static files from the 'public' directory
app.use(express.static('public'));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Op een productie-omgeving stel je dit in op je specifieke frontend domein
  },
});

io.on('connection', (socket) => {
  // Beveiliging: Alle console.logs verwijderd zodat er geen sporen of socket ID's 
  // worden vastgelegd in de terminal-logs van de cloud provider (Zero Logging).

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('offer', (data) => {
    socket.to(data.roomId).emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.to(data.roomId).emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    socket.to(data.roomId).emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    // Geen logs.
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Signaling server secure & running on port ${PORT}`);
});
