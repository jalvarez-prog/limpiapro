import React from 'react';
import { MessageCircle } from 'lucide-react';
import { handleWhatsAppClick, generateWhatsAppUrl, detectDevice, WHATSAPP_CONFIG } from '../utils/whatsappHandler';

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
  phoneNumber = WHATSAPP_CONFIG.DEFAULT_PHONE,
  message = WHATSAPP_CONFIG.DEFAULT_MESSAGE,
  variant = 'primary',
  className = '',
  children,
  showIcon = true,
  iconOnly = false,
}) => {
  const device = detectDevice();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleWhatsAppClick(e, { phoneNumber, message });
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
  
  // Generar URL usando la nueva utilidad
  const whatsappUrl = generateWhatsAppUrl({ phoneNumber, message });
  
  if (iconOnly) {
    return (
      <a 
        href={whatsappUrl}
        onClick={handleClick}
        className={finalClassName}
        {...(device.isMobile ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
      </a>
    );
  }
  
  return (
    <a 
      href={whatsappUrl}
      onClick={handleClick}
      className={finalClassName}
      {...(device.isMobile ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
