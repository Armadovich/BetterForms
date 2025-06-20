import Link from 'next/link';

// Componente para mostrar una encuesta individual en el dashboard
export const SurveyCard = ({ survey, onDelete, isDeleting }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header de la tarjeta con título */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white truncate">{survey.title}</h3>
      </div>
      
      {/* Descripción de la encuesta */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{survey.description}</p>
      
      {/* Fecha de creación */}
      <div className="text-sm text-gray-500 mb-4">
        <p>Creada: {new Date(survey.createdAt).toLocaleDateString()}</p>
      </div>
      
      {/* Botones de acción */}
      <div className="flex space-x-2">
        {/* Botón para ver la encuesta */}
        <Link
          href={`/survey/${survey._id}`}
          className="flex-1 text-center px-3 py-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-600 rounded-md hover:bg-indigo-900/20"
        >
          Ver
        </Link>
        
        {/* Botón para ver resultados */}
        <Link
          href={`/results/public/${survey._id}`}
          target="_blank"
          className="flex-1 text-center px-3 py-2 text-sm font-medium text-green-400 hover:text-green-300 border border-green-600 rounded-md hover:bg-green-900/20"
        >
          Resultados
        </Link>
        
        {/* Botón para eliminar encuesta */}
        <button
          onClick={() => onDelete(survey._id)}
          disabled={isDeleting}
          className="px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 border border-red-600 rounded-md hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? '...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}; 