"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center container mx-auto justify-between relative">
        {/* Left - Project Name */}
        <div className="text-2xl font-bold z-10">Work Manager</div>

        {/* Center - Routes */}
        <div className="hidden md:flex space-x-6 text-base absolute left-1/2 transform -translate-x-1/2">
          <Link href={"/"} className="hover:text-gray-300">
            Home
          </Link>
          <Link href={"/addTask"} className="hover:text-gray-300">
            Add Tasks
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Show Tasks
          </Link>
        </div>

        {/* Right - Auth */}
        <div className="hidden md:flex space-x-4 text-base z-10">
          <Link href={"/logIn"}>
            <button className="hover:text-gray-300 cursor-pointer">
              Login
            </button>
          </Link>
          <Link href={"/signUp"}>
            <button className="hover:text-gray-300 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-10">
          <button onClick={() => setIsOpen(!isOpen)}>
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
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col space-y-4 md:hidden">
          <Link
            href={"/"}
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href={"/addTask"}
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Add Tasks
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            Show Tasks
          </Link>
          <Link href={"/logIn"}>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 text-left"
            >
              Login
            </button>
          </Link>
          <Link href={"/signUp"}>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 text-left"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
