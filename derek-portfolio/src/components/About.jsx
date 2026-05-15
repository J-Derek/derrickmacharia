import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-bg-primary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="font-mono text-sm tracking-widest text-accent uppercase">
                Expertise
              </span>
              <h2 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-[1.1] font-semibold text-text-primary">
                Solving complex problems<br />
                with elegant code.
              </h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary font-sans leading-relaxed">
              <p>
                I am a results-driven Software Developer and UI/UX Designer specialized in building high-performance, user-centered applications. I bridge the gap between technical complexity and intuitive design, ensuring that every product I build provides real value to its users and stakeholders.
              </p>
              <p>
                From architecting robust backends to crafting polished, interactive frontends, I take full ownership of the product lifecycle. My focus is on scalability, performance, and building software that doesn't just work—it excels in the real world.
              </p>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-2xl bg-bg-elevated border border-border overflow-hidden relative flex items-center justify-center group">
              {/* Abstract decorative element representing code/structure */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50"></div>
              
              <div className="relative z-10 w-3/4 max-w-sm rounded-xl bg-bg-primary border border-border p-6 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:glow-effect">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <p className="text-accent">const developer = {'{'}</p>
                  <p className="text-text-primary pl-4">expertise: <span className="text-text-secondary">'Full Stack'</span>,</p>
                  <p className="text-text-primary pl-4">priority: <span className="text-text-secondary">'User Experience'</span>,</p>
                  <p className="text-text-primary pl-4">mission: <span className="text-text-secondary">'Ship Excellence'</span></p>
                  <p className="text-accent">{'}'};</p>
                  <p className="text-text-muted pt-2">// No compromises.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
