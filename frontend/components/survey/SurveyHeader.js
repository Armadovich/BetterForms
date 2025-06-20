import Link from 'next/link';

// Componente del header con navegación
export const SurveyHeader = ({ surveyId }) => (
  <header className="bg-indigo-600 shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Better Forms
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href={`/results/public/${surveyId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Ver resultados
          </Link>
        </div>
      </div>
    </div>
  </header>
); 