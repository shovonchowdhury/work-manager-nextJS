"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, verifyUserLogin } from "@/store/slice/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();

  // useEffect(() => {
  //   dispatch(verifyUserLogin());
  // }, [dispatch]);

  const userLogOutHandle = async () => {
    await dispatch(logoutUser());
    router.push(pathname);
  };

  if (loading) {
    return (
      <div className="w-6 h-6 border-t-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    );
  }

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center container mx-auto justify-between relative">
        {/* Left - Project Name & Hamburger */}
        <div className="flex items-center space-x-4 z-10">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
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
          <div className="text-2xl font-bold">Work Manager</div>
        </div>

        {/* Center - Routes (Hidden on Mobile) */}
        {user && (
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
        )}

        {/* Right - Login & Sign Up (Visible on Desktop) */}

        {user ? (
          <div className="hidden md:flex items-center space-x-4 text-base z-10">
            <Link href={"/profile/user"}>
              <button className="hover:text-gray-300 cursor-pointer">
                <div className="flex items-center justify-center w-[30px] h-[30px] bg-black rounded-full">
                  {user?.name.split(" ")[0].split("")[0]}
                </div>
              </button>
            </Link>

            <button
              onClick={userLogOutHandle}
              className="hover:text-gray-300 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        ) : (
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
        )}

        {/* Right - Login (Only on Mobile) */}

        {user ? (
          <div className="md:hidden z-10">
            <Link href={"/profile/user"}>
              <button className="hover:text-gray-300 cursor-pointer">
                <div className="flex items-center justify-center w-[30px] h-[30px] bg-black rounded-full">
                  {user?.name.split(" ")[0].split("")[0]}
                </div>
              </button>
            </Link>
          </div>
        ) : (
          <div className="md:hidden z-10">
            <Link href={"/logIn"}>
              <button className="hover:text-gray-300 cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown (Left-aligned under Project Name) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-60 bg-gray-800 p-4 mt-2 md:hidden">
          <Link
            href={"/"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href={"/addTask"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300"
          >
            Add Tasks
          </Link>
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300"
          >
            Show Tasks
          </Link>
          <hr className="border-gray-600 my-2" />

          {user ? (
            <button
              onClick={() => {
                setIsOpen(false);
                userLogOutHandle();
              }}
              className="block hover:text-gray-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              href={"/signUp"}
              onClick={() => setIsOpen(false)}
              className="block hover:text-gray-300"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
