import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const EMAIL = 'derrickmacharia2022@gmail.com';
const WHATSAPP = '254792612021';

const fieldClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted/70 transition-colors focus:border-foreground focus:outline-none';

const Field = ({ id, label, children }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="label">
      {label}
    </label>
    {children}
  </div>
);

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Honeypot: real users never fill this in
    if (formData.get('botcheck')) {
      setIsSubmitting(false);
      return;
    }
    formData.append('access_key', 'a4306a98-4513-4801-b0eb-5b71387f556a');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (result.success) {
        setSent(true);
        resetTimer.current = setTimeout(() => setSent(false), 6000);
      } else {
        console.error('Submission failed', result);
        setError(result.message || 'Failed to send message. Please message me via WhatsApp or email directly.');
      }
    } catch (err) {
      console.error('Error submitting form', err);
      setError('Network error sending message. Please reach out via WhatsApp or email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-border py-16 md:py-28">
      <div className="container-page">
        <SectionHeader title="Contact" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal as="p" className="font-serif text-4xl leading-[1.05] md:text-6xl">
              Got a project in mind?
            </Reveal>

            <a href={`mailto:${EMAIL}`} className="link-underline mt-10 inline-block break-all text-lg md:text-xl">
              {EMAIL}
            </a>

            <dl className="mt-10 border-t border-border text-sm">
              <div className="flex gap-4 border-b border-border py-3">
                <dt className="label w-24 shrink-0">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Message me
                  </a>
                </dd>
              </div>
              <div className="flex gap-4 border-b border-border py-3">
                <dt className="label w-24 shrink-0">Location</dt>
                <dd>Nairobi, Kenya</dd>
              </div>
              <div className="flex gap-4 border-b border-border py-3">
                <dt className="label w-24 shrink-0">Status</dt>
                <dd>Open for work</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {sent ? (
              <p role="status" className="flex h-64 items-center text-lg text-muted">
                Message sent. I will get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field id="contact-name" label="Name">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </Field>
                  <Field id="contact-email" label="Email">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={fieldClass}
                    />
                  </Field>
                </div>

                <Field id="contact-project" label="Project (optional)">
                  <input
                    id="contact-project"
                    name="project"
                    type="text"
                    placeholder="What is it?"
                    className={fieldClass}
                  />
                </Field>

                <Field id="contact-message" label="Message">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="What are you trying to build?"
                    className={`${fieldClass} resize-none`}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </button>
                  {error && (
                    <p role="alert" className="text-sm text-danger">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
