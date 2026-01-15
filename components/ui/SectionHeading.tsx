export function SectionHeading({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      {eyebrow ? (
        <div className="mb-3 text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="h2">{title}</h2>
      {subtitle ? <p className="mt-4 p-lead">{subtitle}</p> : null}
    </div>
  );
}
