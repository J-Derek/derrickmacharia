import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const STACK = [
  { category: 'Mobile', items: ['Flutter', 'Dart', 'Firebase', 'Supabase'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'SQL'] },
  { category: 'Tooling', items: ['Git', 'GitHub', 'Linux', 'Vercel'] },
];

const Stack = () => {
  return (
    <section id="stack" className="border-t border-border py-16 md:py-28">
      <div className="container-page">
        <SectionHeader title="Stack">
          <p className="label">Tools I reach for first</p>
        </SectionHeader>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STACK.map((column, i) => (
            <Reveal key={column.category} delay={i * 0.06} className="border-t border-border pt-5">
              <h3 className="label mb-5">{column.category}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
