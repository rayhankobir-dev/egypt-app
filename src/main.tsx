import "@/index.css";
import App from "@/App.tsx";
import { Toaster } from "react-hot-toast";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <StrictMode>
          <App />
          <Toaster />
        </StrictMode>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
