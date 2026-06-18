interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating: number;
  source: string;
}

export default function TestimonialCard({
  name,
  role,
  text,
  rating,
  source,
}: TestimonialCardProps) {
  return (
    <div className="card">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            ★
          </span>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-300 mb-4 italic">"{text}"</p>

      {/* Author Info */}
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
        <p className="text-xs text-cyan-400/70 mt-1">Via {source}</p>
      </div>
    </div>
  );
}
