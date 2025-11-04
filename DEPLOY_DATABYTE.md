# Guía de Despliegue a Databyte Hosting

## ✅ Estado del Proyecto - LISTO PARA DESPLEGAR

El proyecto está completamente listo para ser desplegado en Databyte. El directorio `dist` ha sido actualizado con la última compilación.

## 📁 Archivos a Subir

### Directorio Principal: `dist/`
Todo el contenido del directorio `dist` debe ser subido a la raíz del hosting:

```
dist/
├── assets/              # Archivos JS y CSS compilados
├── .htaccess           # Configuración Apache (importante)
├── _redirects          # Configuración de redirecciones
├── index.html          # Archivo principal
├── manifest.json       # PWA manifest
├── robots.txt          # SEO robots
├── sitemap.xml         # Mapa del sitio
├── favicon files       # Todos los íconos y favicons
└── otros archivos      # Logos y archivos estáticos
```

## 🚀 Pasos para el Despliegue

### 1. Preparar los Archivos
```bash
# El proyecto ya está compilado, pero si necesitas recompilar:
npm run build
```

### 2. Subir al Hosting Databyte

#### Opción A: Via FTP/SFTP
1. Conecta al servidor Databyte usando tu cliente FTP preferido
2. Navega al directorio público (generalmente `public_html` o `www`)
3. Sube TODO el contenido de la carpeta `dist/` (no la carpeta en sí)
4. Asegúrate de que `.htaccess` se suba correctamente

#### Opción B: Via Panel de Control (cPanel/Plesk)
1. Accede al panel de control de Databyte
2. Usa el Administrador de Archivos
3. Navega al directorio público
4. Sube los archivos del directorio `dist/`

### 3. Configuración del Servidor

#### Configuración Apache
El archivo `.htaccess` ya incluye:
- ✅ Redirección a HTTPS
- ✅ Forzar www
- ✅ Manejo de rutas SPA (React Router)
- ✅ Headers de seguridad
- ✅ Compresión GZIP
- ✅ Cache del navegador
- ✅ Bloqueo de bots maliciosos

#### Permisos de Archivos
```bash
# Directorios: 755
# Archivos: 644
# .htaccess: 644
```

### 4. Variables de Entorno

⚠️ **IMPORTANTE**: Las variables de entorno ya están compiladas en el build. Si necesitas cambiarlas:

1. Crea/edita el archivo `.env` local con las variables correctas
2. Recompila el proyecto: `npm run build`
3. Vuelve a subir los archivos

Variables actuales en `.env.example`:
- `VITE_SUPABASE_URL` - URL de Supabase (opcional)
- `VITE_SUPABASE_ANON_KEY` - Clave de Supabase (opcional)
- `VITE_EMAILJS_SERVICE_ID` - EmailJS Service ID
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS Template ID
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS Public Key
- `VITE_EMAIL_TO` - Email de destino
- `VITE_EMAIL_FROM` - Email de origen

### 5. Configuración DNS (si es necesario)

Si estás configurando un dominio personalizado:
```
Tipo A: @ -> IP del servidor Databyte
Tipo A: www -> IP del servidor Databyte
```

### 6. SSL/HTTPS

- Activa SSL en el panel de Databyte
- Let's Encrypt generalmente está disponible
- El `.htaccess` ya fuerza HTTPS automáticamente

## 🔍 Verificación Post-Despliegue

1. **Acceso al sitio**: Verifica que el sitio carga correctamente
2. **HTTPS**: Confirma que redirige a HTTPS
3. **Formulario de contacto**: Prueba el envío de emails
4. **Navegación**: Verifica que todas las páginas cargan
5. **Recursos**: Confirma que CSS, JS e imágenes cargan correctamente
6. **Responsive**: Prueba en móvil y desktop
7. **SEO**: Verifica robots.txt y sitemap.xml accesibles

## 📋 Checklist de Archivos Importantes

- [x] `index.html` - Página principal con meta tags SEO
- [x] `.htaccess` - Configuración del servidor
- [x] `manifest.json` - PWA configuration
- [x] `robots.txt` - Control de crawlers
- [x] `sitemap.xml` - Mapa del sitio para SEO
- [x] `_redirects` - Redirecciones para SPA
- [x] Favicons e íconos - Todos los tamaños necesarios
- [x] Assets compilados - JS y CSS optimizados

## 🆘 Solución de Problemas

### Página en blanco
- Verifica que `.htaccess` esté presente
- Confirma que los archivos JS/CSS están cargando (F12 > Network)

### Error 404 en rutas
- Asegúrate de que `.htaccess` tiene las reglas de rewrite para SPA

### Formulario no funciona
- Verifica las variables de EmailJS en el build
- Confirma que el dominio está en la whitelist de EmailJS

### Problemas de HTTPS
- Activa SSL en el panel de Databyte
- Espera propagación DNS (hasta 48h)

## 📞 Soporte

Si necesitas ayuda adicional:
1. Revisa los logs del servidor en el panel de Databyte
2. Contacta al soporte de Databyte con el error específico
3. Verifica la consola del navegador (F12) para errores JavaScript

---

**Última actualización del build**: 3 de noviembre de 2025, 14:32
**Versión**: 0.0.0
**Estado**: ✅ LISTO PARA PRODUCCIÓN