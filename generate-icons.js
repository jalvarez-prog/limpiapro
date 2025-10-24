// Script para generar iconos PWA usando canvas
// Ejecutar con: node generate-icons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear un canvas simple con logo
function generateIcon(size) {
  const svgContent = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#14b8a6"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#ffffff" opacity="0.9"/>
  <text x="${size/2}" y="${size/2 + 8}" font-family="Arial, sans-serif" font-size="${size/8}" font-weight="bold" text-anchor="middle" fill="#14b8a6">CS</text>
</svg>`;
  return svgContent;
}

// Crear directorio public si no existe
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generar iconos en diferentes tamaños
const sizes = [16, 32, 96, 192, 256, 384, 512];

sizes.forEach(size => {
  const svgContent = generateIcon(size);
  const filename = `icon-${size}x${size}.png`;
  
  // Para esta demostración, generamos SVGs en lugar de PNGs
  // En un entorno real, usarías sharp o similar para convertir a PNG
  const svgFilename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(publicDir, svgFilename), svgContent);
  
  console.log(`✓ Generado ${svgFilename}`);
});

// También generar favicon
const faviconSvg = generateIcon(32);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

console.log('✓ Iconos generados exitosamente');
console.log('⚠️  Nota: Los archivos se generaron como SVG. Para producción, convertir a PNG usando herramientas como sharp.');