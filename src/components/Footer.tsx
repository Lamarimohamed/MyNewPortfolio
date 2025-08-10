import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animation without ScrollTrigger dependency
    const tl = gsap.timeline({ delay: 2.5 });

    // Content animation
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    )
    .fromTo(socialRef.current,
      { opacity: 0, y: 20, filter: 'blur(3px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // Animate particles
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.3
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#timeline' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { key: 'github', href: 'https://github.com/Lamarimohamed', label: 'GitHub' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/mohamed-lamari-33737a302/', label: 'LinkedIn' },
    { key: 'whatsapp', href: 'https://wa.me/213795019617', label: 'WhatsApp' },
    { key: 'behance', href: 'https://behance.net/LamariMohamed', label: 'Behance' },
  ] as const;

  const renderIcon = (key: typeof socialLinks[number]['key']) => {
    switch (key) {
      case 'github':
        return <i className="fab fa-github transition-transform duration-300 group-hover:scale-110" aria-hidden="true"></i>;
      case 'linkedin':
        return <i className="fab fa-linkedin transition-transform duration-300 group-hover:scale-110" aria-hidden="true"></i>;
      case 'whatsapp':
        return <i className="fab fa-whatsapp transition-transform duration-300 group-hover:scale-110" aria-hidden="true"></i>;
      case 'behance':
        return <i className="fab fa-behance transition-transform duration-300 group-hover:scale-110" aria-hidden="true"></i>;
      default:
        return null;
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 px-6 border-t border-chrome-dark/30 bg-background"
      role="contentinfo"
    >
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-neon-blue/40"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 rounded-full bg-neon-purple/50"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-neon-cyan/40"></div>
        <div className="absolute bottom-1/3 right-1/6 w-1 h-1 rounded-full bg-neon-pink/50"></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-neon-blue/30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-neon-purple/40"></div>
        <div className="absolute top-1/6 right-1/5 w-1 h-1 rounded-full bg-neon-cyan/50"></div>
        <div className="absolute bottom-1/6 left-1/5 w-2 h-2 rounded-full bg-neon-pink/30"></div>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold glow-text">
              <a href="#hero" aria-label="Go to homepage">
                MOHAMED LAMARI
              </a>
            </h3>
            <p className="text-chrome-medium leading-relaxed">
              Building the future with code, creativity, and passion. 
              Let's create something amazing together.
            </p>
            <button 
              onClick={scrollToTop}
              className="chrome-button text-sm group flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              aria-label="Back to top of page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="group-hover:-translate-y-1 transition-transform duration-300"><path d="M12 4l-7 7h4v9h6v-9h4z"/></svg>
              Back to Top
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-chrome-light">Quick Links</h4>
            <nav className="space-y-3" role="navigation" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-chrome-medium hover:text-neon-blue transition-colors duration-300 text-sm"
                  aria-label={`Navigate to ${link.name} section`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 self-start text-left">
            <h4 className="text-lg font-semibold text-chrome-light">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-chrome-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                <span>Available Worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-chrome-medium">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></div>
                <span>Open for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div ref={socialRef} className="border-t border-chrome-dark/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links (icons only) */}
            <div className="flex gap-4" role="list" aria-label="Social media links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="glass-card p-3 flex items-center justify-center group hover:scale-105 hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300 text-chrome-medium hover:text-neon-purple"
                  role="listitem"
                  aria-label={`Visit ${social.label} profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {renderIcon(social.key)}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-chrome-medium text-base">
                © {new Date().getFullYear()} Mohamed Lamari. All rights reserved.
              </p>
              <p className="text-chrome-medium text-sm mt-1">
                Built with React, TypeScript, and lots of ☕
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};