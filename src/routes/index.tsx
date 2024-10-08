import { lazy, Suspense } from "react";
import RootLayout from "@/layouts/root";
import { useAuth } from "@/hooks/use-auth";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import AddCity from "@/pages/dashboard/add-city";
import AdminCities from "@/pages/dashboard/cities";
import UpdateCity from "@/pages/dashboard/update-city";
import AddSlide from "@/pages/dashboard/add-slide";
import DashboardLayout from "@/layouts/dashboard";

export const HomePage = lazy(() => import("@/pages/home"));
export const LoginPage = lazy(() => import("@/pages/login"));
export const CitiesPage = lazy(() => import("@/pages/cities"));
export const CitysSinglePage = lazy(() => import("@/pages/city"));
export const GalleryPage = lazy(() => import("@/pages/gallery"));
export const ContactPage = lazy(() => import("@/pages/contact"));
export const AdminGallery = lazy(() => import("@/pages/dashboard/gallery"));
export const AdminContacts = lazy(() => import("@/pages/dashboard/contacts"));
export const DashboardPage = lazy(() => import("@/pages/dashboard"));
export const Page404 = lazy(() => import("@/pages/page-not-found"));
export const Spinner = lazy(() => import("@/components/spinner"));

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
          <DashboardLayout>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />,
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
          path: "cities",
          element: <AdminCities />,
        },
        {
          path: "cities/add",
          element: <AddCity />,
        },
        {
          path: "slide/add",
          element: <AddSlide />,
        },
        {
          path: "cities/update/:slug",
          element: <UpdateCity />,
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
