import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token && storedUser !== 'undefined') {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error cargando usuario desde localStorage:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Limpiar datos de autenticación
  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // Registrar usuario
  const register = async (name, email, password) => {
    try {
      console.log('AuthContext: Iniciando registro...');
      console.log('AuthContext: API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('AuthContext: Response status:', response.status);
      
      const data = await response.json();
      console.log('AuthContext: Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse');
      }

      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      
      console.log('AuthContext: Usuario registrado y guardado');

      return data;
    } catch (error) {
      console.error('AuthContext: Error en registro:', error);
      throw error;
    }
  };

  // Iniciar sesión
  const login = (userData) => {
    if (userData && typeof userData === 'object') {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  // Cerrar sesión
  const logout = () => {
    clearAuthData();
    router.push('/login');
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return user !== null && localStorage.getItem('token') !== null;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
} 