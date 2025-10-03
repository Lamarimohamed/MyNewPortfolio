import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 60, description: 'Modern React ecosystem and Next.js framework' },
        { name: 'TypeScript', level: 40, description: 'Type-safe JavaScript development' },
        { name: 'javascript', level: 70, description: 'Progressive JavaScript framework' },
        { name: 'CSS/SCSS', level: 80, description: 'Advanced styling and animations' },
      ]
    },
    {
      title: 'Backend Development', 
      skills: [
        { name: 'Node.js', level: 50, description: 'Server-side JavaScript runtime' },
        { name: 'Python/Php', level: 60, description: 'Python web development and automation' },
        { name: 'PostgreSQL', level: 60, description: 'Relational database management' },
        { name: 'MongoDB', level: 45, description: 'NoSQL database solutions' },
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Docker', level: 50, description: 'Containerization and deployment' },
        { name: 'AWS', level: 50, description: 'Cloud infrastructure and services' },
        { name: 'Git', level: 80, description: 'Version control and collaboration' },
        { name: 'GSAP', level: 60, description: 'Advanced animations and interactions' },
      ]
    }
  ];

  useEffect(() => {
    // Ensure sections are immediately visible and animated smoothly
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible
    gsap.set([titleRef.current, skillsRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Smooth entrance animations without delays
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
    );

    // Skills animation - faster
    const skillCategories = skillsRef.current?.children;
    if (skillCategories) {
      tl.fromTo(skillCategories,
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
      className="min-h-screen flex items-center py-20 px-6 relative bg-background"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={titleRef}
          id="skills-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Technical <span className="glow-text">Skills</span>
        </h2>

        <div ref={skillsRef} className="grid lg:grid-cols-3 gap-12" role="list" aria-label="Skill categories">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass-card p-8 optimize-performance" role="listitem">
              <h3 className="text-2xl font-semibold mb-8 text-center text-chrome-light">
                {category.title}
              </h3>
              
              <div className="space-y-6" role="list" aria-label={`${category.title} skills`}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} role="listitem">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-chrome-medium font-medium">{skill.name}</span>
                      <span className="text-neon-blue text-sm font-semibold" aria-label={`${skill.level}% proficiency`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="skill-bar" aria-label={`${skill.name} skill level ${skill.level}%`}>
                      <div 
                        className="skill-bar-fill"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`
                        }}
                        aria-hidden="true"
                      ></div>
                    </div>
                    
                    {/* Skill Description Tooltip */}
                    <div className="mt-2">
                      <p className="text-xs text-chrome-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/6 w-24 h-24 rounded-full bg-neon-blue/10 floating"></div>
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-neon-purple/5 floating" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-16 h-16 rounded-full bg-neon-cyan/15 floating" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};