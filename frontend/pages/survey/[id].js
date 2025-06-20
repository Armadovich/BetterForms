import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../../components/Footer';

// Hooks personalizados
import { useSurvey } from '../../hooks/useSurvey';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useResponses } from '../../hooks/useResponses';

// Componentes de UI
import { LoadingSpinner } from '../../components/survey/LoadingSpinner';
import { ErrorPage } from '../../components/survey/ErrorPage';
import { SuccessPage } from '../../components/survey/SuccessPage';
import { SurveyHeader } from '../../components/survey/SurveyHeader';
import { QuestionField } from '../../components/survey/QuestionField';

// Componente principal de respuesta a encuesta
export default function SurveyResponse() {
  const router = useRouter();
  const { id } = router.query;

  // Hooks personalizados
  const { survey, loading, error, refetch } = useSurvey(id);
  const { responses, submitting, submitted, handleResponseChange, submitResponses } = useResponses(survey);
  useWebSocket(id);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitResponses(id);
    } catch (err) {
      console.error('Error al enviar respuestas:', err);
    }
  };

  // Estados de carga y error
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} onRetry={refetch} />;
  if (submitted) return <SuccessPage surveyId={id} />;
  if (!survey) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{survey.title} | Better Forms</title>
      </Head>

      <SurveyHeader surveyId={id} />

      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{survey.title}</h1>
          {survey.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">{survey.description}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {survey.questions.map((question, index) => (
              <QuestionField
                key={question._id}
                question={question}
                index={index}
                value={responses[question._id]}
                onChange={handleResponseChange}
              />
            ))}

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {submitting ? 'Enviando...' : 'Enviar Respuestas'}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 