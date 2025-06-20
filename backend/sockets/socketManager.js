// Configuración de Socket.IO
const setupSocket = (io) => {
  io.on('connection', (socket) => {
    // Unirse a una sala de encuesta
    socket.on('join-survey', (surveyId) => {
      const roomName = `survey-${surveyId}`;
      socket.join(roomName);
    });

    // Manejar envío de respuesta
    socket.on('submit-response', (data) => {
      // Emitir evento newResponse a todos en la sala
      const roomName = `survey-${data.surveyId}`;
      socket.to(roomName).emit('newResponse', { surveyId: data.surveyId });
    });

    // Desconexión
    socket.on('disconnect', () => {
    });
  });
};

module.exports = setupSocket; 