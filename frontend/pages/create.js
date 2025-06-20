import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { SurveyForm } from '../components/create/SurveyForm';
import { ErrorAlert } from '../components/create/ErrorAlert';

// Página principal para crear nuevas encuestas
export default function Create() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mostrar spinner de carga mientras se procesa
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Redirigir si el usuario no está autenticado
  if (!user) {
    return null; // La redirección se maneja en el componente SurveyForm
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>Crear encuesta | Better Forms</title>
      </Head>

      {/* Header con navegación */}
      <header className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-white">Better Forms</Link>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Título y descripción de la página */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Crear nueva encuesta
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Diseña tu encuesta y obtén respuestas en tiempo real.
              </p>
            </div>

            {/* Alerta de error si existe */}
            <ErrorAlert error={error} />

            {/* Formulario principal de creación de encuesta */}
            <SurveyForm />
          </div>
        </div>
      </main>
    </div>
  );
} 