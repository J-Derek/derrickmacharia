import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-48 bg-bg-primary overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="font-mono text-sm tracking-widest text-accent uppercase">
                01 // Expertise
              </span>
              <h2 className="mt-6 font-display text-[clamp(40px,6vw,80px)] leading-[1] font-bold text-text-primary tracking-tighter">
                Solving complex problems<br />
                <span className="text-accent">with elegant code.</span>
              </h2>
            </div>

            <div className="space-y-8 text-lg md:text-xl text-text-secondary font-sans leading-relaxed max-w-xl">
              <p>
                I am a results-driven Software Developer and UI/UX Designer specialized in building high-performance, user-centered applications. I bridge the gap between technical complexity and intuitive design.
              </p>
              <p>
                From architecting robust backends to crafting polished, interactive frontends, I focus on scalability, performance, and building software that doesn't just work—it excels in the real world.
              </p>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <Magnetic intensity={0.15}>
              <div className="relative group cursor-none">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl group-hover:bg-accent/30 transition-colors duration-700"></div>
                
                <div className="relative z-10 w-full max-w-sm aspect-square md:aspect-[4/3] rounded-2xl bg-bg-elevated border border-border p-8 md:p-10 shadow-2xl transition-all duration-700 flex flex-col justify-center">
                  <div className="flex gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-accent/40"></div>
                    <div className="w-3 h-3 rounded-full bg-border"></div>
                    <div className="w-3 h-3 rounded-full bg-border"></div>
                  </div>
                  <div className="space-y-4 font-mono text-sm md:text-base">
                    <p className="text-accent">const developer = {'{'}</p>
                    <p className="text-text-primary pl-6">expertise: <span className="text-text-secondary">'Full Stack'</span>,</p>
                    <p className="text-text-primary pl-6">priority: <span className="text-text-secondary">'User Experience'</span>,</p>
                    <p className="text-text-primary pl-6">mission: <span className="text-text-secondary">'Ship Excellence'</span></p>
                    <p className="text-accent">{'}'};</p>
                    <p className="text-text-muted pt-4 font-italic">// No compromises.</p>
                  </div>
                </div>
              </div>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
