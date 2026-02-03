"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../../app/lib/utils";
import { ModeToggle } from "@/components/ui/modeToggle";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 top-4 md:top-0 md:bottom-auto z-50 flex justify-center p-4 md:p-0">
      <div className="flex items-center justify-center md:justify-between gap-5 p-4  rounded-full md:rounded-none shadow-lg md:shadow-none backdrop-blur-md bg-white/20   md:w-full">
          <div className="hidden md:block">
            <h1>Al-quranku</h1>
          </div>
          <div className="flex gap-2">

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 w-fit px-4 py-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "backdrop-blur-lg bg-white/20 shadow scale-105"
                      : "hover:backdrop-blur-lg hover:bg-white/20 "
                  }`}
                >
                  {item.icon}
                  <span className={`${isActive ? "block" : "hidden md:block"} `}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
          <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;
