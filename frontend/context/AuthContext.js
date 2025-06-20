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