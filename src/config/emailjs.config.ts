// Configuración ESTÁTICA de EmailJS - NO SE PIERDE AL REINICIAR
// IMPORTANTE: Reemplaza 'TU_CLAVE_PUBLICA_AQUI' con tu clave pública real de EmailJS

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_d5sjpv8',
  TEMPLATE_ID: 'template_d5sjpv8',
  PUBLIC_KEY: 'TU_CLAVE_PUBLICA_AQUI', // ← CAMBIAR POR TU CLAVE REAL
  EMAIL_TO: 'contacto@cleansolutions.cl'
};

// Esta función usa las variables estáticas directamente
// No depende de variables de entorno que se puedan perder
export function getEmailConfig() {
  return {
    serviceId: EMAILJS_CONFIG.SERVICE_ID,
    templateId: EMAILJS_CONFIG.TEMPLATE_ID,
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
    emailTo: EMAILJS_CONFIG.EMAIL_TO
  };
}
