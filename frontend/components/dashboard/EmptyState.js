import Link from 'next/link';

// Componente para mostrar cuando el usuario no tiene encuestas
export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      {/* Icono de encuesta vacía */}
      <div className="text-gray-400 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      
      {/* Mensaje de que no hay encuestas */}
      <h3 className="text-lg font-medium text-white mb-2">No tienes encuestas aún</h3>
      <p className="text-gray-400 mb-6">Crea tu primera encuesta para comenzar</p>
      
      {/* Botón para crear primera encuesta */}
      <Link 
        href="/create" 
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Crear mi primera encuesta
      </Link>
    </div>
  );
}; 