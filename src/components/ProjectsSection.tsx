import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GithubLogo, ArrowSquareOut } from 'phosphor-react';

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI, secure payments, and admin dashboard.',
      image: '/lovable-uploads/6b977a57-9096-434a-86b9-5854a12008b2.png',
      tech: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      github: 'https://github.com/Lamarimohamed/ecommerce-platform',
      live: 'https://github.com/Lamarimohamed/ecommerce-platform',
      featured: true
    },
    {
      id: 2,
      title: 'Carvila car dealer',
      description: 'Responsive landing page for a car dealership',
      image: '/lovable-uploads/38bd6065-fd87-44b4-9df6-44426cf53cdb.png',
      tech: ['CSS', 'html', 'javascript'],
      github: 'https://github.com/Lamarimohamed/carvila-car-dealer',
      live: 'https://lamarimohamed.github.io/carvila-car-dealer/',
      featured: true
    },
    {
      id: 3,
      title: 'FinEase Mobile App',
      description: 'Modern mobile banking application with clean UI, financial insights, and card management features.',
      image: '/finease-mobile-app.jpg',
      tech: ['React Native', 'TypeScript', 'Tailwind CSS', 'Financial APIs'],
      github: 'https://github.com/Lamarimohamed/finease-mobile-app',
      live: 'https://github.com/Lamarimohamed/finease-mobile-app',
      featured: true
    },
    {
      id: 4,
      title: 'Landing page Animation',
      description: 'very clean design and animation',
      image: '/lovable-uploads/38f87051-6538-4200-85f6-0b7df36d9861.png',
      tech: ['CSS', 'html', 'GSAP'],
      github: 'https://github.com/Lamarimohamed/landing-page-animation',
      live: 'https://lamarimohamed.github.io/landing-page-animation/',
      featured: false
    },
    {
      id: 5,
      title: 'Laptop UI store',
      description: 'simple responsive ui landing page made for selling laptops',
      image: '/lovable-uploads/c5d339a9-712b-4e03-8e38-c192900e8921.png',
      tech: ['CSS', 'html', 'javascript'],
      github: 'https://github.com/Lamarimohamed/laptop-ui-store',
      live: 'https://lamarimohamed.github.io/laptop-ui-store/',
      featured: false
    },
    {
      id: 6,
      title: 'LEO Burger',
      description: 'Responsive landing page for a burger restaurant',
      image: '/lovable-uploads/5110923c-b01c-4deb-9c99-53fb372554b7.png',
      tech: ['Three.js', 'GSAP', 'javascript'],
      github: 'https://github.com/Lamarimohamed/LEO-Burger',
      live: 'https://lamarimohamed.github.io/LEO-Burger/',
      featured: false
    }
  ];

  useEffect(() => {
    // Ensure sections are immediately visible and animated smoothly
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible
    gsap.set([titleRef.current, projectsRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Smooth entrance animations without delays
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
    );

    // Projects animation - faster
    const projectCards = projectsRef.current?.children;
    if (projectCards) {
      tl.fromTo(projectCards,
        { opacity: 0, y: 20, scale: 0.95, filter: 'blur(5px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-background"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          id="projects-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Featured <span className="glow-text">Projects</span>
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list" aria-label="Featured projects">
          {projects.map((project) => (
            <article 
              key={project.id}
              className={`glass-card p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                project.featured ? 'ring-2 ring-neon-blue/50' : ''
              }`}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  window.open(project.live, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute -top-3 -right-3 bg-neon-blue text-chrome-darker px-3 py-1 rounded-full text-xs font-bold">
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img 
                  src={project.image}
                  alt={`Screenshot of ${project.title} project`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  width={400}
                  height={200}
                  onError={(e) => {
                    console.log(`Project image failed to load: ${project.title}`);
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.svg';
                  }}
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-chrome-light group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-chrome-medium text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-chrome-dark/50 text-neon-cyan border border-neon-cyan/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <a 
                    href={project.github}
                    className="flex items-center gap-2 text-chrome-medium hover:text-neon-blue transition-colors text-sm group/link"
                    aria-label={`View source code for ${project.title} on GitHub`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubLogo size={16} className="group-hover/link:scale-110 transition-transform" />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.live}
                    className="flex items-center gap-2 text-chrome-medium hover:text-neon-purple transition-colors text-sm group/link"
                    aria-label={`View live demo of ${project.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowSquareOut size={16} className="group-hover/link:scale-110 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" aria-hidden="true">
          <div className="absolute top-1/4 right-1/6 w-40 h-40 rounded-full bg-gradient-glow floating"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-neon-purple/20 floating" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};