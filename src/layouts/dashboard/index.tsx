import Navbar from "../root/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full max-w-7xl mx-auto flex flex-col items-center mt-28 px-6 lg:px-0 pb-8">
        {children}
      </main>
    </>
  );
}
