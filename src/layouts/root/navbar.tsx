import { Menu } from "@/types";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";
import AppLogo from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
import AuthenticatedMenu from "@/layouts/root/authenticated-menu";
import { Contact, GalleryHorizontalEnd, Home, Map } from "lucide-react";

const menus: Menu[] = [
  { label: "Home", url: "/", icon: Home },
  { label: "Cities", url: "/cities", icon: Map },
  { label: "Gallery", url: "/gallery", icon: GalleryHorizontalEnd },
  { label: "Contact", url: "/contact", icon: Contact },
];

export default function Navbar() {
  return (
    <header
      className={cn("w-full fixed top-0 left-0 z-20 duration-700 bg-white")}
    >
      <nav
        className={cn(
          "max-w-7xl mx-auto flex justify-between items-center gap-3 py-3.5 px-6 lg:px-2 border-b shadow lg:rounded-b-xl"
        )}
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-xl text-black"
        >
          <img
            src={AppLogo}
            className="h-12 w-auto"
            width={200}
            height={200}
            alt="Logo"
          />
        </NavLink>

        <div className="flex items-center gap-2 text-md">
          <ul className="hidden lg:flex items-center gap-5 px-2.5">
            {menus.map(({ label, url, icon: Icon }, index) => (
              <NavLink
                key={index}
                to={url}
                className={({ isActive }) =>
                  `inline-flex items-center gap-0.5 text-black font-medium duration-300 ${
                    isActive ? "text-green-800" : "hover:text-green-800"
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {label}
              </NavLink>
            ))}
          </ul>

          <AuthenticatedMenu />

          <div className="lg:hidden">
            <MobileMenu menus={menus} />
          </div>
        </div>
      </nav>
    </header>
  );
}
