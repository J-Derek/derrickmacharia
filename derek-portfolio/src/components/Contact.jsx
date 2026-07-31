import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const Contact = () => {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left */}
        <div className="md:col-span-5">
          <h2 className="font-mono text-xs tracking-widest uppercase text-foreground/40 mb-8">
            Contact
          </h2>
          <motion.p
            initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground mb-10"
          >
            Got a project
            <br />
            in mind?
          </motion.p>

          <div className="space-y-4 font-mono text-sm">
            {[
              { label: "Email", value: "hello@derrickmacharia.dev" },
              { label: "Location", value: "Nairobi, Kenya" },
              { label: "Status", value: "Open for work" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-foreground/30 w-20">{item.label}</span>
                <span className="text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          {sent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-64 text-foreground/60 font-mono text-sm"
            >
              Message sent. I will get back to you soon.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-xs tracking-widest uppercase text-foreground/40"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-xs tracking-widest uppercase text-foreground/40"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className="bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-project"
                  className="font-mono text-xs tracking-widest uppercase text-foreground/40"
                >
                  Project
                </label>
                <input
                  id="contact-project"
                  name="project"
                  type="text"
                  placeholder="Tell me about your project"
                  className="bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-xs tracking-widest uppercase text-foreground/40"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="What are you trying to build?"
                  className="bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-3 bg-foreground text-background text-sm font-mono tracking-widest uppercase hover:bg-accent hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
