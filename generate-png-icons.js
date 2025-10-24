import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para generar SVG base
function generateBaseSvg(size) {
  return Buffer.from(`
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#14b8a6"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#ffffff" opacity="0.95"/>
  <text x="${size/2}" y="${size/2 + size/16}" font-family="Arial, sans-serif" font-size="${size/6}" font-weight="bold" text-anchor="middle" fill="#14b8a6">CS</text>
</svg>`);
}

// Asegurar que el directorio public existe
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generar iconos en diferentes tamaños
const sizes = [16, 32, 96, 192, 256, 384, 512];

async function generateIcons() {
  for (const size of sizes) {
    try {
      const svg = generateBaseSvg(size);
      const filename = `icon-${size}x${size}.png`;
      const filepath = path.join(publicDir, filename);
      
      await sharp(svg)
        .png()
        .toFile(filepath);
      
      console.log(`✅ Generado ${filename}`);
    } catch (error) {
      console.error(`❌ Error generando icon-${size}x${size}.png:`, error.message);
    }
  }

  // Generar favicons adicionales
  try {
    // favicon-32x32.png
    const favicon32 = generateBaseSvg(32);
    await sharp(favicon32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Generado favicon-32x32.png');

    // favicon-16x16.png
    const favicon16 = generateBaseSvg(16);
    await sharp(favicon16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Generado favicon-16x16.png');

    // apple-touch-icon.png (180x180)
    const appleTouchIcon = generateBaseSvg(180);
    await sharp(appleTouchIcon).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Generado apple-touch-icon.png');

    console.log('\n✨ Todos los iconos PNG han sido generados exitosamente!');
  } catch (error) {
    console.error('❌ Error generando favicons:', error.message);
  }
}

// Ejecutar la generación
generateIcons().catch(console.error);