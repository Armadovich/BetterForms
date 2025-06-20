import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useSurveys } from '../hooks/useSurveys';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { SurveyCard } from '../components/dashboard/SurveyCard';
import { EmptyState } from '../components/dashboard/EmptyState';

// Página principal del dashboard donde el usuario gestiona sus encuestas
export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Hook para gestionar las encuestas del usuario
  const { surveys, loading, error, deletingSurvey, deleteSurvey } = useSurveys(user);

  // Función para cerrar sesión y redirigir al inicio
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Mostrar spinner de carga mientras se obtienen las encuestas
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Redirigir si el usuario no está autenticado
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Head>
        <title>Dashboard - Better Forms</title>
      </Head>

      {/* Header con navegación y botones de acción */}
      <DashboardHeader 
        userName={user?.name} 
        onLogout={handleLogout} 
      />

      {/* Contenido principal del dashboard */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alerta de error si existe */}
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Sección de encuestas del usuario */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Mis Encuestas</h2>
            
            {/* Mostrar estado vacío si no hay encuestas */}
            {surveys.length === 0 ? (
              <EmptyState />
            ) : (
              /* Grid de tarjetas de encuestas */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveys.map((survey) => (
                  <SurveyCard
                    key={survey._id}
                    survey={survey}
                    onDelete={deleteSurvey}
                    isDeleting={deletingSurvey === survey._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 