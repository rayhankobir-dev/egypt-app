import { lazy, Suspense } from "react";
import RootLayout from "@/layouts/root";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import Dashboard from "@/pages/dashboard";
import Spinner from "@/components/spinner";
import AdminContacts from "@/pages/dashboard/contacts";
import AdminGallery from "@/pages/dashboard/gallery";

export const HomePage = lazy(() => import("@/pages/home"));
export const LoginPage = lazy(() => import("@/pages/login"));
export const CitiesPage = lazy(() => import("@/pages/cities"));
export const CitysSinglePage = lazy(() => import("@/pages/city"));
export const GalleryPage = lazy(() => import("@/pages/gallery"));
export const ContactPage = lazy(() => import("@/pages/contact"));
export const Page404 = lazy(() => import("@/pages/page-not-found"));

// ----------------------------------------------------------------------

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, isAuthenticating } = useAuth();
  if (isAuthenticating) return <Spinner />;
  if (!isAuth && !isAuthenticating) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <RootLayout>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </RootLayout>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "cities",
          element: <CitiesPage />,
        },
        {
          path: "cities/:slug",
          element: <CitysSinglePage />,
        },
        {
          path: "gallery",
          element: <GalleryPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "404",
          element: <Page404 />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
    // Protected admin routes
    {
      path: "admin",
      element: (
        <ProtectedRoute>
          <RootLayout>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </RootLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "contacts",
          element: <AdminContacts />,
        },
        {
          path: "contact",
          element: <AdminContacts />,
        },
        {
          path: "gallery",
          element: <AdminGallery />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
