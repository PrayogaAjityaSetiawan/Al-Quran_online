"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Home, BookOpen, ListOrdered, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      href: "/alquran",
      label: "Al-Quran",
      icon: <BookOpen className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      href: "/doa",
      label: "Doa",
      icon: <ListOrdered className="w-5 h-5" strokeWidth={1.5} />,
    },
  ];

  return (
    <>
      <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f1a0e]/90 backdrop-blur-md border-b border-[#254F22]/10 dark:border-[#A3DC9A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Link
              href="/"
              className="text-xl font-bold text-[#254F22] dark:text-[#A3DC9A] hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Al-Quranku Home"
            >
              Al-Quranku
            </Link>


            <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                      isActive
                        ? "bg-[#254F22] dark:bg-[#A3DC9A]/20 dark:border dark:border-[#A3DC9A]/30 text-white dark:text-[#A3DC9A] shadow-sm"
                        : "text-[#254F22]/70 dark:text-[#e8f5e4]/60 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 hover:text-[#254F22] dark:hover:text-[#A3DC9A]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <ModeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#254F22] dark:text-[#A3DC9A]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#254F22] dark:text-[#A3DC9A]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 m-4 rounded-2xl w-[70%] max-w-[280px] bg-white/95 dark:bg-[#0f1a0e]/95 backdrop-blur-md border border-[#254F22]/10 dark:border-[#A3DC9A]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#254F22]/10 dark:border-[#A3DC9A]/10">
              <span className="text-lg font-bold text-[#254F22] dark:text-[#A3DC9A]">
                Al-Quranku
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors"
              >
                <X size={18} className="text-[#254F22] dark:text-[#A3DC9A]" />
              </button>
            </div>

            <div className="px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-[#254F22] dark:bg-[#A3DC9A]/20 text-white dark:text-[#A3DC9A]"
                        : "text-[#254F22]/70 dark:text-[#e8f5e4]/60 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="px-3 pb-4">
              <div className="bg-[#254F22]/5 dark:bg-[#A3DC9A]/5 border border-[#254F22]/10 dark:border-[#A3DC9A]/10 rounded-xl px-3 py-2">
                <p className="text-[11px] text-[#254F22]/50 dark:text-[#A3DC9A]/50 leading-relaxed">
                  © {new Date().getFullYear()} Data Al-Qur'an disediakan oleh equran.id
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;