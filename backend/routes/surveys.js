const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');
const Response = require('../models/Response');
const { protect } = require('../middleware/auth');

// Manejar errores
const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ message, error: error.message });
};

// Verificar si la encuesta existe
const checkSurveyExists = (survey) => {
  if (!survey) {
    return { error: true, message: 'Encuesta no encontrada' };
  }
  return { error: false };
};

// Verificar permisos de propietario
const checkOwnership = (survey, userId) => {
  if (survey.createdBy.toString() !== userId) {
    return { error: true, message: 'No autorizado para esta acción' };
  }
  return { error: false };
};

// Calcular numero de respuestas para una pregunta
const calculateVotes = (responses, question) => {
  const votes = {};
  
  // Inicializar contadores
  question.options.forEach(option => {
    votes[option._id.toString()] = 0;
  });
  
  // Contar respuestas
  responses.forEach(response => {
    const questionResponse = response.responses.find(r => 
      r.questionId.toString() === question._id.toString()
    );
    
    if (questionResponse?.selectedOptions) {
      questionResponse.selectedOptions.forEach(optionId => {
        const optionIdStr = optionId.toString();
        if (votes[optionIdStr] !== undefined) {
          votes[optionIdStr]++;
        }
      });
    }
  });
  
  return votes;
};

// Añadir respuestas a una encuesta
const addVotesToSurvey = (survey, responses) => {
  return {
    ...survey,
    questions: survey.questions.map(question => {
      const votes = calculateVotes(responses, question);
      
      return {
        ...question,
        options: question.options.map(option => ({
          ...option,
          votes: votes[option._id.toString()] || 0
        }))
      };
    })
  };
};

// Obtener encuesta con verificación
const getSurveyWithCheck = async (id, select = null) => {
  const query = Survey.findById(id);
  if (select) query.select(select);
  
  const survey = await query.lean();
  const check = checkSurveyExists(survey);
  
  if (check.error) {
    throw new Error(check.message);
  }
  
  return survey;
};

// Obtener todas las encuestas del usuario
router.get('/my-surveys', protect, async (req, res) => {
  try {
    const surveys = await Survey.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    handleError(res, error, 'Error obteniendo encuestas');
  }
});

// Obtener una encuesta por ID
router.get('/:id/public', async (req, res) => {
  try {
    const survey = await getSurveyWithCheck(req.params.id);
    res.json(survey);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Obtener resultados de una encuesta
router.get('/:id/public-results', async (req, res) => {
  try {
    const survey = await getSurveyWithCheck(req.params.id, 'title description questions');
    const responses = await Response.find({ surveyId: req.params.id });
    const surveyWithVotes = addVotesToSurvey(survey, responses);
    
    res.json(surveyWithVotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Obtener una encuesta por ID con respuestas
router.get('/:id', protect, async (req, res) => {
  try {
    const survey = await getSurveyWithCheck(req.params.id);
    const responses = await Response.find({ surveyId: req.params.id });
    const surveyWithVotes = addVotesToSurvey(survey, responses);
    
    res.status(200).json(surveyWithVotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Crear una encuesta
router.post('/', protect, async (req, res) => {
  try {
    const newSurvey = new Survey({
      ...req.body,
      createdBy: req.user.id
    });
    const savedSurvey = await newSurvey.save();
    res.status(201).json(savedSurvey);
  } catch (error) {
    handleError(res, error, 'Error creando encuesta');
  }
});

// Eliminar una encuesta y todas sus respuestas
router.delete('/:id', protect, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    
    const check = checkSurveyExists(survey);
    if (check.error) {
      return res.status(404).json({ message: check.message });
    }

    const ownership = checkOwnership(survey, req.user.id);
    if (ownership.error) {
      return res.status(403).json({ message: ownership.message });
    }

    // Eliminar respuestas y encuesta
    await Response.deleteMany({ surveyId: req.params.id });
    await Survey.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Encuesta eliminada exitosamente' });
  } catch (error) {
    handleError(res, error, 'Error eliminando encuesta');
  }
});

module.exports = router; 