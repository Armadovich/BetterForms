import { useState, useEffect } from 'react';

// Hook personalizado para gestionar la encuesta
export const useSurvey = (surveyId) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSurvey = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surveys/${surveyId}/public`);
      
      if (!response.ok) {
        throw new Error('Error al cargar la encuesta');
      }

      const data = await response.json();
      setSurvey(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (surveyId) {
      fetchSurvey();
    }
  }, [surveyId]);

  return { survey, loading, error, refetch: fetchSurvey };
}; 