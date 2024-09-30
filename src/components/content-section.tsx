import { cn } from "@/lib/utils";

interface ContentSectionProps {
  className?: string;
  title?: string;
  content: string;
}

function ContentSection({ className, title, content }: ContentSectionProps) {
  return (
    <section className={cn("my-5 space-y-5", className)}>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>
      <div
        className="flex flex-col gap-1.5 jodit-wysiwyg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
export default ContentSection;
