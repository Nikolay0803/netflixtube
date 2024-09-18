"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import NavbarItem from "./NavbarItem";

type NavbarProps = {
  username?: string;
};

enum NavbarLinks {
  "/home" = "Головна",
  "/movies" = "Фільми",
  "/favorites" = "Улюблені",
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (newPath: string) => {
    router.push(newPath);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full fixed z-40 bg-transparent text-white">
      <div className="px-4 md:px-16 py-6 flex items-center justify-between">
        <Image
          onClick={() => router.push("/home")}
          className="h-24 w-36 cursor-pointer"
          width={100}
          height={100}
          src="/images/logo.svg"
          alt="logo"
        />
        <div className="hidden md:flex md:flex-row md:ml-8 md:gap-6">
          {username &&
            Object.entries(NavbarLinks).map(([path, label]) => (
              <NavbarItem
                key={path}
                label={label}
                path={path}
                active={pathname === path}
                handleClick={handleNavClick}
              />
            ))}
        </div>
        <div className="flex items-center gap-4">
          {username ? (
            <button
              className="bg-red-600 py-1 px-4 text-white font-semibold rounded-2xl hover:bg-red-700 transition"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Вийти
            </button>
          ) : (
            <button
              className="bg-red-600 py-1 px-4 text-white font-semibold rounded-2xl hover:bg-red-700 transition"
              onClick={() => router.push("/auth")}
            >
              Увійти
            </button>
          )}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-30 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center">
          {Object.entries(NavbarLinks).map(([path, label]) => (
            <button
              key={path}
              className={`text-white text-xl py-2 px-4 ${
                pathname === path ? "bg-red-600 rounded-2xl" : ""
              }`}
              onClick={() => handleNavClick(path)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
