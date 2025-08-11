import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Briefcase, ArrowRight } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const experiences = [
    {
      role: 'UI UX Designer',
      company: 'QOTRA',
      period: '03/2025 - Present',
      location: 'Remote',
      description: 'Assisted in designing user interfaces and improving user experience for web and mobile applications',
      technologies: ['UX Research', 'XD', 'Figma', 'UX', 'UI'],
      achievements: ['Created wireframes, mockups, and interactive prototypes','Collaborated with developers to ensure design consistency and usability across platforms']
    },
    {
      role: 'Frontend Developer',
      company: 'Freelance',
      period: '2023 - Present',
      location: 'Remote',
      description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences. Mentored junior developers.',
      technologies: ['React', 'TypeScript', 'Bootstrap', 'Next.js', 'javascript'],
      achievements: [ 'Reduced bundle size by 30%', 'Implemented accessibility improvements']
    },
    {
      role: 'System Information Intern',
      company: 'Ministry of Post and Telecommunications',
      period: '12/2024 - 03/2025',
      location: 'Algiers, Algeria',
      description: 'Collaborated with senior developers and received mentorship that helped shape the direction of my graduation project (PFE) focused on digital financial services',
      technologies: ['Flutter', 'React', 'Express', 'Progressql', 'Git'],
      achievements: ['Gained insights into secure digital systems, which sparked a strong interest in cryptography and led me to explore Crypthage-related concepts and technologies.']
    },
    {
      role: 'Graphic & Social Media Designer',
      company: 'Freelance',
      period: '2022 - 2023',
      location: 'Remote',
      description: 'Designed engaging visuals for social media platforms, including posts, stories, banners, and ads.',
      technologies: [ 'Editing', 'PS', 'Canva', 'Adobe'],
      achievements: ['Ensured brand consistency across all designs while using tools like Photoshop, Illustrator,']
    },
    {
      role: 'Media Buyer Expert',
      company: 'Freelance',
      period: '2021 - 2023',
      location: 'Remote',
      description: 'Planned, launched, and optimized paid advertising campaigns across platforms like Facebook, Instagram, and Google Ads.',
      technologies: ['CTR', 'ROI', 'GOOGLE ADS', 'CPC'],
      achievements: ['Collaborated with design and content teams to create effective ad creatives and drive audience engagement.']
    }
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // On mobile, ensure title is visible immediately
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)' });
      }
      if (timelineRef.current) {
        gsap.set(timelineRef.current.children, { opacity: 1, x: 0, filter: 'blur(0px)' });
      }
      return;
    }

    // Desktop/tablet animations - ensure immediate visibility
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible
    gsap.set([titleRef.current, timelineRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Smooth entrance animations without delays
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
    );

    // Timeline items animation - faster
    const timelineItems = timelineRef.current?.children;
    if (timelineItems) {
      tl.fromTo(timelineItems,
        { opacity: 0, x: (index) => index % 2 === 0 ? -50 : 50, filter: 'blur(5px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-background"
      id="timeline"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          id="timeline-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Professional <span className="glow-text">Journey</span>
        </h2>

        <div ref={timelineRef} className="relative">
          {isMobile ? (
            // Mobile Layout: Centered cards like projects section
            <div className="max-w-sm mx-auto space-y-8 px-4" role="list" aria-label="Professional experience timeline">
              {experiences.map((exp, index) => (
                <article key={index} className="glass-card p-6 group hover:scale-105 hover:shadow-2xl transition-all duration-500 w-full" role="listitem">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-chrome-light group-hover:text-neon-blue transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-neon-blue font-medium mt-1">
                      <Briefcase size={16} aria-hidden="true" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-col gap-2 mb-4 text-chrome-medium text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} aria-hidden="true" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} aria-hidden="true" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-chrome-medium text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-chrome-light mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-chrome-medium text-xs">
                            <ArrowRight size={12} className="text-neon-blue" aria-hidden="true" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-chrome-dark/50 text-neon-cyan border border-neon-cyan/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            // Desktop/Tablet Layout: Animated timeline
            <>
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan" aria-hidden="true"></div>

              <div role="list" aria-label="Professional experience timeline">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center mb-16 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    role="listitem"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-primary pulse-glow z-10" aria-hidden="true"></div>

                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <article className="glass-card p-6 group hover:scale-105 transition-all duration-300">
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-chrome-light group-hover:text-neon-blue transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 text-neon-blue font-medium mt-1">
                            <Briefcase size={16} aria-hidden="true" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-col gap-2 mb-4 text-chrome-medium text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} aria-hidden="true" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} aria-hidden="true" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-chrome-medium text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Achievements */}
                        {exp.achievements && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-chrome-light mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-chrome-medium text-xs">
                                  <ArrowRight size={12} className="text-neon-blue" aria-hidden="true" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 text-xs font-medium rounded-md bg-chrome-dark/50 text-neon-cyan border border-neon-cyan/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="w-5/12" aria-hidden="true"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/6 w-20 h-20 rounded-full bg-neon-purple/10 floating"></div>
          <div className="absolute bottom-1/4 right-1/6 w-16 h-16 rounded-full bg-neon-cyan/15 floating" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};