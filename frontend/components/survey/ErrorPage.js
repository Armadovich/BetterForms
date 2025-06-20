import Link from 'next/link';

// Componente de error con opciones de navegación
export const ErrorPage = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center max-w-md">
      <svg
        className="mx-auto h-12 w-12 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <h2 className="mt-4 text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
      
      <div className="space-y-3">
        <Link 
          href="/" 
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Volver al inicio
        </Link>
        
        <button 
          onClick={onRetry} 
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  </div>
); 