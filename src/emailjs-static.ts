// CONFIGURACIÓN ESTÁTICA DE EMAILJS
// Estos valores quedan fijos en el código compilado y NO se pierden

import emailjs from '@emailjs/browser';

// Clave pública de EmailJS (configurada)
const EMAILJS_PUBLIC_KEY = 'rA5ppREqKXyYRVZmF';

// Valores fijos que no cambian
const EMAILJS_SERVICE_ID = 'service_w4z6mr5';
const EMAILJS_TEMPLATE_ID = 'template_d5sjpv8';

// Variable para rastrear si ya se inicializó
let isInitialized = false;

// Función para asegurar que EmailJS esté inicializado
function ensureEmailJSInitialized() {
  if (!isInitialized) {
    try {
      // Inicializar con opciones específicas para mejor compatibilidad
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        // Desactivar bloqueo de headless browsers que puede causar falsos positivos
        blockHeadless: false,
        // Limitar intentos para evitar rate limiting
        limitRate: {
          throttle: 10000, // 10 segundos entre envíos
        }
      });
      isInitialized = true;
      console.log('EmailJS inicializado correctamente');
    } catch (initError) {
      console.error('Error al inicializar EmailJS:', initError);
      // Intentar inicialización simple como fallback
      emailjs.init(EMAILJS_PUBLIC_KEY);
      isInitialized = true;
    }
  }
}

// Función para enviar email
export async function sendContactEmail(formData: any) {
  try {
    // Asegurar que EmailJS esté inicializado antes de enviar
    ensureEmailJSInitialized();
    
    // Validar datos antes de enviar
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      console.error('Faltan datos requeridos en el formulario');
      return false;
    }
    
    // Preparar parámetros con valores limpios
    const templateParams = {
      to_email: 'contacto@cleansolutions.cl',
      from_name: String(formData.name).trim(),
      from_email: String(formData.email).trim(),
      phone: String(formData.phone).trim(),
      service: String(formData.service).trim(),
      message: String(formData.message).trim(),
      reply_to: String(formData.email).trim(),
      // Agregar metadata adicional para debugging
      sent_from: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    };

    console.log('Enviando email con parámetros:', {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      params: templateParams
    });

    // Intentar envío con diferentes métodos
    let response;
    
    try {
      // Método 1: Con public key como parámetro
      response = await emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch (firstAttemptError) {
      console.warn('Primer intento falló, intentando método alternativo:', firstAttemptError);
      
      // Método 2: Sin public key como parámetro (usa la inicialización)
      response = await emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        templateParams
      );
    }
    
    console.log('Respuesta de EmailJS:', response);
    return response.status === 200;
  } catch (error: any) {
    console.error('Error detallado al enviar email:', error);
    
    // Log más detallado del error
    if (error && typeof error === 'object') {
      console.error('Detalles del error:', {
        status: error.status,
        text: error.text,
        message: error.message,
        stack: error.stack
      });
    }
    
    // Si es un error 400, probablemente hay un problema con los parámetros del template
    if (error?.status === 400) {
      console.error('Error 400: Verifica que los parámetros del template coincidan con los configurados en EmailJS');
    }
    
    return false;
  }
}
