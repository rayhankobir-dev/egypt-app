import { Menu } from "@/types";
import { MenuIcon } from "lucide-react";
import AppLogo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileMenu({ menus }: { menus: Menu[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon size={30} />
      </SheetTrigger>
      <SheetContent side="right" className="w-full !px-0">
        <div className="h-screen overflow-hidden overflow-y-scroll">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="w-full h-14 inline-flex items-center gap-2 border-b px-4 text-orange-600"
          >
            <img
              className="h-12 w-auto"
              src={AppLogo}
              width={100}
              height={20}
              alt="Logo"
            />
          </Link>
          <div className="h-[80%] overflow-y-scroll flex flex-col">
            {menus.map(({ label, url, icon: Icon }) => (
              <NavLink
                key={url}
                to={url}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3.5 border-b text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-green-800 bg-gray-100"
                      : "hover:text-green-800 hover:bg-gray-100"
                  }`
                }
                aria-label={label}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
