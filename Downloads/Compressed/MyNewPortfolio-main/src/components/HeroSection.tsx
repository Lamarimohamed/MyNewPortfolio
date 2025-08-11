import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSpline, setShowSpline] = useState(false);

  // Mobile detection and performance optimization
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only show Spline on desktop for better performance
      setShowSpline(!mobile && window.innerWidth > 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay Spline loading for better initial page load
    const splineTimer = setTimeout(() => {
      if (!isMobile) {
        setShowSpline(true);
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(splineTimer);
    };
  }, [isMobile]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 }); // Faster start

    // Initial setup - ensure elements are visible initially
    gsap.set([headlineRef.current, subtitleRef.current, buttonsRef.current, splineRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Faster entrance animations with reduced complexity
    tl.fromTo(headlineRef.current, {
      opacity: 0,
      y: 20, // Reduced distance for faster animation
      filter: 'blur(3px)' // Reduced blur for faster effect
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4, // Faster duration
      ease: 'power2.out'
    })
    .fromTo(subtitleRef.current, {
      opacity: 0,
      y: 20,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3, // Faster duration
      ease: 'power2.out'
    }, '-=0.3') // Earlier overlap
    .fromTo(buttonsRef.current, {
      opacity: 0,
      y: 20,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3, // Faster duration
      ease: 'power2.out'
    }, '-=0.2') // Earlier overlap
    .fromTo(splineRef.current, {
      opacity: 0,
      x: 30, // Reduced distance for faster animation
      filter: 'blur(5px)'
    }, {
      opacity: showSpline ? 0.3 : 0,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.5, // Faster duration
      ease: 'power2.out'
    }, '-=0.4');

    // Optimized parallax scroll effect - reduced complexity for better performance
    if (!isMobile) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (splineRef.current) {
            gsap.set(splineRef.current, {
              y: progress * 50,
              opacity: 0.3 - progress * 0.2,
            });
          }
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, showSpline]);

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDownloadCV = () => {
    // Track download event for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        'event_category': 'CV',
        'event_label': 'Mohamed_Lamari_CV'
      });
    }

    window.open('/Mohamed_Lamari_CV.pdf', '_blank');
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
    >
      {/* Spline 3D Background - Only on desktop for performance */}
      {showSpline && (
        <div ref={splineRef} className="spline-container" aria-hidden="true">
          <iframe 
            src='https://my.spline.design/rememberallrobot-Ahb9oqDTIyBujosHCqlDj0oz/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full"
            title="3D Background Animation"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin"
            style={{ 
              willChange: 'transform',
              pointerEvents: 'none' // Prevent interaction lag
            }}
          />
        </div>
      )}

      {/* Floating Neon Orbs - Optimized for performance and reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-12 md:w-24 h-12 md:h-24 rounded-full bg-gradient-glow opacity-20 floating-slow" role="presentation"></div>
        <div className="absolute top-2/3 right-1/4 w-8 md:w-16 h-8 md:h-16 rounded-full bg-neon-purple/15 floating-slow" style={{ animationDelay: '2s' }} role="presentation"></div>
        <div className="absolute bottom-1/4 left-1/3 w-6 md:w-12 h-6 md:h-12 rounded-full bg-neon-cyan/20 floating-slow" style={{ animationDelay: '4s' }} role="presentation"></div>
        <div className="absolute top-1/2 right-1/6 w-7 md:w-14 h-7 md:h-14 rounded-full bg-neon-pink/15 floating-slow" style={{ animationDelay: '1s' }} role="presentation"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
        <h1 
          ref={headlineRef}
          id="hero-heading"
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="glow-text">MOHAMED LAMARI</span>
          <br />
          <span className="text-chrome-light">Software Engineer</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-base md:text-lg lg:text-xl text-chrome-medium mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting innovative digital experiences with cutting-edge technologies.
          Passionate about creating beautiful, functional, and performant applications.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <button 
            onClick={handleHireMe}
            className="neon-button group flex items-center gap-3 w-full sm:w-auto justify-center"
            aria-label="Hire Mohamed Lamari - Navigate to contact section"
          >
            <span>Hire Me</span>
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform duration-300" 
              aria-hidden="true"
            />
          </button>

          <button 
            onClick={handleDownloadCV}
            className="chrome-button group flex items-center gap-3 w-full sm:w-auto justify-center"
            aria-label="Download Mohamed Lamari CV"
          >
            <Download 
              size={20} 
              className="group-hover:scale-110 transition-transform duration-300" 
              aria-hidden="true"
            />
            <span>Download CV</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-chrome-medium animate-bounce" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-chrome-medium to-transparent"></div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/60 pointer-events-none" 
        aria-hidden="true"
      ></div>
    </section>
  );
};