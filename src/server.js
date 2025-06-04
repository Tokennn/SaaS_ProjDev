import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
// import projectRoutes from './api/routes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

// Routes API
// app.use('/api', projectRoutes);

// Stockage temporaire des messages
const messages = [];

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté', socket.id);

  // Envoyer l'historique des messages au nouveau client
  socket.emit('messageHistory', messages);

  socket.on('message', (message) => {
    console.log('Nouveau message reçu:', message);
    messages.push(message);
    // Diffuser le message à tous les clients connectés, y compris l'expéditeur
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 