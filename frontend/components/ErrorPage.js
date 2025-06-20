import Link from 'next/link';
import Head from 'next/head';

// Componente de error personalizable
const ErrorPage = ({ 
  title, 
  message, 
  icon, 
  iconColor = 'text-indigo-600', 
  bgColor = 'bg-indigo-100' 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Head>
        <title>{title} | Better Forms</title>
      </Head>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <div className={`inline-flex items-center justify-center h-16 w-16 rounded-full ${bgColor} ${iconColor} mb-6 mx-auto`}>
          {icon}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage; 