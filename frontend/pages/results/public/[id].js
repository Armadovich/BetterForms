import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import SurveyResultsChart from '../../../components/SurveyResultsChart';
import Footer from '../../../components/Footer';


  // Componente de carga mientras se obtienen los datos
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-white text-xl">Cargando resultados...</div>
  </div>
);

// Componente de error con navegación de vuelta al inicio
const ErrorPage = ({ error }) => (
  <div className="min-h-screen bg-gray-900 flex flex-col">
    <Head>
      <title>Error - Better Forms</title>
    </Head>
    
    {/* Header con navegación */}
    <header className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">Better Forms</Link>
      </div>
    </header>
    
    {/* Contenido principal con mensaje de error */}
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Icono de error */}
        <div className="text-red-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        
        {/* Botón para volver al inicio */}
        <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Volver al inicio
        </Link>
      </div>
    </main>
    
    <Footer />
  </div>
);

// Componente del header con navegación y botón para copiar el enlace de la encuesta
const PageHeader = ({ surveyId, onCopyLink }) => (
  <header className="bg-indigo-600 shadow-lg">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <Link href="/" className="text-3xl font-bold text-white">Better Forms</Link>
      
      {/* Botón para copiar el enlace de la encuesta */}
      <div className="flex items-center space-x-4">
        <button
          id="copy-button"
          onClick={onCopyLink}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100"
        >
          Copiar enlace
        </button>
        <Link
          href={`/survey/${surveyId}`}
          target="_blank"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900"
        >
          Responder encuesta
        </Link>
      </div>
    </div>
  </header>
);

// Componente de información general de la encuesta
const SurveyInfo = ({ survey, chartType, onChartTypeChange }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-white mb-4">{survey.title}</h1>
    
    {/* Descripción de la encuesta*/}
    {survey.description && (
      <p className="text-gray-400 text-lg mb-4">{survey.description}</p>
    )}
    
    {/* Estadísticas básicas de la encuesta */}
    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
      <span>Preguntas: {survey.questions.length}</span>
    </div>
    
    {/* Selector de tipo de gráfico (barras o sector circular) */}
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-300">
        Tipo de gráfico:
      </label>
      <select
        value={chartType}
        onChange={(e) => onChartTypeChange(e.target.value)}
        className="px-3 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white text-sm"
      >
        <option value="bar">Gráfico de barras</option>
        <option value="doughnut">Gráfico de sectores</option>
      </select>
    </div>
  </div>
);

// Componente de una pregunta individual con su gráfico
const QuestionCard = ({ question, index, chartType }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-xl font-semibold text-white mb-6">
      {index + 1}. {question.text}
    </h3>
    
    {/* Componente de gráfico que muestra los resultados de la pregunta */}
    <SurveyResultsChart
      question={question}
      chartType={chartType}
    />
  </div>
);

// Hook personalizado para gestionar la conexión WebSocket
const useWebSocket = (surveyId, onNewResponse) => {
  useEffect(() => {
    if (!surveyId) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    
    // Cuando se conecta, se une a la sala de la encuesta
    socket.on('connect', () => {
      socket.emit('join-survey', surveyId);
    });
    
    // Escucha nuevas respuestas y ejecuta el callback
    socket.on('newResponse', onNewResponse);
    
    // Desconectar socket al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [surveyId, onNewResponse]);
};

// Hook personalizado para gestionar los datos de la encuesta
const useSurveyData = (surveyId) => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching survey data for ID:', surveyId);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const surveyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surveys/${surveyId}/public-results`);
      
      console.log('Response status:', surveyResponse.status);
      
      if (!surveyResponse.ok) {
        throw new Error('Encuesta no encontrada');
      }
      
      const surveyData = await surveyResponse.json();
      setSurvey(surveyData);
    } catch (err) {
      console.error('Error fetching survey:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (surveyId) {
      fetchData();
    }
  }, [surveyId]);

  return { survey, loading, error, refetch: fetchData };
};

// Página de resultados públicos de una encuesta
export default function PublicResults() {
  console.log('PublicResults component is loading...');
  
  const router = useRouter();
  const { id } = router.query; // ID de la encuesta desde la URL
  
  console.log('Survey ID from router:', id);
  
  // Estados para gestionar la información de la encuesta y la interfaz
  const [chartType, setChartType] = useState('bar'); // Tipo de gráfico por defecto
  
  // Hook personalizado para gestionar los datos de la encuesta
  const { survey, loading, error, refetch } = useSurveyData(id);
  
  // Hook personalizado para gestionar WebSocket
  useWebSocket(id, refetch);

  // Copia el enlace de la encuesta al portapapeles
  const copySurveyLink = () => {
    const surveyUrl = `${window.location.origin}/survey/${id}`;
    
    navigator.clipboard.writeText(surveyUrl).then(() => {
      const button = document.getElementById('copy-button');
      if (button) {
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        
        // Restaura el texto original después de 2 segundos
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  };

  // Carga mientras se obtienen los datos
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error si algo falla
  if (error) {
    return <ErrorPage error={error} />;
  }

  // Componente principal con los resultados de la encuesta
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>Resultados: {survey?.title} - Better Forms</title>
      </Head>
      
      {/* Header con navegación y botón para copiar el enlace de la encuesta */}
      <PageHeader surveyId={id} onCopyLink={copySurveyLink} />
      
      {/* Contenido principal con información de la encuesta y resultados de la encuesta */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Información general de la encuesta y selector de tipo de gráfico */}
          <SurveyInfo 
            survey={survey} 
            chartType={chartType} 
            onChartTypeChange={setChartType} 
          />
          
          {/* Lista de preguntas con sus gráficos de resultados */}
          <div className="space-y-8">
            {survey.questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                question={question}
                index={index}
                chartType={chartType}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 