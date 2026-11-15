/** Hairline-topped section heading row shared by every home section. */
const SectionHeader = ({ title, children }) => (
  <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 md:mb-16">
    <h2 className="label">{title}</h2>
    {children}
  </div>
);

export default SectionHeader;
