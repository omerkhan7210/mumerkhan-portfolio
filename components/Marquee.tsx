const items = [
  'WordPress Development',
  'MERN Stack',
  'Figma to Code',
  'n8n Automation',
  'WooCommerce',
  'Custom Plugins',
  'React.js',
  'Node.js',
  'SEO & Performance',
  'PHP Development',
  'Elementor',
  'MongoDB',
];

const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="bg-lime overflow-hidden py-4" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-ink font-sans font-bold text-xs uppercase tracking-widest px-8"
          >
            {item}
            <span className="opacity-30 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
