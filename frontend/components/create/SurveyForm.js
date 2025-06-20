import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { BasicInfoSection } from './BasicInfoSection';
import { QuestionsSection } from './QuestionsSection';
import { FormActions } from './FormActions';

// Componente principal del formulario de creación de encuestas
export const SurveyForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado inicial del formulario con una pregunta por defecto
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [
      {
        text: '',
        type: 'single',
        options: [
          { text: '' },
          { text: '' }
        ]
      }
    ]
  });

  // Añadir una nueva pregunta al formulario
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: '',
          type: 'single',
          options: [
            { text: '' },
            { text: '' }
          ]
        }
      ]
    }));
  };

  // Eliminar una pregunta específica
  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  // Actualizar un campo específico de una pregunta
  const updateQuestion = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  // Añadir una nueva opción a una pregunta específica
  const addOption = (questionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { ...q, options: [...q.options, { text: '' }] }
          : q
      )
    }));
  };

  // Eliminar una opción específica (mínimo 2 opciones)
  const removeOption = (questionIndex, optionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? { 
              ...q, 
              options: q.options.filter((_, j) => j !== optionIndex)
            }
          : q
      )
    }));
  };

  // Actualizar el texto de una opción específica
  const updateOption = (questionIndex, optionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex 
          ? {
              ...q,
              options: q.options.map((opt, j) => 
                j === optionIndex ? { ...opt, text: value } : opt
              )
            }
          : q
      )
    }));
  };

  // Enviar el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar que cada pregunta tenga al menos 2 opciones válidas
    const hasValidOptions = formData.questions.every(q => 
      q.options.filter(opt => opt.text.trim()).length >= 2
    );

    if (!hasValidOptions) {
      setError('Cada pregunta debe tener al menos 2 opciones válidas');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          questions: formData.questions.map(q => ({
            ...q,
            options: q.options.filter(opt => opt.text.trim())
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la encuesta');
      }

      const data = await response.json();
      router.push(`/survey/${data._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si el usuario no está autenticado
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sección de información básica de la encuesta */}
      <BasicInfoSection 
        formData={formData} 
        setFormData={setFormData} 
      />

      {/* Sección de preguntas y opciones */}
      <QuestionsSection
        formData={formData}
        addQuestion={addQuestion}
        removeQuestion={removeQuestion}
        updateQuestion={updateQuestion}
        addOption={addOption}
        removeOption={removeOption}
        updateOption={updateOption}
      />

      {/* Botones de acción */}
      <FormActions loading={loading} />
    </form>
  );
}; 