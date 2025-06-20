import ErrorPage from '../components/ErrorPage';

export default function Custom500() {
  return (
    <ErrorPage
      title="500 - Error del servidor"
      message="Lo sentimos, ha ocurrido un error en el servidor. Estamos trabajando para solucionarlo."
      icon={
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      }
      iconColor="text-red-600"
      bgColor="bg-red-100"
    />
  );
} 