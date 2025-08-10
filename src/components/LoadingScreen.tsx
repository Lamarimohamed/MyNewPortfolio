import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, percentageRef.current], { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    });

    // Animate logo and percentage in
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Progress bar animation
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentageRef.current) {
          percentageRef.current.textContent = `${progress}%`;
        }
      }
    }, '-=0.5');

    // Exit animation
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.in'
    }, '+=0.3');

    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        onLoadingComplete();
      }
    }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="preloader flex flex-col items-center justify-center gap-8"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-glow opacity-20 floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-purple/10 floating" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-neon-cyan/10 floating" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Logo/Text */}
      <div ref={logoRef} className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold glow-text mb-4 tracking-wider">
          LAMARI MOHAMED
        </h1>
        <p className="text-chrome-medium text-lg md:text-xl font-light tracking-wide">
          Software Engineer
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-80 md:w-96 h-1 bg-chrome-dark/50 rounded-full overflow-hidden relative z-10">
        <div 
          ref={progressBarRef}
          className="loading-bar h-full"
        ></div>
      </div>

      {/* Percentage */}
      <div ref={percentageRef} className="text-neon-blue text-xl font-mono font-bold z-10">
        0%
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(210 100% 65% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(210 100% 65% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
    </div>
  );
};