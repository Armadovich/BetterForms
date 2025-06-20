import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [surveyId, setSurveyId] = useState('');

  const handleViewResults = (e) => {
    e.preventDefault();
    if (surveyId.trim()) {
      window.open(`/results/public/${surveyId.trim()}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>Better Forms - Crea y comparte encuestas fácilmente</title>
        <meta name="description" content="Crea encuestas profesionales y obtén resultados en tiempo real con Better Forms" />
      </Head>

      {/* Header */}
      <header className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Better Forms</h1>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100">
              Iniciar sesión
            </Link>
            <Link href="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        {/* Sección principal */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Crea encuestas profesionales en minutos
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Better Forms te permite crear, compartir y analizar encuestas de manera fácil y rápida. 
              Obtén resultados en tiempo real y toma decisiones informadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Comenzar ahora
              </Link>
              <Link href="/login" className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </section>

        {/* Características principales */}
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Características principales
              </h3>
              <p className="text-lg text-gray-400">
                Todo lo que necesitas para crear encuestas efectivas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Fácil de crear</h4>
                <p className="text-gray-400">
                  Interfaz intuitiva para crear encuestas en pocos minutos.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Tiempo real</h4>
                <p className="text-gray-400">
                  Observa los resultados actualizarse en tiempo real mientras las personas responden.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Análisis visual</h4>
                <p className="text-gray-400">
                  Gráficos claros y visuales para entender mejor los resultados de tus encuestas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ver resultados de una encuesta */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Ya tienes una encuesta?
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Introduce la ID de la encuesta para ver los resultados.
            </p>
            
            <form onSubmit={handleViewResults} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={surveyId}
                  onChange={(e) => setSurveyId(e.target.value)}
                  placeholder="ID de la encuesta"
                  className="flex-1 px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Ver resultados
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 