import "@/App.css";
import Router from "@/routes";
import { AuthProvider } from "@/contexts/AuthContext";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}
