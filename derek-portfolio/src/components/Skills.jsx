import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Mobile & Web",
    skills: ["Flutter", "Dart", "React", "Next.js", "HTML", "CSS", "JavaScript"]
  },
  {
    category: "Backend & Data",
    skills: ["Node.js", "Firebase", "Supabase", "SQLite", "REST APIs", "JWT"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma"]
  },
  {
    category: "IT & Networking",
    skills: ["Network Setup", "Hardware", "OS Installation", "LAN/WAN"]
  }
];

const Skills = () => {
  return (
    <section className="py-24 bg-bg-secondary border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary">
            Technical Arsenal.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillsData.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1, duration: 0.5 }}
            >
              <h3 className="text-text-primary font-display text-xl font-medium mb-6 pb-2 border-b border-border inline-block">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-sm px-4 py-2 rounded-full border border-border bg-bg-primary text-text-secondary hover:text-bg-primary hover:bg-accent hover:border-accent transition-colors duration-300 cursor-default"
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
