import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Code, 
  Database, 
  Globe, 
  Lightning, 
  Palette, 
  Rocket 
} from 'phosphor-react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure sections are immediately visible and animated smoothly
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible but with initial animation states
    gsap.set([imageRef.current, contentRef.current, iconsRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Ensure image is immediately visible, then animate
    gsap.set(imageRef.current, {
      opacity: 1,
      visibility: 'visible',
      x: 0
    });

    // Smooth entrance animations without delays
    tl.fromTo(imageRef.current,
      { opacity: 0.3, x: -20, filter: 'blur(2px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(contentRef.current,
      { opacity: 0, x: 30, filter: 'blur(3px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Icons stagger animation - faster
    const icons = iconsRef.current?.children;
    if (icons) {
      tl.fromTo(icons,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.4)' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const skills = [
    { icon: Code, name: 'Frontend Development', color: 'text-neon-blue', description: 'React, Vue, TypeScript' },
    { icon: Database, name: 'Backend Systems', color: 'text-neon-purple', description: 'Node.js, Python, APIs' },
    { icon: Globe, name: 'Full-Stack', color: 'text-neon-cyan', description: 'End-to-end solutions' },
    { icon: Lightning, name: 'Performance', color: 'text-neon-pink', description: 'Optimization & scaling' },
    { icon: Palette, name: 'UI/UX Design', color: 'text-neon-blue', description: 'User-centered design' },
    { icon: Rocket, name: 'DevOps', color: 'text-neon-purple', description: 'CI/CD, Cloud deployment' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 px-6 relative bg-background"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="glass-card p-2 rounded-full pulse-glow">
                <img 
                  src="/lovable-uploads/786b27e3-73f7-45c0-9e38-2aa9c47e2f2d.png"
                  alt="Mohamed Lamari - Software Engineer and Full-Stack Developer"
                  className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  decoding="async"
                  width={384}
                  height={384}
                  onError={(e) => {
                    console.log('Image failed to load, trying fallback');
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.svg';
                  }}
                  onLoad={() => {
                    console.log('Profile image loaded successfully');
                  }}
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-neon-blue/50 floating" aria-hidden="true"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-neon-purple/30 floating" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 id="about-heading" className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="glow-text">Me</span>
              </h2>
              
              <div className="space-y-4 text-chrome-medium text-lg leading-relaxed">
                <p>
                  I'm a passionate software engineer with expertise in modern web technologies 
                  and a keen eye for creating exceptional digital experiences. With years of 
                  experience in full-stack development, I specialize in building scalable, 
                  performant applications that solve real-world problems.
                </p>
                
                <p>
                  My journey in technology has led me to master various programming languages 
                  and frameworks, always staying on the cutting edge of innovation. I believe 
                  in writing clean, maintainable code and creating user interfaces that are 
                  both beautiful and functional.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-chrome-light">Core Expertise</h3>
              <div ref={iconsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6" role="list" aria-label="Core expertise areas">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300 cursor-pointer optimize-performance"
                    role="listitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // Add interaction logic here if needed
                      }
                    }}
                  >
                    <skill.icon 
                      size={32} 
                      className={`mx-auto mb-3 ${skill.color} group-hover:drop-shadow-glow transition-all duration-300`}
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium text-chrome-light group-hover:text-foreground transition-colors">
                      {skill.name}
                    </p>
                    <p className="text-xs text-chrome-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};