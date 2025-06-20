import ErrorPage from '../components/ErrorPage';

export default function Custom404() {
  return (
    <ErrorPage
      title="404 - Página no encontrada"
      message="Lo sentimos, la página que estás buscando no existe o ha sido movida."
      icon={
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      }
      iconColor="text-indigo-600"
      bgColor="bg-indigo-100"
    />
  );
} 