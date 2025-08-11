import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Calendar, MapPin, Briefcase, ArrowRight } from 'phosphor-react';

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
      description: 'Assisted in designing user interfaces and improving user experience for web and mobile applications. Focused on creating intuitive designs that enhance user engagement and accessibility.',
      technologies: ['UX Research', 'XD', 'Figma', 'UX', 'UI'],
      achievements: [
        'Created wireframes, mockups, and interactive prototypes for multiple projects',
        'Collaborated with developers to ensure design consistency and usability across platforms'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Freelance',
      period: '2023 - Present',
      location: 'Remote',
      description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences. Mentored junior developers and implemented modern development practices.',
      technologies: ['React', 'TypeScript', 'Bootstrap', 'Next.js', 'JavaScript'],
      achievements: [
        'Reduced bundle size by 30% through code optimization',
        'Implemented accessibility improvements across multiple projects'
      ]
    },
    {
      role: 'System Information Intern',
      company: 'Ministry of Post and Telecommunications',
      period: '12/2024 - 03/2025',
      location: 'Algiers, Algeria',
      description: 'Collaborated with senior developers and received mentorship that helped shape the direction of my graduation project (PFE) focused on digital financial services and secure payment systems.',
      technologies: ['Flutter', 'React', 'Express', 'PostgreSQL', 'Git'],
      achievements: [
        'Gained insights into secure digital systems, which sparked a strong interest in cryptography',
        'Explored cryptography-related concepts and technologies for financial applications'
      ]
    },
    {
      role: 'Graphic & Social Media Designer',
      company: 'Freelance',
      period: '2022 - 2023',
      location: 'Remote',
      description: 'Designed engaging visuals for social media platforms, including posts, stories, banners, and ads. Maintained brand consistency across various digital touchpoints.',
      technologies: ['Editing', 'Photoshop', 'Canva', 'Adobe Creative Suite'],
      achievements: [
        'Ensured brand consistency across all designs using tools like Photoshop and Illustrator',
        'Created compelling visual content that increased engagement rates'
      ]
    },
    {
      role: 'Media Buyer Expert',
      company: 'Freelance',
      period: '2021 - 2023',
      location: 'Remote',
      description: 'Planned, launched, and optimized paid advertising campaigns across platforms like Facebook, Instagram, and Google Ads. Analyzed performance metrics to maximize ROI.',
      technologies: ['CTR Optimization', 'ROI Analysis', 'Google Ads', 'CPC Management'],
      achievements: [
        'Collaborated with design and content teams to create effective ad creatives',
        'Successfully managed campaigns that drove significant audience engagement and conversions'
      ]
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
    // Simple animation without blur effects
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible
    gsap.set([titleRef.current, timelineRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Title animation
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Timeline items animation
    const timelineItems = timelineRef.current?.children;
    if (timelineItems) {
      tl.fromTo(timelineItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
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
            // Mobile Layout: Single column with timeline dots - FIXED LAYOUT
            <div className="relative" role="list" aria-label="Professional experience timeline">
              {/* Mobile Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan" aria-hidden="true"></div>
              
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-8 pl-16" role="listitem">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-gradient-primary pulse-glow z-10" aria-hidden="true"></div>
                  
                  {/* Content Card - Full width with proper spacing */}
                  <article className="glass-card p-4 group hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 w-full">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-chrome-light group-hover:text-neon-blue transition-colors leading-tight break-words">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-neon-blue font-medium mt-2 flex-wrap">
                        <Briefcase size={16} aria-hidden="true" />
                        <span className="text-sm break-words">{exp.company}</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-2 mb-4 text-chrome-medium text-sm">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Calendar size={14} aria-hidden="true" />
                        <span className="break-words">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <MapPin size={14} aria-hidden="true" />
                        <span className="break-words">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-chrome-medium text-sm leading-relaxed mb-4 break-words overflow-wrap-anywhere">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    {exp.achievements && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-chrome-light mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-chrome-medium text-xs">
                              <ArrowRight size={12} className="text-neon-blue mt-1 flex-shrink-0" aria-hidden="true" />
                              <span className="leading-relaxed break-words overflow-wrap-anywhere flex-1">{achievement}</span>
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
                          className="px-2 py-1 text-xs font-medium rounded-md bg-chrome-dark/50 text-neon-cyan border border-neon-cyan/20 break-words"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Layout: Traditional alternating timeline
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
                          <div className="flex items-center gap-2 text-neon-blue font-medium mt-2">
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
                            <h4 className="text-sm font-semibold text-chrome-light mb-3">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-chrome-medium text-xs">
                                  <ArrowRight size={12} className="text-neon-blue mt-1 flex-shrink-0" aria-hidden="true" />
                                  <span className="leading-relaxed">{achievement}</span>
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30" aria-hidden="true">
          <div className="absolute top-1/4 right-1/6 w-40 h-40 rounded-full bg-gradient-glow floating"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full bg-neon-purple/20 floating" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};