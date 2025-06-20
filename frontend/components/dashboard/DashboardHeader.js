import Link from 'next/link';

// Componente del header del dashboard con navegación y botones de acción
export const DashboardHeader = ({ userName, onLogout }) => {
  return (
    <header className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Título y saludo al usuario */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <span className="text-indigo-200">Bienvenido, {userName}</span>
        </div>
        
        {/* Botones de acción */}
        <div className="flex items-center space-x-4">
          {/* Botón para crear nueva encuesta */}
          <Link 
            href="/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100"
          >
            Crear Encuesta
          </Link>
          
          {/* Botón para cerrar sesión */}
          <button
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}; 