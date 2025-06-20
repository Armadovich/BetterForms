import { useState, useEffect } from 'react';

// Hook personalizado para gestionar las encuestas del usuario
export const useSurveys = (user) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingSurvey, setDeletingSurvey] = useState(null);

  // Cargar las encuestas del usuario desde el backend
  const fetchSurveys = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surveys/my-surveys`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar las encuestas');
      }

      const data = await response.json();
      setSurveys(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una encuesta específica
  const deleteSurvey = async (surveyId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta encuesta? Esta acción no se puede deshacer.')) {
      return;
    }

    setDeletingSurvey(surveyId);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surveys/${surveyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la encuesta');
      }

      setSurveys(surveys.filter(survey => survey._id !== surveyId));
    } catch (err) {
      alert('Error al eliminar la encuesta: ' + err.message);
    } finally {
      setDeletingSurvey(null);
    }
  };

  // Cargar encuestas cuando el usuario esté disponible
  useEffect(() => {
    if (user) {
      fetchSurveys();
    }
  }, [user]);

  return {
    surveys,
    loading,
    error,
    deletingSurvey,
    deleteSurvey,
    refetch: fetchSurveys
  };
}; 