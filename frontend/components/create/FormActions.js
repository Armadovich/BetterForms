import Link from 'next/link';

// Componente para los botones de acción del formulario
export const FormActions = ({ loading }) => {
  return (
    <div className="flex justify-end space-x-4">
      {/* Botón de cancelar */}
      <Link
        href="/dashboard"
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        Cancelar
      </Link>
      
      {/* Botón de crear encuesta */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando...' : 'Crear Encuesta'}
      </button>
    </div>
  );
}; 