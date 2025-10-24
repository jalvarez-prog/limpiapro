# Configuración de EmailJS para Clean Solutions

## Estado Actual
Ya tienes las credenciales configuradas en tu archivo `.env`:
- Service ID: `service_w4z6mr5`
- Template ID: `template_d5sjpv8`
- Public Key: `rA5ppREqKXyYRVZmF`

## Pasos para Verificar/Completar la Configuración

### 1. Verificar el Servicio de Email
1. Ingresa a [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Ve a la sección "Email Services"
3. Verifica que tengas un servicio con ID `service_w4z6mr5`
4. Si no existe, créalo y conecta tu cuenta de email (Gmail, Outlook, etc.)

### 2. Configurar la Plantilla de Email
1. En el dashboard, ve a "Email Templates"
2. Busca la plantilla con ID `template_d5sjpv8`
3. Si no existe, créala con ese ID exacto
4. En la configuración de la plantilla:

#### Configuración de Campos:
- **To Email**: `{{to_email}}` (o puedes poner directamente `contacto@cleansolutions.cl`)
- **From Name**: `{{from_name}}`
- **Reply To**: `{{reply_to}}`
- **Subject**: `Nueva Solicitud - {{service}} - Clean Solutions`

#### Contenido del Email:
Copia el contenido HTML del archivo `emailjs-template-example.html` que se creó en tu proyecto.

### 3. Variables de la Plantilla
El código envía estas variables (deben coincidir en la plantilla):
- `{{to_email}}` - Correo destino (contacto@cleansolutions.cl)
- `{{from_name}}` - Nombre del cliente
- `{{from_email}}` - Email del cliente
- `{{phone}}` - Teléfono del cliente
- `{{service}}` - Servicio seleccionado
- `{{message}}` - Mensaje del cliente
- `{{reply_to}}` - Email para responder (mismo que from_email)

### 4. Probar el Formulario
1. Inicia tu aplicación: `npm run dev`
2. Ve a la sección de Contacto
3. Completa el formulario con datos de prueba
4. Envía el formulario
5. Verifica que llegue el email a `contacto@cleansolutions.cl`

## Solución de Problemas

### Si el email no llega:
1. **Verifica el límite de EmailJS**: La cuenta gratuita permite 200 emails/mes
2. **Revisa la consola del navegador**: Busca errores en la consola (F12)
3. **Verifica el Service ID**: Debe coincidir exactamente
4. **Verifica el Template ID**: Debe coincidir exactamente
5. **Revisa los logs en EmailJS**: Dashboard > Email History

### Si recibes error 401:
- La Public Key no es correcta o el servicio no está activo

### Si recibes error 422:
- Los parámetros de la plantilla no coinciden con lo que envía el código

## Configuración Alternativa (Sin EmailJS)

Si EmailJS no funciona, el sistema tiene fallbacks automáticos:
1. **Supabase**: Si está configurado, guarda en base de datos
2. **Mailto**: Abre el cliente de correo del usuario con los datos pre-llenados

## Notas Importantes
- EmailJS gratuito tiene límite de 200 emails/mes
- Los emails pueden tardar unos segundos en llegar
- Revisa la carpeta de spam si no llega el email
- El correo `contacto@cleansolutions.cl` debe existir y estar activo