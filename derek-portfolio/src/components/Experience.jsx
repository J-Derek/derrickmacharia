import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: "Software Developer (Contract)",
    company: "KPLC Training School",
    location: "Nairobi, Kenya",
    period: "May 2025 — Aug 2025",
    description: "I architected and deployed AutoBite, a mission-critical enterprise meal card system that replaced legacy manual processes with a real-time QR verification platform. My role involved full-stack development, pitching to senior stakeholders, and managing the on-site deployment strategy.",
    tags: ["Flutter", "Firebase", "QR Integration", "System Architecture"]
  },
  {
    title: "Operations Lead & IT Support",
    company: "Royal Cyber Café",
    location: "Nairobi, Kenya",
    period: "2020 — 2024",
    description: "Managed IT operations for a high-traffic facility with 11 workstations. I was responsible for system maintenance, network security, and technical support for enterprise clients while optimizing hardware performance for daily service delivery.",
    tags: ["System Admin", "Networking", "Technical Support", "Operations"]
  }
];

const education = [
  {
    degree: "B.Sc. in Computer Science",
    school: "Daystar University",
    location: "Nairobi, Kenya",
    period: "2022 — 2026",
    description: "My studies focused on software engineering, data structures, and system analysis, where I developed multiple production-grade projects as part of the core curriculum."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-bg-primary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Header & Tenure Highlight */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-4">
              Career Path
            </span>
            <h2 className="font-display text-[clamp(40px,5vw,64px)] leading-[1.1] font-semibold text-text-primary mb-8">
              Experience<br />& Education.
            </h2>
            
            <div className="bg-bg-elevated border border-border p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-accent/10 transition-colors"></div>
              <div className="relative z-10">
                <p className="font-display text-5xl font-bold text-accent mb-2">4</p>
                <p className="text-text-primary font-medium text-lg mb-1">Years Experience</p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Specialized in Flutter development and full-stack system architecture since 2022.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cards Container */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Professional Experience */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-accent" size={24} />
                <h3 className="font-display text-2xl font-semibold text-text-primary uppercase tracking-wider">Professional</h3>
              </div>
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-primary border border-border p-8 rounded-2xl hover:border-accent/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{exp.title}</h4>
                      <p className="text-text-secondary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center gap-2 text-text-muted text-sm font-mono uppercase tracking-wider">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-text-muted text-sm font-mono uppercase tracking-wider">
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-bg-elevated text-text-muted rounded-full border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Academic History */}
            <div className="space-y-8 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-accent" size={24} />
                <h3 className="font-display text-2xl font-semibold text-text-primary uppercase tracking-wider">Academic</h3>
              </div>
              
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-bg-primary border border-border p-8 rounded-2xl border-l-4 border-l-accent"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-1">{edu.degree}</h4>
                      <p className="text-text-secondary font-medium">{edu.school}</p>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm font-mono uppercase tracking-wider">
                      <Calendar size={14} />
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
