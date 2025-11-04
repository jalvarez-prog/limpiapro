import { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ChevronRight } from 'lucide-react';

const PromoBalloon = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isVisible) return null;

  // Mobile version - compact banner style above products message
  if (isMobile) {
    if (isMinimized) {
      return (
        <div 
          className="absolute top-[180px] right-4 z-30"
          onClick={() => setIsMinimized(false)}
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-2 shadow-2xl animate-pulse">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-white" />
              <span className="text-white font-bold text-xs">20%</span>
              <ChevronRight className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-11/12 max-w-xs z-30 animate-slideInUp">
        {/* Glow effect behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        
        <div className="relative bg-gradient-to-br from-red-600 via-pink-600 to-orange-600 rounded-2xl p-3 shadow-2xl border-2 border-yellow-400/50">
          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-2 -left-2 h-5 w-5 text-yellow-300 animate-spin-slow" />
          <Sparkles className="absolute -bottom-2 -right-2 h-4 w-4 text-yellow-200 animate-spin-slow" style={{animationDelay: '0.5s'}} />
          
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl animate-shimmer"></div>
          
          {/* Close & Minimize buttons */}
          <div className="absolute -top-2 -right-1 flex space-x-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="bg-white/90 rounded-full p-0.5 shadow-md backdrop-blur-sm"
              aria-label="Minimizar"
            >
              <ChevronRight className="h-3 w-3 text-gray-700 rotate-90" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-white/90 rounded-full p-0.5 shadow-md backdrop-blur-sm"
              aria-label="Cerrar"
            >
              <X className="h-3 w-3 text-gray-700" />
            </button>
          </div>
          
          {/* Content - Compact centered layout */}
          <div className="text-center">
            {/* Icon and discount */}
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Tag className="h-6 w-6 text-yellow-300 animate-bounce" />
              <span className="text-3xl font-black text-yellow-300 animate-pulse-slow drop-shadow-lg">20%</span>
              <span className="text-sm font-bold text-white uppercase">OFF</span>
            </div>
            
            {/* Text */}
            <div className="text-white mb-2">
              <div className="text-xs font-bold uppercase tracking-wider">
                Descuento Especial
              </div>
              <div className="text-sm font-extrabold bg-yellow-300 text-red-600 px-3 py-0.5 rounded-full inline-block mt-1">
                Primer Servicio
              </div>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                  setIsMinimized(true);
                }
              }}
              className="bg-white text-red-600 px-6 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
            >
              ¡Aplicar Descuento!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - balloon style
  return (
    <div 
      className="absolute top-[200px] right-4 md:right-24 lg:right-36 xl:right-44 2xl:right-52 z-30 animate-bounce-slow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Balloon String */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full h-20 w-0.5 bg-gradient-to-b from-gray-400 to-transparent"></div>
      
      {/* Balloon */}
      <div className={`relative transform transition-all duration-500 ${isHovered ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'}`}>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        
        {/* Main Balloon */}
        <div className="relative bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 rounded-full p-8 shadow-2xl hover:shadow-red-500/50 transition-shadow duration-300">
          {/* Shine Effect */}
          <div className="absolute top-2 left-3 w-8 h-8 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute top-4 left-6 w-4 h-4 bg-white/40 rounded-full blur-lg"></div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Cerrar promoción"
          >
            <X className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          {/* Content */}
          <div className="text-center text-white">
            {/* Icon */}
            <div className="flex justify-center mb-2">
              <div className="relative">
                <Tag className="h-10 w-10 text-yellow-300 animate-spin-slow" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-200 animate-pulse" />
              </div>
            </div>
            
            {/* Discount Text */}
            <div className="space-y-1">
              <div className="text-4xl font-black text-yellow-300 drop-shadow-lg animate-pulse-slow">
                20%
              </div>
              <div className="text-sm font-bold uppercase tracking-wider">
                de descuento
              </div>
              <div className="text-sm font-semibold">
                en el Primer
              </div>
              <div className="text-base font-bold uppercase bg-yellow-300 text-red-600 px-2 py-1 rounded-full inline-block">
                ¡Servicio!
              </div>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-3 bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ¡Obtener Ahora!
            </button>
          </div>
          
          {/* Decorative Stars */}
          <div className="absolute -top-4 -left-4 text-yellow-300 animate-spin-slow">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute -bottom-3 -right-3 text-yellow-200 animate-spin-slow" style={{animationDelay: '1s'}}>
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      {/* Floating Animation for the whole balloon */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px) rotate(2deg);
          }
          25% {
            transform: translateY(-10px) rotate(-1deg);
          }
          75% {
            transform: translateY(-5px) rotate(1deg);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PromoBalloon;