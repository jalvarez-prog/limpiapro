import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, Twitter, Phone, Mail, MapPin, Building2, Home, Briefcase, CheckCircle, Users, Award, Clock } from 'lucide-react';
import { useBlockedRequestHandler } from './hooks/useBlockedRequestHandler';
import NoTranslate from './components/NoTranslate';
import LogoIcon from './components/LogoIcon';
import SEO from './components/SEO';

function App() {
  // Hook para manejar errores de solicitudes bloqueadas (como Google Translate)
  useBlockedRequestHandler();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth < 640 ? -65 : -20; // Offset optimizado para móvil
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <NoTranslate />
      {/* Navbar */}
      <header>
      <nav className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 nav-slide-down ${isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/70 shadow-sm'}`} role="navigation" aria-label="Navegación principal">
        <div className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-50'} bg-gradient-to-r from-teal-50/50 via-white/50 to-cyan-50/50`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16 sm:h-18' : 'h-20 sm:h-24'}`}>
            <div className="flex items-center space-x-3 group nav-item-fade" style={{animationDelay: '0.1s'}}>
              <div className="relative">
                <LogoIcon className={`${isScrolled ? 'h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14' : 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16'} transform group-hover:scale-110 transition-all duration-300`} />
                <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl glow-pulse"></div>
              </div>
              <span className={`${isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-300`}>Clean Solutions</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')} 
                className="relative text-gray-700 hover:text-teal-600 transition-colors font-medium group nav-hover-lift nav-item-fade"
                style={{animationDelay: '0.2s'}}
              >
                <span className="relative z-10">Inicio</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('servicios')} 
                className="relative text-gray-700 hover:text-teal-600 transition-colors font-medium group nav-hover-lift nav-item-fade"
                style={{animationDelay: '0.3s'}}
              >
                <span className="relative z-10">Servicios</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('nosotros')} 
                className="relative text-gray-700 hover:text-teal-600 transition-colors font-medium group nav-hover-lift nav-item-fade"
                style={{animationDelay: '0.4s'}}
              >
                <span className="relative z-10">Nosotros</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('equipo')} 
                className="relative text-gray-700 hover:text-teal-600 transition-colors font-medium group nav-hover-lift nav-item-fade"
                style={{animationDelay: '0.5s'}}
              >
                <span className="relative z-10">Equipo</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              <button 
                onClick={() => scrollToSection('contacto')} 
                className="relative text-gray-700 hover:text-teal-600 transition-colors font-medium group nav-hover-lift nav-item-fade"
                style={{animationDelay: '0.6s'}}
              >
                <span className="relative z-10">Contacto</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>

              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 group"
                  aria-label="Síguenos en Facebook"
                >
                  <Facebook className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative text-gray-600 hover:text-pink-600 transition-all duration-300 group"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-pink-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative text-gray-600 hover:text-blue-400 transition-all duration-300 group"
                  aria-label="Síguenos en Twitter"
                >
                  <Twitter className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 group overflow-hidden nav-item-fade"
              style={{animationDelay: '0.3s'}}
              aria-label="Menú de navegación"
              aria-expanded={isMenuOpen}
            >
              <div className="absolute inset-0 shimmer-effect"></div>
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-teal-600 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 text-teal-600 transform group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-gradient-to-b from-white via-teal-50/30 to-cyan-50/30 border-t border-teal-100">
            <div className="px-4 py-6 space-y-2">
              <button 
                onClick={() => scrollToSection('inicio')} 
                className="block w-full text-center py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Home className="h-5 w-5" />
                  <span>Inicio</span>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('servicios')} 
                className="block w-full text-center py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Briefcase className="h-5 w-5" />
                  <span>Servicios</span>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('nosotros')} 
                className="block w-full text-center py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Users className="h-5 w-5" />
                  <span>Nosotros</span>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('equipo')} 
                className="block w-full text-center py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Award className="h-5 w-5" />
                  <span>Equipo</span>
                </div>
              </button>
              <button 
                onClick={() => scrollToSection('contacto')} 
                className="block w-full text-center py-3 px-4 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>Contacto</span>
                </div>
              </button>

              <div className="pt-4 mt-4 border-t border-teal-100">
                <p className="text-center text-sm text-gray-600 mb-3">Síguenos en redes</p>
                <div className="flex items-center justify-center space-x-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 transform hover:scale-110"
                    aria-label="Facebook de Clean Solutions"
                  >
                    <Facebook className="h-7 w-7" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-all duration-300 transform hover:scale-110"
                    aria-label="Instagram de Clean Solutions"
                  >
                    <Instagram className="h-7 w-7" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 rounded-full bg-blue-50 text-blue-400 hover:bg-blue-100 transition-all duration-300 transform hover:scale-110"
                    aria-label="Twitter de Clean Solutions"
                  >
                    <Twitter className="h-7 w-7" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-16 md:pt-20 relative min-h-screen flex items-center overflow-hidden" role="banner">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/6195275/pexels-photo-6195275.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Servicio de limpieza profesional Clean Solutions - Oficinas y empresas en Santiago"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/80 via-cyan-500/75 to-blue-500/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-800/10 to-transparent"></div>
        </div>

        {/* Floating Particles Effect - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-teal-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-300 rounded-full animate-float opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-teal-300 rounded-full animate-float opacity-70" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-40" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight opacity-0 animate-fadeInUp">
              Limpieza Profesional
              <span className="block text-teal-300 mt-2 animate-fadeInUp animate-delay-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Para Tu Espacio</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-50 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fadeInUp animate-delay-300 px-4">
              Servicios especializados de limpieza para empresas, oficinas y departamentos. Calidad garantizada y personal capacitado.
            </p>
            <button
              onClick={() => scrollToSection('contacto')}
              className="opacity-0 animate-fadeInUp animate-delay-400 bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 md:hover:scale-110 shadow-2xl hover:shadow-teal-500/50 animate-pulse-glow relative overflow-hidden group"
            >
              <span className="relative z-10">Solicitar Cotización</span>
              <div className="absolute inset-0 shine-effect"></div>
            </button>

            <div className="mt-2 sm:mt-12 md:mt-16 mb-28 sm:mb-20 md:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
              <div className="opacity-0 animate-fadeInUp animate-delay-500 group bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:-translate-y-1 md:hover:-translate-y-2">
                <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-teal-300 mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Empresas</h3>
                <p className="text-sm sm:text-base text-teal-100">Limpieza corporativa profesional</p>
              </div>
              <div className="opacity-0 animate-fadeInUp animate-delay-600 group bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:-translate-y-1 md:hover:-translate-y-2">
                <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-teal-300 mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Oficinas</h3>
                <p className="text-sm sm:text-base text-teal-100">Espacios de trabajo impecables</p>
              </div>
              <div className="opacity-0 animate-fadeInUp group bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:-translate-y-1 md:hover:-translate-y-2 sm:col-span-2 lg:col-span-1" style={{animationDelay: '0.7s'}}>
                <Home className="h-10 w-10 sm:h-12 sm:w-12 text-teal-300 mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 text-white">Departamentos</h3>
                <p className="text-sm sm:text-base text-teal-100">Limpieza residencial de calidad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="pt-16 pb-12 sm:py-16 md:py-20 bg-white" aria-labelledby="servicios-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 id="servicios-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Nuestros Servicios de Limpieza Profesional</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Ofrecemos soluciones integrales de limpieza adaptadas a tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-6 sm:p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 md:hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/10 group-hover:to-cyan-400/10 transition-all duration-500"></div>
              <Building2 className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-teal-600 mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Limpieza Corporativa</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Servicios especializados para empresas y corporativos. Mantenimiento regular de instalaciones, áreas comunes y espacios de trabajo.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Limpieza profunda de oficinas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Desinfección de áreas comunes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Mantenimiento de cristales</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-6 sm:p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 md:hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/10 group-hover:to-cyan-400/10 transition-all duration-500"></div>
              <Briefcase className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-teal-600 mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Oficinas</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Mantén tu espacio de trabajo limpio y productivo. Servicios diarios, semanales o quincenales según tus necesidades.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Limpieza de escritorios y equipos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Sanitización de baños</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Limpieza de cocinas y comedores</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-6 sm:p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 md:hover:scale-105 relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/10 group-hover:to-cyan-400/10 transition-all duration-500"></div>
              <Home className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-teal-600 mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Departamentos</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">Limpieza residencial de alta calidad para tu hogar. Personal confiable y productos de primera línea.</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Limpieza completa de habitaciones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Lavado y desinfección de baños</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Limpieza de cocina y electrodomésticos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="pt-16 pb-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100" aria-labelledby="nosotros-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 id="nosotros-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Sobre Clean Solutions</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Con más de 10 años de experiencia en el sector de limpieza profesional, Clean Solutions se ha consolidado como líder en servicios de limpieza para empresas, oficinas y hogares.
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Nuestra misión es proporcionar servicios de limpieza excepcionales que superen las expectativas de nuestros clientes, utilizando técnicas avanzadas y productos ecológicos de alta calidad.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <Award className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">Calidad Garantizada</h3>
                    <p className="text-sm sm:text-base text-gray-700">Comprometidos con la excelencia en cada servicio que realizamos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">Equipo Profesional</h3>
                    <p className="text-sm sm:text-base text-gray-700">Personal capacitado y certificado con amplia experiencia</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-teal-600 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-1 sm:mb-2">Disponibilidad Flexible</h3>
                    <p className="text-sm sm:text-base text-gray-700">Nos adaptamos a tus horarios y necesidades específicas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mt-8 lg:mt-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Nuestros Valores</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-teal-600 pl-3 sm:pl-4">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Compromiso</h4>
                  <p className="text-sm sm:text-base text-gray-700">Dedicación total a la satisfacción de nuestros clientes</p>
                </div>
                <div className="border-l-4 border-teal-600 pl-3 sm:pl-4">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Confianza</h4>
                  <p className="text-sm sm:text-base text-gray-700">Personal verificado y de total confianza en tu espacio</p>
                </div>
                <div className="border-l-4 border-teal-600 pl-3 sm:pl-4">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Responsabilidad</h4>
                  <p className="text-sm sm:text-base text-gray-700">Uso de productos ecológicos y prácticas sostenibles</p>
                </div>
                <div className="border-l-4 border-teal-600 pl-3 sm:pl-4">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Excelencia</h4>
                  <p className="text-sm sm:text-base text-gray-700">Buscamos la perfección en cada detalle de nuestro trabajo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section id="equipo" className="pt-16 pb-12 sm:py-16 md:py-20 bg-white" aria-labelledby="equipo-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 id="equipo-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Nuestro Equipo Profesional</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Profesionales capacitados y certificados listos para brindarte el mejor servicio</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 rounded-2xl text-center hover:shadow-2xl transition-all transform hover:scale-105 lg:hover:scale-110 hover:-translate-y-1 lg:hover:-translate-y-3 duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/20 group-hover:to-cyan-400/20 transition-all duration-500"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-360 transition-all duration-700 shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/50">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">María González</h3>
              <p className="relative text-sm sm:text-base text-teal-600 font-semibold mb-1 sm:mb-2">Supervisora General</p>
              <p className="relative text-xs sm:text-sm text-gray-700">15 años de experiencia en gestión de equipos de limpieza profesional</p>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 rounded-2xl text-center hover:shadow-2xl transition-all transform hover:scale-105 lg:hover:scale-110 hover:-translate-y-1 lg:hover:-translate-y-3 duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/20 group-hover:to-cyan-400/20 transition-all duration-500"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-360 transition-all duration-700 shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/50">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Carlos Rodríguez</h3>
              <p className="relative text-sm sm:text-base text-teal-600 font-semibold mb-1 sm:mb-2">Especialista Corporativo</p>
              <p className="relative text-xs sm:text-sm text-gray-700">Experto en limpieza de grandes instalaciones y edificios corporativos</p>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 rounded-2xl text-center hover:shadow-2xl transition-all transform hover:scale-105 lg:hover:scale-110 hover:-translate-y-1 lg:hover:-translate-y-3 duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/20 group-hover:to-cyan-400/20 transition-all duration-500"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-360 transition-all duration-700 shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/50">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Ana Martínez</h3>
              <p className="relative text-sm sm:text-base text-teal-600 font-semibold mb-1 sm:mb-2">Coordinadora de Calidad</p>
              <p className="relative text-xs sm:text-sm text-gray-700">Certificada en control de calidad y protocolos de limpieza profesional</p>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 rounded-2xl text-center hover:shadow-2xl transition-all transform hover:scale-105 lg:hover:scale-110 hover:-translate-y-1 lg:hover:-translate-y-3 duration-500 relative overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/20 group-hover:to-cyan-400/20 transition-all duration-500"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-teal-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-360 transition-all duration-700 shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/50">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
              <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Luis Fernández</h3>
              <p className="relative text-sm sm:text-base text-teal-600 font-semibold mb-1 sm:mb-2">Especialista Residencial</p>
              <p className="relative text-xs sm:text-sm text-gray-700">Dedicado a la limpieza de hogares con atención al detalle</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Capacitación y Certificaciones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 mx-auto mb-2 sm:mb-3" />
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Capacitación Continua</h4>
                <p className="text-sm sm:text-base text-gray-700">Programas de formación permanente en técnicas de limpieza y seguridad</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 mx-auto mb-2 sm:mb-3" />
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Certificaciones</h4>
                <p className="text-sm sm:text-base text-gray-700">Personal certificado en manejo de productos químicos y bioseguridad</p>
              </div>
              <div className="text-center sm:col-span-2 md:col-span-1">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 mx-auto mb-2 sm:mb-3" />
                <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2">Verificación</h4>
                <p className="text-sm sm:text-base text-gray-700">Todo nuestro personal pasa por verificación de antecedentes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="pt-16 pb-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50" aria-labelledby="contacto-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 id="contacto-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Contáctanos - Clean Solutions Santiago</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Estamos listos para atender tus necesidades de limpieza</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Información de Contacto</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Teléfono</h4>
                      <p className="text-sm sm:text-base text-gray-700">+569 53417956</p>
                      <p className="text-sm sm:text-base text-gray-700">+569 50293803</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Email</h4>
                      <p className="text-sm sm:text-base text-gray-700 break-words">contacto@cleansolutions.com</p>
                      <p className="text-sm sm:text-base text-gray-700 break-words">ventas@cleansolutions.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Dirección</h4>
                      <p className="text-sm sm:text-base text-gray-700">Agustinas 1022 oficina 1004</p>
                      <p className="text-sm sm:text-base text-gray-700">Santiago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mr-3 sm:mr-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">Horario de Atención</h4>
                      <p className="text-sm sm:text-base text-gray-700">Lunes a Viernes: 8:00 AM - 8:00 PM</p>
                      <p className="text-sm sm:text-base text-gray-700">Sábados: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Solicita una Cotización</h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="+569 50000000"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Servicio de Interés</label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="corporativo">Limpieza Corporativa</option>
                    <option value="oficina">Limpieza de Oficinas</option>
                    <option value="departamento">Limpieza de Departamentos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base resize-none"
                    placeholder="Cuéntanos sobre tus necesidades de limpieza..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-[1.02] sm:hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-3 sm:mb-4">
                <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                <span className="text-xl sm:text-2xl font-bold">Clean Solutions</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 max-w-xs mx-auto sm:mx-0">Tu socio confiable en servicios de limpieza profesional para empresas, oficinas y hogares.</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li><button onClick={() => scrollToSection('inicio')} className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors">Inicio</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors">Servicios</button></li>
                <li><button onClick={() => scrollToSection('nosotros')} className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors">Nosotros</button></li>
                <li><button onClick={() => scrollToSection('equipo')} className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors">Equipo</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="text-sm sm:text-base text-gray-400 hover:text-teal-400 transition-colors">Contacto</button></li>
              </ul>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Síguenos</h4>
              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-400 transition-all transform hover:scale-110" aria-label="Página de Facebook de Clean Solutions">
                  <Facebook className="h-7 w-7 sm:h-6 sm:w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-pink-400 transition-all transform hover:scale-110" aria-label="Perfil de Instagram de Clean Solutions">
                  <Instagram className="h-7 w-7 sm:h-6 sm:w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-300 transition-all transform hover:scale-110" aria-label="Cuenta de Twitter de Clean Solutions">
                  <Twitter className="h-7 w-7 sm:h-6 sm:w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">&copy; 2025 Clean Solutions. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
