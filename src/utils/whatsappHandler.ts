/**
 * Utilidad para manejar los enlaces de WhatsApp con detección robusta de dispositivo
 * y comportamiento optimizado para desktop/PC
 */

interface WhatsAppConfig {
  phoneNumber: string;
  message?: string;
}

/**
 * Detecta si el dispositivo es móvil o desktop con múltiples verificaciones
 */
export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const vendor = (navigator as any).vendor?.toLowerCase() || '';
  const opera = (window as any).opera;
  
  // Detección exhaustiva de dispositivos móviles
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|palm|windows phone|kindle|silk|playbook|bb10|rim/i;
  const isMobile = mobileRegex.test(userAgent) || mobileRegex.test(vendor) || !!opera;
  
  // Verificación adicional por tamaño de pantalla y capacidades táctiles
  const hasTouchScreen = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         ((navigator as any).msMaxTouchPoints > 0);
  
  // Verificación de ancho de pantalla (considerando tablets como móviles)
  const isSmallScreen = window.innerWidth <= 1024;
  
  // Verificación de características específicas de desktop
  const hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesktopBrowser = /windows nt|macintosh|mac os x|linux/i.test(userAgent) && !hasTouchScreen;
  
  // Detección específica para navegadores de escritorio
  const isChrome = /chrome/i.test(userAgent) && !/android/i.test(userAgent);
  const isFirefox = /firefox/i.test(userAgent) && !/mobile/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/mobile/i.test(userAgent) && /apple/i.test(vendor);
  const isEdge = /edg/i.test(userAgent) && !/mobile/i.test(userAgent);
  const isDesktopSpecificBrowser = isChrome || isFirefox || isSafari || isEdge;
  
  // Decisión final: es desktop si tiene características de desktop Y no es móvil
  const isDesktop = (hasMouseSupport || isDesktopBrowser || isDesktopSpecificBrowser) && 
                    !isMobile && 
                    !isSmallScreen;
  
  return {
    isMobile: !isDesktop,
    isDesktop,
    userAgent,
    hasTouchScreen,
    screenWidth: window.innerWidth,
    hasMouseSupport
  };
};

/**
 * Genera la URL correcta de WhatsApp según el dispositivo
 */
export const generateWhatsAppUrl = (config: WhatsAppConfig): string => {
  const { phoneNumber, message = '' } = config;
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(message);
  const device = detectDevice();
  
  if (device.isDesktop) {
    // Para desktop, usar web.whatsapp.com directamente
    // Esto abre WhatsApp Web sin pantallas intermedias
    return `https://web.whatsapp.com/send?phone=${cleanPhone}${message ? `&text=${encodedMessage}` : ''}`;
  } else {
    // Para móvil, usar wa.me que funciona mejor con la app nativa
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
  }
};

/**
 * Maneja el click en enlaces de WhatsApp con comportamiento optimizado
 */
export const handleWhatsAppClick = (
  event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  config: WhatsAppConfig
): void => {
  const device = detectDevice();
  
  if (device.isDesktop) {
    // En desktop, prevenir COMPLETAMENTE el comportamiento por defecto
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    
    // Generar URL de WhatsApp Web directamente
    const url = generateWhatsAppUrl(config);
    
    // Abrir WhatsApp Web en la MISMA ventana para evitar popups y ventanas múltiples
    // Esto garantiza que solo se abra una vez
    window.location.href = url;
    
    // Retornar false para asegurar que no se procese más el evento
    return;
  }
  // En móvil, dejar que el enlace funcione nativamente (no prevenir default)
};

/**
 * Hook personalizado para manejar WhatsApp
 */
export const useWhatsApp = (defaultPhone: string = '56950293803', defaultMessage?: string) => {
  const device = detectDevice();
  
  const openWhatsApp = (message?: string) => {
    const config: WhatsAppConfig = {
      phoneNumber: defaultPhone,
      message: message || defaultMessage
    };
    
    const url = generateWhatsAppUrl(config);
    
    if (device.isDesktop) {
      // Abrir directamente en nueva pestaña para desktop
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Para móvil, usar location.href para garantizar que se abra la app
      window.location.href = url;
    }
  };
  
  const getWhatsAppUrl = (message?: string) => {
    return generateWhatsAppUrl({
      phoneNumber: defaultPhone,
      message: message || defaultMessage
    });
  };
  
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, message?: string) => {
    handleWhatsAppClick(event, {
      phoneNumber: defaultPhone,
      message: message || defaultMessage
    });
  };
  
  return {
    openWhatsApp,
    getWhatsAppUrl,
    handleClick,
    device
  };
};

// Exportar configuración por defecto
export const WHATSAPP_CONFIG = {
  DEFAULT_PHONE: '56950293803',
  DEFAULT_MESSAGE: 'Hola, me gustaría solicitar información sobre los servicios de limpieza'
};