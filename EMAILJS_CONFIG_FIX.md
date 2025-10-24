# Configuración de EmailJS - Corrección del Remitente

## El Problema
Los emails llegan pero aparece `contacto@cleansolutions.cl` como remitente en lugar de los datos del cliente.

## Solución en el Dashboard de EmailJS

### 1. Accede a tu plantilla en EmailJS
Ve a [dashboard.emailjs.com](https://dashboard.emailjs.com) y edita tu plantilla `template_d5sjpv8`

### 2. Configura los campos correctamente:

#### En la sección "Email Settings" de la plantilla:

**To Email (Destinatario):**
```
contacto@cleansolutions.cl
```
(O usa la variable `{{to_email}}`)

**From Name (Nombre del remitente):**
```
{{from_name}}
```

**From Email:**
⚠️ **IMPORTANTE**: EmailJS no permite cambiar el "From Email" por seguridad. Siempre será el email configurado en tu servicio.

**Reply To (Responder a):**
```
{{reply_to}}
```
👆 **ESTE ES EL CAMPO CLAVE** - Aquí debe ir el email del cliente para que cuando respondas, vaya a su correo.

### 3. En el contenido del email, incluye los datos del cliente:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* Estilos del email */
        .info-box {
            background: #f5f5f5;
            padding: 15px;
            border-left: 4px solid #14b8a6;
            margin: 20px 0;
        }
        .field {
            margin: 10px 0;
        }
        .label {
            font-weight: bold;
            color: #333;
        }
    </style>
</head>
<body>
    <h2>Nueva Solicitud de Contacto - Clean Solutions</h2>
    
    <div class="info-box">
        <h3>Datos del Cliente:</h3>
        <div class="field">
            <span class="label">Nombre:</span> {{from_name}}
        </div>
        <div class="field">
            <span class="label">Email:</span> {{from_email}}
        </div>
        <div class="field">
            <span class="label">Teléfono:</span> {{phone}}
        </div>
        <div class="field">
            <span class="label">Servicio:</span> {{service}}
        </div>
    </div>
    
    <div class="info-box">
        <h3>Mensaje:</h3>
        <p>{{message}}</p>
    </div>
    
    <hr>
    <p style="color: #666; font-size: 12px;">
        Para responder a este cliente, usa "Responder" en tu cliente de correo.<br>
        El email de respuesta se enviará a: <strong>{{reply_to}}</strong>
    </p>
</body>
</html>
```

### 4. Configuración del Asunto (Subject):
```
Nueva Solicitud - {{service}} - {{from_name}}
```

## Variables que envía el código:
- `to_email`: contacto@cleansolutions.cl
- `from_name`: Nombre del cliente
- `from_email`: Email del cliente
- `phone`: Teléfono del cliente
- `service`: Servicio seleccionado
- `message`: Mensaje del cliente
- `reply_to`: Email del cliente (igual que from_email)

## Alternativa: Incluir email en el asunto
Si quieres ver rápidamente quién envió el mensaje, puedes configurar el asunto como:
```
{{from_name}} ({{from_email}}) - Solicitud {{service}}
```

## Prueba la configuración:
1. Guarda los cambios en EmailJS
2. Envía un formulario de prueba desde tu sitio
3. Verifica que:
   - El email llegue a contacto@cleansolutions.cl
   - Los datos del cliente aparezcan en el contenido
   - Al hacer clic en "Responder", el destinatario sea el email del cliente

## Nota sobre la seguridad:
EmailJS no permite falsificar el remitente por razones de seguridad y para evitar que los emails sean marcados como spam. Por eso:
- El "From" siempre será tu cuenta configurada en el servicio
- El "Reply-To" debe ser el email del cliente
- Los datos del cliente deben aparecer en el contenido del mensaje