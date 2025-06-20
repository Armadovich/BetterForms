import Link from 'next/link';

// Componente de confirmación de envío exitoso
export const SuccessPage = ({ surveyId }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center max-w-md">
      <svg
        className="mx-auto h-12 w-12 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">¡Gracias por tu respuesta!</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 mb-6">
        Tus respuestas han sido registradas correctamente.
      </p>
      
      <div className="space-y-3">
        <Link 
          href="/" 
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Volver al inicio
        </Link>
        
        <Link 
          href={`/results/public/${surveyId}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Ver resultados
        </Link>
      </div>
    </div>
  </div>
); 