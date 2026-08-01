import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const Contact = () => {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    formData.append("access_key", "a4306a98-4513-4801-b0eb-5b71387f556a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setSent(true);
      } else {
        console.error("Submission failed", result);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
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
              { label: "Email", value: "derrickmacharia2022@gmail.com", isEmail: true },
              { label: "WhatsApp", value: "+254735319205", isWhatsapp: true },
              { label: "Location", value: "Nairobi, Kenya" },
              { label: "Status", value: "Open for work" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-center">
                <span className="text-foreground/30 w-20">{item.label}</span>
                {item.isWhatsapp ? (
                  <a href={`https://wa.me/${item.value.replace('+', '')}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent transition-colors flex items-center">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    Message me
                  </a>
                ) : item.isEmail ? (
                  <a href={`mailto:${item.value}`} className="text-foreground hover:text-accent transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-foreground">{item.value}</span>
                )}
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
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-8 py-3 bg-foreground text-background text-sm font-mono tracking-widest uppercase hover:bg-accent hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
