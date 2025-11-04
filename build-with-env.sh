#!/bin/bash
# Script para compilar con variables de entorno del hosting

# Configurar las variables de entorno antes de compilar
# Estas deben estar configuradas en tu servicio de hosting
export VITE_EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID:-"service_d5sjpv8"}
export VITE_EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID:-"template_d5sjpv8"}
export VITE_EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY:-"rA5ppREqKXyYRVZmF"}
export VITE_EMAIL_TO=${EMAIL_TO:-"contacto@cleansolutions.cl"}

# Compilar el proyecto
npm run build

echo "Build completado con las siguientes variables:"
echo "VITE_EMAILJS_SERVICE_ID: $VITE_EMAILJS_SERVICE_ID"
echo "VITE_EMAILJS_TEMPLATE_ID: $VITE_EMAILJS_TEMPLATE_ID"
echo "VITE_EMAIL_TO: $VITE_EMAIL_TO"