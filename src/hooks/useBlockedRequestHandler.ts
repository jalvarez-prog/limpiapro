import { useEffect } from 'react';

export const useBlockedRequestHandler = () => {
  useEffect(() => {
    // Interceptar errores de consola para filtrar ERR_BLOCKED_BY_CLIENT
    const originalConsoleError = console.error;
    console.error = function(...args) {
      // Filtrar errores de Google Translate bloqueados
      const errorString = args.join(' ');
      if (errorString.includes('ERR_BLOCKED_BY_CLIENT') && 
          (errorString.includes('translate.googleapis.com') || 
           errorString.includes('translate.google'))) {
        // Silenciosamente ignorar estos errores
        return;
      }
      
      // Para otros errores, usar el console.error original
      originalConsoleError.apply(console, args);
    };

    // Manejar errores de red no capturados
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.toString().includes('ERR_BLOCKED_BY_CLIENT')) {
        event.preventDefault(); // Prevenir que el error aparezca en la consola
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

export default useBlockedRequestHandler;