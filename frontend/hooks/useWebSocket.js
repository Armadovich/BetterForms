import { useEffect } from 'react';
import { io } from 'socket.io-client';

// Hook personalizado para gestionar WebSocket
export const useWebSocket = (surveyId) => {
  useEffect(() => {
    if (!surveyId) return;

    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const socketInstance = io(socketUrl);
    
    // Unirse a la sala de la encuesta específica
    socketInstance.emit('join-survey', surveyId);

    // Cleanup al desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, [surveyId]);
}; 