import Navbar from "./navbar";
import Footer from "./footer";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-7xl pt-24 pb-10 mx-auto px-6 md:px-6 lg:px-4 xl:px-0">
        {children}
      </main>
      <Footer />
      <div className="fixed bottom-5 right-5">
        <Button
          onClick={handleScrollToTop}
          className="w-9 h-9 p-1 bg-green-800 hover:bg-green-700 rounded-full duration-300"
        >
          <ArrowUp size={18} />
        </Button>
      </div>
    </>
  );
}
