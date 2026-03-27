export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="px-5 py-4 border-b border-gray-200">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
