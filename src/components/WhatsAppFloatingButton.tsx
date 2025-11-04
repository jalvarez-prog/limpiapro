import React, { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: 'bottom-right' | 'bottom-left';
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '56950293803',
  defaultMessage = 'Hola, me gustaría solicitar información sobre los servicios de limpieza',
  position = 'bottom-right',
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const handleButtonClick = () => {
    setHasInteracted(true);
  };
  
  // Determinar la posición del botón
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
  };
  
  
  return (
    <div className={`fixed z-40 ${positionClasses[position]}`}>
      {/* Botón flotante de WhatsApp */}
      <div 
        className="relative group"
        onClick={handleButtonClick}
      >
        {/* Efecto de pulso suave para móvil */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 sm:opacity-25"></div>
        
        {/* Botón principal - más pequeño en móvil */}
        <WhatsAppButton
          phoneNumber={phoneNumber}
          message={defaultMessage}
          variant="icon"
          iconOnly={true}
          className="relative h-12 w-12 sm:h-14 sm:w-14 shadow-lg hover:shadow-xl flex items-center justify-center"
        />
        
        {/* Badge indicador - más visible y persistente */}
        {!hasInteracted && (
          <div className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-green-600 border-2 border-white"></span>
          </div>
        )}
      </div>
      
      {/* Texto al hacer hover - solo en desktop */}
      <div className="hidden lg:block absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Contactar
        </div>
      </div>
    </div>
  );
};

export default WhatsAppFloatingButton;