import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  variant?: 'primary' | 'secondary' | 'icon' | 'text';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  iconOnly?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '56950293803',
  message = 'Hola, me gustaría solicitar información sobre los servicios de limpieza',
  variant = 'primary',
  className = '',
  children,
  showIcon = true,
  iconOnly = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Detección mejorada de dispositivo móvil
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Verificar si es móvil de múltiples formas
    const isMobile = (
      /android/i.test(userAgent) ||
      /webos/i.test(userAgent) ||
      /iphone/i.test(userAgent) ||
      /ipad/i.test(userAgent) ||
      /ipod/i.test(userAgent) ||
      /blackberry/i.test(userAgent) ||
      /windows phone/i.test(userAgent) ||
      /opera mini/i.test(userAgent) ||
      /mobile/i.test(userAgent) ||
      /tablet/i.test(userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      window.matchMedia('(max-width: 768px)').matches
    );
    
    // URL única de WhatsApp API que funciona tanto en móvil como desktop
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    if (isMobile) {
      // En móvil: abrir directamente en la misma ventana
      window.location.href = whatsappUrl;
    } else {
      // En desktop: abrir en nueva pestaña
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Estilos base según la variante
  const baseStyles = {
    primary: 'flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group overflow-hidden',
    secondary: 'flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg font-medium transition-all duration-300 transform hover:scale-105',
    icon: 'p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg',
    text: 'inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-300',
  };
  
  const selectedStyle = baseStyles[variant] || baseStyles.primary;
  const finalClassName = `${selectedStyle} ${className} cursor-pointer`;
  
  // Generar URL fallback para accesibilidad
  const fallbackUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  if (iconOnly) {
    return (
      <a 
        href={fallbackUrl}
        onClick={handleClick}
        className={finalClassName}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
      </a>
    );
  }
  
  return (
    <a 
      href={fallbackUrl}
      onClick={handleClick}
      className={finalClassName}
      aria-label="Contactar por WhatsApp"
    >
      {showIcon && <MessageCircle className="h-4 w-4 fill-current" />}
      {children || <span>WhatsApp</span>}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
    </a>
  );
};

export default WhatsAppButton;