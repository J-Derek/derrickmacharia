import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Programming & Development",
    skills: ["Flutter", "Dart", "React", "Next.js", "JavaScript", "HTML", "CSS", "Java", "C", "C++"]
  },
  {
    category: "Design & System Analysis",
    skills: ["Figma", "Prototyping", "Wireframing", "UX Research", "System Mapping", "User Testing", "Design Systems", "Visual Design"]
  },
  {
    category: "Database & Tools",
    skills: ["Supabase", "Firebase", "PostgreSQL", "SQLite", "Git", "GitHub", "VS Code", "Android Studio"]
  },
  {
    category: "Professional Values",
    skills: ["Leadership", "Communication", "Teamwork", "Problem-Solving", "Critical Thinking", "Adaptability", "Time Management"]
  }
];

const Skills = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-primary border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[1.1] font-semibold text-text-primary">
            The Toolkit.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {skillsData.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1, duration: 0.5 }}
              className="group"
            >
              <h3 className="text-text-primary font-display text-2xl font-medium mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-accent group-hover:w-12 transition-all"></span>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-sm px-5 py-2.5 rounded-lg border border-border bg-bg-elevated/30 text-text-secondary hover:text-text-primary hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
