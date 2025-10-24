import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
  showTooltip?: boolean;
  tooltipDelay?: number;
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '56950293803',
  defaultMessage = 'Hola, me gustaría solicitar información sobre los servicios de limpieza',
  position = 'bottom-right',
  showTooltip = true,
  tooltipDelay = 5000,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  useEffect(() => {
    // Mostrar el tooltip después del retraso especificado
    if (showTooltip && !hasInteracted) {
      const timer = setTimeout(() => {
        setIsTooltipVisible(true);
      }, tooltipDelay);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip, tooltipDelay, hasInteracted]);
  
  const handleCloseTooltip = () => {
    setIsTooltipVisible(false);
    setHasInteracted(true);
  };
  
  const handleButtonClick = () => {
    setIsTooltipVisible(false);
    setHasInteracted(true);
  };
  
  // Determinar la posición del botón
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  };
  
  const tooltipPositionClasses = {
    'bottom-right': 'right-0',
    'bottom-left': 'left-0',
  };
  
  return (
    <div className={`fixed z-40 ${positionClasses[position]}`}>
      {/* Tooltip */}
      {isTooltipVisible && (
        <div 
          className={`absolute bottom-full mb-2 ${tooltipPositionClasses[position]} animate-fade-in`}
        >
          <div className="relative bg-white rounded-lg shadow-2xl p-3 sm:p-4 max-w-[280px] sm:max-w-xs border border-gray-100">
            <button
              onClick={handleCloseTooltip}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Cerrar mensaje"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </button>
            
            <p className="text-gray-800 font-medium text-sm sm:text-base mb-1">
              ¡Hola! 👋
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">
              ¿Necesitas ayuda con nuestros servicios de limpieza? ¡Estamos aquí para ti!
            </p>
            
            {/* Flecha del tooltip */}
            <div className={`absolute bottom-0 translate-y-full ${position === 'bottom-right' ? 'right-6' : 'left-6'}`}>
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Botón flotante de WhatsApp */}
      <div 
        className="relative group"
        onClick={handleButtonClick}
      >
        {/* Efecto de pulso */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
        
        {/* Botón principal */}
        <WhatsAppButton
          phoneNumber={phoneNumber}
          message={defaultMessage}
          variant="icon"
          iconOnly={true}
          className="relative h-14 w-14 sm:h-16 sm:w-16 shadow-xl hover:shadow-2xl flex items-center justify-center"
        />
        
        {/* Badge indicador */}
        {!hasInteracted && (
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
        )}
      </div>
      
      {/* Texto al hacer hover - solo en desktop */}
      <div className="hidden lg:block absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Chatea con nosotros
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloatingButton;