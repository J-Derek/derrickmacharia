import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-bg-secondary">
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
                About Me
              </span>
              <h2 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-[1.1] font-semibold text-text-primary">
                Building software<br />
                that actually ships.
              </h2>
            </div>

            <div className="space-y-6 text-lg text-text-secondary font-sans leading-relaxed">
              <p>
                CS student at Daystar University finishing in 2026. I don't just write code — I identify real problems, pitch solutions to stakeholders, and build working software that people actually use.
              </p>
              <p>
                From digitizing KPLC's cafeteria system to building M-Pesa-integrated delivery apps, my projects live in the real world.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-8">
              {[
                { label: 'Projects', value: '6' },
                { label: 'Deployments', value: '2' },
                { label: 'Industrial Attachment', value: '1' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-semibold text-text-primary">{stat.value}</span>
                  <span className="font-mono text-xs tracking-wider text-text-muted uppercase">{stat.label}</span>
                </div>
              ))}
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
                  <p className="text-text-primary pl-4">name: <span className="text-text-secondary">'Derek Macharia'</span>,</p>
                  <p className="text-text-primary pl-4">focus: <span className="text-text-secondary">'Real-world Solutions'</span>,</p>
                  <p className="text-text-primary pl-4">stack: <span className="text-text-secondary">['Flutter', 'React', 'Node']</span></p>
                  <p className="text-accent">{'}'};</p>
                  <p className="text-text-muted pt-2">// Ship it.</p>
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
