import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

// Components
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TimelineSection } from '@/components/TimelineSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrollInitialized, setIsScrollInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<LocomotiveScroll>();

  // Initialize Locomotive Scroll
  const initializeScroll = useCallback(() => {
    if (!scrollRef.current || isScrollInitialized) return;

    try {
      locomotiveRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: false, // Disable Locomotive Scroll's own smooth scrolling for better navigation control
        multiplier: 1.0, // Standard scrolling speed
        class: 'is-inview',
        scrollbarClass: 'c-scrollbar',
        scrollingClass: 'has-scroll-scrolling',
        draggingClass: 'has-scroll-dragging',
        smoothClass: 'has-scroll-smooth',
        initClass: 'has-scroll-init',
        smartphone: {
          smooth: false,
          multiplier: 1.0, // Standard speed on mobile
        },
        tablet: {
          smooth: false,
          multiplier: 1.0, // Standard speed on tablet
        },
        lerp: 0.01, // Smoother interpolation for better performance
        duration: 1.0, // Standard duration
        reloadOnContextChange: true,
        touchMultiplier: 2,
        smoothMobile: false,
        // Performance optimizations
        getSpeed: () => 1,
        getDirection: () => 1,
      });

      // Update ScrollTrigger when Locomotive Scroll updates
      locomotiveRef.current.on('scroll', ScrollTrigger.update);

      // Setup ScrollTrigger to work with Locomotive Scroll
      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          return arguments.length 
            ? locomotiveRef.current?.scrollTo(value, { duration: 0, disableLerp: true })
            : locomotiveRef.current?.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: scrollRef.current?.style.transform ? 'transform' : 'fixed'
      });

      // Refresh both ScrollTrigger and Locomotive Scroll
      ScrollTrigger.addEventListener('refresh', () => locomotiveRef.current?.update());
      ScrollTrigger.refresh();
      
      setIsScrollInitialized(true);
    } catch (error) {
      console.warn('Failed to initialize Locomotive Scroll:', error);
      // Fallback to normal scrolling
      setIsScrollInitialized(true);
    }
  }, [isScrollInitialized]);

  useEffect(() => {
    if (!isLoading) {
      initializeScroll();
    }
  }, [isLoading, initializeScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    
    // Faster fade in for main content
    gsap.fromTo('main', 
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  // Handle scroll restoration for accessibility
  useEffect(() => {
    if (!isLoading && !isScrollInitialized) {
      // Restore scroll position if user navigated back
      const savedScrollPos = sessionStorage.getItem('portfolio-scroll-pos');
      if (savedScrollPos) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPos));
          sessionStorage.removeItem('portfolio-scroll-pos');
        }, 100);
      }
    }
  }, [isLoading, isScrollInitialized]);

  // Save scroll position before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('portfolio-scroll-pos', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Navigation */}
      {!isLoading && <Navigation />}

      {/* Main Content - All sections pre-rendered for immediate navigation */}
      <div 
        ref={scrollRef}
        data-scroll-container
        className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}
        role="main"
        id="main-content"
        aria-label="Portfolio content"
      >
        <main>
          {/* Hero Section */}
          <div data-scroll-section>
            <HeroSection />
          </div>

          {/* About Section */}
          <div data-scroll-section id="about">
            <AboutSection />
          </div>

          {/* Skills Section */}
          <div data-scroll-section id="skills">
            <SkillsSection />
          </div>

          {/* Projects Section */}
          <div data-scroll-section id="projects">
            <ProjectsSection />
          </div>

          {/* Timeline/Experience Section */}
          <div data-scroll-section id="timeline">
            <TimelineSection />
          </div>

          {/* Contact Section */}
          <div data-scroll-section id="contact">
            <ContactSection />
          </div>

          {/* Footer */}
          <div data-scroll-section>
            <Footer />
          </div>
        </main>
      </div>

      {/* Custom Locomotive Scroll Styles */}
      <style>{`
        .c-scrollbar {
          position: fixed;
          right: 0;
          top: 0;
          width: 11px;
          height: 100%;
          transform-origin: center right;
          transition: transform 0.3s, opacity 0.3s;
          opacity: 0;
        }
        
        .has-scroll-scrolling .c-scrollbar,
        .has-scroll-dragging .c-scrollbar {
          opacity: 1;
        }
        
        .c-scrollbar_thumb {
          position: absolute;
          top: 0;
          right: 0;
          background-color: hsl(210 100% 65%);
          opacity: 0.5;
          width: 7px;
          border-radius: 10px;
          margin: 2px;
          cursor: grab;
        }
        
        .has-scroll-dragging .c-scrollbar_thumb {
          cursor: grabbing;
        }
        
        .c-scrollbar_thumb:hover {
          background-color: hsl(210 100% 70%);
          opacity: 0.8;
        }

        html.has-scroll-smooth {
          overflow: hidden;
        }

        html.has-scroll-smooth body {
          overflow: hidden;
        }

        .has-scroll-smooth [data-scroll-container] {
          min-height: 100vh;
        }

        [data-scroll] {
          will-change: transform;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .floating,
          .pulse-glow,
          [data-scroll] {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Focus styles for better accessibility */
        .focus-visible:focus {
          outline: 2px solid hsl(210 100% 65%);
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .glass-card {
            border-color: hsl(var(--border));
            background: hsl(var(--card));
          }
        }

        /* Print styles */
        @media print {
          .floating,
          .pulse-glow,
          [data-scroll] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Portfolio;