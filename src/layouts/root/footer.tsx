import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AppLogo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col border-t">
        <div className="w-full draggable">
          <div className="container flex flex-col mx-auto">
            <div className="flex flex-col items-center w-full my-5">
              <span className="mb-8">
                <img
                  className="h-16 w-auto"
                  src={AppLogo}
                  width={100}
                  height={20}
                  alt="Logo"
                />
              </span>
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "text-gray-600 hover:text-gray-900",
                        isActive ? "text-green-800" : "hover:text-green-800"
                      )
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      cn(
                        "text-gray-600 hover:text-gray-900",
                        isActive ? "text-green-800" : "hover:text-green-800"
                      )
                    }
                  >
                    Gallery
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      cn(
                        "text-gray-600 hover:text-gray-900",
                        isActive ? "text-green-800" : "hover:text-green-800"
                      )
                    }
                  >
                    Contact
                  </NavLink>
                </div>
                <div className="flex items-center gap-8">
                  <Link to="/" className="text-grey-700 hover:text-grey-900">
                    <Facebook />
                  </Link>
                  <Link to="/" className="text-grey-700 hover:text-grey-900">
                    <Twitter />
                  </Link>
                  <Link to="/" className="text-grey-700 hover:text-grey-900">
                    <Youtube />
                  </Link>
                  <Link to="/" className="text-grey-700 hover:text-grey-900">
                    <Linkedin />
                  </Link>
                  <Link to="/" className="text-grey-700 hover:text-grey-900">
                    <Instagram />
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-light leading-7 text-center text-grey-700">
                  2024 Travel World. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
