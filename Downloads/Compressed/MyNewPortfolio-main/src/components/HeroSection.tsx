import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ArrowRight } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

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
      opacity: 0.3,
      x: 0,
      filter: 'blur(0px)',
      duration: 0.5, // Faster duration
      ease: 'power2.out'
    }, '-=0.4');

    // Optimized parallax scroll effect - reduced complexity for better performance
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1, // Increased for smoother performance
      onUpdate: (self) => {
        const progress = self.progress;
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          gsap.to(splineRef.current, {
            y: progress * 30, // Reduced movement for smoother effect
            duration: 0.05, // Faster updates
            ease: 'none'
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
    try {
      // Create download link for CV
      const link = document.createElement('a');
      link.href = '/Mohamed_Lamari_CV.pdf'; // Update this path to match your actual CV file
      link.download = 'Mohamed_Lamari_CV.pdf';
      link.setAttribute('aria-label', 'Download Mohamed Lamari CV');
      
      // Add link to DOM, click it, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Show success message
      console.log('CV download initiated');
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Fallback: Open in new tab if download fails
      window.open('/Mohamed_Lamari_CV.pdf', '_blank');
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
    >
      {/* Spline 3D Background */}
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
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Floating Neon Orbs - Optimized for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full bg-gradient-glow opacity-20 floating-slow" role="presentation"></div>
        <div className="absolute top-2/3 right-1/4 w-16 h-16 rounded-full bg-neon-purple/15 floating-slow" style={{ animationDelay: '2s' }} role="presentation"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 rounded-full bg-neon-cyan/20 floating-slow" style={{ animationDelay: '4s' }} role="presentation"></div>
        <div className="absolute top-1/2 right-1/6 w-14 h-14 rounded-full bg-neon-pink/15 floating-slow" style={{ animationDelay: '1s' }} role="presentation"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={headlineRef}
          id="hero-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="glow-text">MOHAMED LAMARI</span>
          <br />
          <span className="text-chrome-light">Software Engineer</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-chrome-medium mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting innovative digital experiences with cutting-edge technologies.
          Passionate about creating beautiful, functional, and performant applications.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={handleHireMe}
            className="neon-button group flex items-center gap-3"
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
            className="chrome-button group flex items-center gap-3"
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-chrome-medium" aria-hidden="true">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-neon-blue to-transparent mx-auto mb-4"></div>
        <p className="text-sm font-light tracking-widest">SCROLL</p>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(210 100% 65% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(210 100% 65% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>
    </section>
  );
};