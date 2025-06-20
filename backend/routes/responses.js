const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');
const Response = require('../models/Response');

// Crear una nueva respuesta
router.post('/', async (req, res) => {
  try {
    const { surveyId, answers } = req.body;

    // Verificar que la encuesta existe
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }

    // Convertir el formato para el modelo de MongoDB
    const responses = answers.map(answer => ({
      questionId: answer.questionId,
      selectedOptions: Array.isArray(answer.answer) ? answer.answer : [answer.answer]
    }));

    // Crear nueva respuesta
    const response = new Response({
      surveyId,
      responses
    });

    await response.save();

    // Emitir evento Socket.IO para actualización en tiempo real
    const io = req.app.get('io');
    if (io) {
      io.to(`survey-${surveyId}`).emit('newResponse', { surveyId });
    }

    res.status(201).json({ message: 'Respuesta guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar respuesta:', error);
    res.status(500).json({ message: 'Error al guardar la respuesta', error: error.message });
  }
});

module.exports = router; 