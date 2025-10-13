// Bloquear la carga automática de Google Translate
// Este script previene que extensiones del navegador inyecten Google Translate

(function() {
  // Interceptar y bloquear intentos de cargar Google Translate
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    // Bloquear scripts de Google Translate
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && value && value.includes('translate.google')) {
          console.log('Bloqueado intento de cargar Google Translate:', value);
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };
  
  // Bloquear el objeto googletrans si existe
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'google', {
      get: function() {
        return undefined;
      },
      set: function() {
        console.log('Bloqueado intento de definir objeto google');
      }
    });
  }
})();