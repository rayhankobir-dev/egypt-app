export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full w-full items-center justify-center">
      {children}
    </main>
  );
}
