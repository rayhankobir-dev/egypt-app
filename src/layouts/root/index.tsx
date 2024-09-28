import Navbar from "./navbar";
import Footer from "./footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl pt-24 pb-10 mx-auto px-6 md:px-6 lg:px-4 xl:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
