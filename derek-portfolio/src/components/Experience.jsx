import { motion } from 'framer-motion';

const experiences = [
  {
    year: "2025",
    title: "Industrial Attachment",
    company: "KPLC Training School",
    description: "Handled networking & IT support while concurrently designing, developing, and deploying the AutoBite digital meal card system."
  },
  {
    year: "2024–2025",
    title: "Computer Repair Assistant",
    company: "Royal Cyber Café",
    description: "Performed hardware diagnostics, OS installations, and provided direct technical support to customers."
  },
  {
    year: "2024",
    title: "Cyber Café Manager",
    company: "Royal Cyber Café",
    description: "Managed an 11-workstation operation, taking full technical ownership of network stability and machine maintenance."
  },
  {
    year: "2024–Now",
    title: "Freelance Technical Writer",
    company: "Independent",
    description: "Creating comprehensive process and technical documentation for small business clients."
  }
];

const Experience = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-primary">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <span className="font-mono text-sm tracking-widest text-accent uppercase block mb-4">
            Background
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary">
            Experience.
          </h2>
        </motion.div>

        <div className="relative border-l border-border pl-8 md:pl-12 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-3 h-3 rounded-full bg-bg-primary border-2 border-border group-hover:border-accent group-hover:bg-accent transition-colors duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3">
                <span className="font-mono text-sm text-text-muted md:w-24 shrink-0">
                  {exp.year}
                </span>
                <h3 className="font-display text-2xl font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
                  {exp.title}
                </h3>
              </div>
              
              <div className="md:ml-32">
                <p className="text-text-primary font-medium mb-2">{exp.company}</p>
                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
