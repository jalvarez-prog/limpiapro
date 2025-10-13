import { useEffect } from 'react';

export const NoTranslate = () => {
  useEffect(() => {
    // Agregar meta tag para deshabilitar Google Translate
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);

    // También agregar el atributo translate="no" al elemento html
    document.documentElement.setAttribute('translate', 'no');
    
    return () => {
      // Limpiar al desmontar
      const existingMeta = document.querySelector('meta[name="google"][content="notranslate"]');
      if (existingMeta) {
        existingMeta.remove();
      }
    };
  }, []);

  return null;
};

export default NoTranslate;