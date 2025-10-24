import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, from, subject, data } = await req.json()

    // Obtener la API key de Resend desde las variables de entorno
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada en las variables de entorno')
      throw new Error('Servicio de email no configurado. Por favor, contacta al administrador.')
    }

    // Preparar el contenido HTML del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #10b981; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
          .message-box { background-color: white; padding: 15px; border-left: 3px solid #10b981; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nueva Solicitud de Contacto</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Teléfono:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
              <div class="label">Servicio solicitado:</div>
              <div class="value">${data.service}</div>
            </div>
            <div class="message-box">
              <div class="label">Mensaje:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <small style="color: #888;">Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</small>
          </div>
        </div>
      </body>
      </html>
    `

    // Enviar email usando Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // IMPORTANTE: Cambiar 'onboarding@resend.dev' por tu dominio cuando lo verifiques
        // Por ejemplo: 'noreply@cleansolutions.cl' o 'contacto@cleansolutions.cl'
        from: 'Formulario Web <onboarding@resend.dev>', 
        to: [to || 'contacto@cleansolutions.cl'],
        subject: subject || `Nueva solicitud de contacto - ${data.service}`,
        html: htmlContent,
        reply_to: data.email, // El cliente puede responder directamente
      }),
    })

    const resData = await res.json()
    
    if (!res.ok) {
      throw new Error(`Error enviando email: ${JSON.stringify(resData)}`)
    }

    return new Response(
      JSON.stringify({ success: true, data: resData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})