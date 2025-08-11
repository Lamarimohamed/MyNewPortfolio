import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position with optimized detection
      const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav items
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 2 }
    );
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#timeline' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = useCallback((href: string) => {
    const sectionId = href.slice(1);
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Add a small delay to ensure the element is properly positioned
      setTimeout(() => {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect();
        const navHeight = 80; // Height of fixed navigation
        const targetPosition = window.scrollY + rect.top - navHeight;
        
        // Use smooth scrolling with proper positioning
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }, 50);
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    }
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <h2 className="text-xl font-bold glow-text">
                <a href="#hero" aria-label="Go to homepage">
                  ML
                </a>
              </h2>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-item text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-neon-blue glow-text'
                      : item.label === 'Contact' 
                        ? 'neon-button text-chrome-darker px-4 py-2 text-xs' 
                        : 'text-chrome-light hover:text-white'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden nav-item text-chrome-light hover:text-white transition-colors duration-300 p-2"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div 
            className="absolute inset-0 bg-chrome-darker/95 backdrop-blur-lg"
            onClick={toggleMenu}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-20 mx-6">
            <nav 
              id="mobile-menu"
              className="chrome-card p-6 space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left text-chrome-light hover:text-white transition-colors duration-300 text-lg font-medium py-2 ${
                    activeSection === item.href.slice(1) ? 'text-neon-blue' : ''
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};