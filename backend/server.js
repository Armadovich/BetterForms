const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const surveyRoutes = require('./routes/surveys');
const responseRoutes = require('./routes/responses');

// Configurar variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);

// Configuración de CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL,
  'https://better-forms-frontend.vercel.app',
  'https://better-forms-one.vercel.app'
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Crear instancia de Socket.IO
const io = socketIo(server, { cors: corsOptions });
app.set('io', io);

// Filtro de peticiones
app.use(cors(corsOptions));
app.use(express.json());

// Log de peticiones
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/responses', responseRoutes);

// Configurar eventos de Socket.IO
const socketManager = require('./sockets/socketManager');
socketManager(io);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 