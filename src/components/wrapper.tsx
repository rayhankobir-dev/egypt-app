import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

function Wrapper({ children, className }: WrapperProps) {
  return (
    <section className={cn("flex flex-col gap-7", className)}>
      {children}
    </section>
  );
}

export default Wrapper;
