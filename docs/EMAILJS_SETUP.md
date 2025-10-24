# Configuración de EmailJS para Clean Solutions

## Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)

## Paso 2: Configurar un Servicio de Email

1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Configura tu cuenta de email:
   - Para Gmail: Necesitarás generar una contraseña de aplicación
   - Para Outlook: Usa tu contraseña normal
5. Guarda el Service ID (lo necesitarás para el .env)

## Paso 3: Crear un Template de Email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa el siguiente template:

### Template de Email

**Subject:** Nueva Solicitud de Contacto - {{service}}

**Content:**
```html
<h2>Nueva Solicitud de Contacto - Clean Solutions</h2>

<p><strong>Datos del Cliente:</strong></p>
<ul>
  <li><strong>Nombre:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Teléfono:</strong> {{phone}}</li>
  <li><strong>Servicio Solicitado:</strong> {{service}}</li>
</ul>

<p><strong>Mensaje:</strong></p>
<p>{{message}}</p>

<hr>
<p><small>Este mensaje fue enviado desde el formulario de contacto de cleansolutions.com</small></p>
```

**To Email:** contacto@cleansolutions.com (o tu email)
**From Name:** {{from_name}}
**Reply To:** {{reply_to}}

4. Guarda el template y copia el Template ID

## Paso 4: Obtener tu Public Key

1. Ve a "Account" > "API Keys"
2. Copia tu Public Key

## Paso 5: Configurar las Variables de Entorno

Actualiza tu archivo `.env.local` con los valores obtenidos:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx

# Email Destination
VITE_EMAIL_TO=contacto@cleansolutions.com
```

## Paso 6: Probar el Formulario

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Completa el formulario de contacto
3. Verifica que el email llegue correctamente

## Notas Importantes

- **Límite Gratuito:** EmailJS permite 200 emails/mes en el plan gratuito
- **Seguridad:** Las credenciales son públicas (se ejecutan en el cliente), pero EmailJS tiene protección contra spam
- **Alternativa:** Si necesitas más seguridad o más emails, considera usar Supabase Edge Functions con Resend

## Solución de Problemas

### El email no se envía
- Verifica que todas las variables de entorno estén configuradas correctamente
- Revisa la consola del navegador para ver errores
- Verifica tu quota de emails en EmailJS

### Error de CORS
- EmailJS maneja CORS automáticamente, pero asegúrate de estar usando el dominio correcto en producción

### Email llega a spam
- Configura SPF/DKIM en tu dominio
- Usa una dirección de email verificada como remitente