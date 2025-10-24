import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key only if it's not a placeholder
const emailjsKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailjsKey && emailjsKey !== 'your_public_key' && emailjsKey.length > 10) {
  emailjs.init(emailjsKey);
}

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validar que las variables de entorno estén configuradas correctamente
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here' || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('Supabase credentials not properly configured. Contact form will use fallback method.');
}

// Crear cliente de Supabase solo si está correctamente configurado
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here' && supabaseAnonKey !== 'your_supabase_anon_key_here'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Tipo para los datos del formulario
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at?: string;
}

// Función para enviar solicitud de contacto
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Si Supabase está configurado, intentar guardar en la base de datos
    if (supabase) {
      const { error } = await supabase
        .from('contact_requests')
        .insert([
          {
            ...formData,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.error('Error saving to Supabase:', error);
        // Si hay error, continuar con el método alternativo
      } else {
        // Si se guardó correctamente, intentar enviar email mediante Edge Function (opcional)
        // Nota: La Edge Function es opcional y puede no estar configurada
        try {
          const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
            body: {
              to: import.meta.env.VITE_EMAIL_TO || 'contacto@cleansolutions.com',
              from: formData.email,
              subject: `Nueva solicitud de contacto - ${formData.service}`,
              data: formData
            }
          });

          if (emailError) {
            // Silenciosamente ignorar si la Edge Function no existe
            // Los datos ya se guardaron exitosamente en la base de datos
          }
        } catch (emailErr) {
          // La Edge Function es opcional, no es un error crítico
        }

        return {
          success: true,
          message: 'Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.'
        };
      }
    }

    // Método alternativo: Enviar por EmailJS o mailto
    return await sendViaAlternativeMethod(formData);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.'
    };
  }
}

// Método alternativo usando EmailJS
async function sendViaAlternativeMethod(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Intentar usar EmailJS si está configurado correctamente
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Verificar que no sean valores placeholder
    if (serviceId && templateId && publicKey && 
        serviceId !== 'your_service_id' && 
        templateId !== 'your_template_id' && 
        publicKey !== 'your_public_key') {
      try {
        // Preparar los parámetros del template (deben coincidir con el template en EmailJS)
        const templateParams = {
          to_email: import.meta.env.VITE_EMAIL_TO || 'contacto@cleansolutions.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          reply_to: formData.email
        };

        // Enviar email (EmailJS ya fue inicializado con la publicKey)
        const response = await emailjs.send(serviceId, templateId, templateParams);
        
        if (response.status === 200) {
          return {
            success: true,
            message: 'Tu solicitud ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto.'
          };
        } else {
          console.error('EmailJS non-200 response:', response.status, response.text);
        }
      } catch (emailjsError) {
        console.error('EmailJS error:', emailjsError);
      }
    }

    // Si EmailJS no está disponible o falla, usar mailto como último recurso
    const mailtoLink = generateMailtoLink(formData);
    
    // Crear un enlace temporal y hacer clic en él
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      success: true,
      message: 'Se ha abierto tu cliente de correo para enviar la solicitud.'
    };
  } catch (error) {
    console.error('Error with alternative method:', error);
    return {
      success: false,
      message: 'No se pudo enviar la solicitud. Por favor, contacta directamente a contacto@cleansolutions.com'
    };
  }
}

// Generar enlace mailto con los datos del formulario
function generateMailtoLink(formData: ContactFormData): string {
  const to = import.meta.env.VITE_EMAIL_TO || 'contacto@cleansolutions.com';
  const subject = encodeURIComponent(`Nueva solicitud de contacto - ${formData.service}`);
  const body = encodeURIComponent(`
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Servicio: ${formData.service}

Mensaje:
${formData.message}
  `.trim());

  return `mailto:${to}?subject=${subject}&body=${body}`;
}