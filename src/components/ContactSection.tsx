import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Ensure sections are immediately visible and animated smoothly
    const tl = gsap.timeline({ delay: 0.1 });

    // Pre-set elements to be visible
    gsap.set([titleRef.current, formRef.current, socialRef.current], {
      opacity: 1,
      visibility: 'visible'
    });

    // Smooth entrance animations without delays
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
    );

    // Form animation - faster
    tl.fromTo(formRef.current,
      { opacity: 0, y: 20, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    );

    // Social links animation - faster
    tl.fromTo(socialRef.current,
      { opacity: 0, y: 20, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      // Use FormSubmit.co service to actually send emails
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', `New message from ${formData.name}`);
      formDataToSend.append('_captcha', 'false'); // Disable captcha for better UX

      // Submit to FormSubmit.co service (free email forwarding service)
      const response = await fetch('https://formsubmit.co/lamarimohamed92@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { key: 'github', href: 'https://github.com/Lamarimohamed', label: 'GitHub' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/mohamed-lamari-33737a302/', label: 'LinkedIn' },
    { key: 'behance', href: 'https://behance.net/LamariMohamed', label: 'Behance' },
    { key: 'whatsapp', href: 'https://wa.me/213795019617', label: 'WhatsApp' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 px-6 bg-background"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 
          ref={titleRef}
          id="contact-heading"
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Let's <span className="glow-text">Connect</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Contact form"
          >
            {/* Name Input */}
            <div className="group">
              <label htmlFor="name" className="block text-chrome-light text-sm font-medium mb-2">
                Full Name <span className="text-neon-pink">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-chrome-medium" aria-hidden="true"></i>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-14 pr-4 py-3 rounded-xl glass-card border border-chrome-border/30 bg-chrome-dark/20 text-foreground placeholder-chrome-medium focus:outline-none focus:border-neon-blue focus:glow transition-all duration-300"
                  placeholder="John Doe"
                  aria-describedby="name-error"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label htmlFor="email" className="block text-chrome-light text-sm font-medium mb-2">
                Email Address <span className="text-neon-pink">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-chrome-medium" aria-hidden="true"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-14 pr-4 py-3 rounded-xl glass-card border border-chrome-border/30 bg-chrome-dark/20 text-foreground placeholder-chrome-medium focus:outline-none focus:border-neon-blue focus:glow transition-all duration-300"
                  placeholder="your.email@example.com"
                  aria-describedby="email-error"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="group">
              <label htmlFor="message" className="block text-chrome-light text-sm font-medium mb-2">
                Message <span className="text-neon-pink">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl glass-card border border-chrome-border/30 bg-chrome-dark/20 text-foreground placeholder-chrome-medium focus:outline-none focus:border-neon-blue focus:glow transition-all duration-300 resize-none"
                placeholder="Tell me about your project or just say hello!"
                aria-describedby="message-error"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`neon-button w-full group flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-describedby="submit-status"
            >
              <i 
                className={`fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ${
                  isSubmitting ? 'animate-spin' : ''
                }`}
                aria-hidden="true"
              ></i>
              <span>
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
              </span>
            </button>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <div id="submit-status" className="text-green-400 text-sm text-center" role="status">
                ✅ Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div id="submit-status" className="text-red-400 text-sm text-center" role="alert">
                ❌ Sorry! There was an error sending your message. Please try again.
              </div>
            )}
          </form>

          {/* Contact Info & Social Links */}
          <div ref={socialRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-chrome-light">
                Get In Touch
              </h3>
              <p className="text-chrome-medium leading-relaxed mb-8">
                I'm always open to discussing new opportunities, creative projects, 
                or just having a friendly chat about technology and development. 
                Feel free to reach out through any of the channels below!
              </p>
            </div>

            {/* Removed Contact Details (email and availability) as requested */}

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-medium mb-4 text-chrome-light">
                Connect With Me
              </h4>
              <div className="grid grid-cols-2 gap-4" role="list" aria-label="Social media links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="glass-card p-4 flex items-center gap-3 group hover:scale-105 hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300 text-chrome-medium hover:text-neon-purple"
                    role="listitem"
                    aria-label={`Visit ${social.label} profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i 
                      className={`fab fa-${social.key} text-xl group-hover:scale-110 transition-transform duration-300`} 
                      aria-hidden="true"
                    ></i>
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            {/* Removed from Let's Connect as requested */}
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" aria-hidden="true">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-neon-pink/30 floating"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-neon-cyan/40 floating" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </section>
  );
};