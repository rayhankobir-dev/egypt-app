interface SectionTitleProps {
  title: string;
  description?: string;
}
function SectionTitle({ title, description = "" }: SectionTitleProps) {
  return (
    <div className="max-w-5xl flex flex-col gap-2">
      <h1 className="font-bold text-3xl">{title}</h1>
      <p className="font-light">{description}</p>
    </div>
  );
}

export default SectionTitle;
