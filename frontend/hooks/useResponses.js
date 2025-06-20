import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Hook para inicializar respuestas vacías según el tipo de pregunta
const useInitialResponses = (survey) => {
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (survey) {
      const initialResponses = {};
      survey.questions.forEach(q => {
        if (q.type === 'multiple') {
          initialResponses[q._id] = []; // Array para selección múltiple (checkboxes)
        } else if (q.type === 'single') {
          initialResponses[q._id] = ''; // String para selección única (radio buttons)
        }
      });
      setResponses(initialResponses);
    }
  }, [survey]);

  return { responses, setResponses };
};

// Hook para manejar cambios en las respuestas
const useResponseChanges = (responses, setResponses) => {
  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  return { handleResponseChange };
};

// Función auxiliar para emitir evento Socket.IO
const emitSocketEvent = async (surveyId, responses) => {
  const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const socket = io(socketUrl);
  
  socket.emit('submit-response', {
    surveyId,
    answers: Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer
    }))
  });
  
  socket.disconnect();
};

// Hook para enviar respuestas al backend
const useSubmitResponses = (responses, setResponses) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitResponses = async (surveyId) => {
    setSubmitting(true);
    
    try {
      // Enviar respuestas al backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyId,
          answers: Object.entries(responses).map(([questionId, answer]) => ({
            questionId,
            answer
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar la respuesta');
      }

      setSubmitted(true);
      setResponses({});

      // Emitir evento Socket.IO para actualización en tiempo real
      await emitSocketEvent(surveyId, responses);
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitted, submitResponses };
};

// Hook principal que combina todos los hooks de respuestas
export const useResponses = (survey) => {
  const { responses, setResponses } = useInitialResponses(survey);
  const { handleResponseChange } = useResponseChanges(responses, setResponses);
  const { submitting, submitted, submitResponses } = useSubmitResponses(responses, setResponses);

  return {
    responses,
    submitting,
    submitted,
    handleResponseChange,
    submitResponses
  };
}; 