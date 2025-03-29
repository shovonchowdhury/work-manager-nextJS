"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slice/authSlice";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const userLogOutHandle = async () => {
    await dispatch(logoutUser());
    router.replace("/logIn");
  };

  if (loading) {
    return (
      <div className="w-6 h-6 border-t-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    );
  }

  const isActive = (path) =>
    pathname === path ? "bg-white text-black" : "hover:text-gray-300";

  return (
    <nav
      className={`bg-gray-900 text-white pt-4 ${
        !user && "pb-4"
      }   md:pb-4 fixed top-0 left-0 w-full z-50`}
    >
      <div className="flex items-center container px-4 mx-auto justify-between relative">
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
          <div className="h-1/2 hidden md:flex items-center space-x-6 text-base absolute left-1/2 transform -translate-x-1/2">
            <Link
              href={"/"}
              className={`px-2 rounded-lg flex items-center ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href={"/addTask"}
              className={`px-2 rounded-lg flex items-center ${isActive(
                "/addTask"
              )}`}
            >
              Add Tasks
            </Link>
            <Link
              href="/showTask"
              className={`px-2 rounded-lg flex items-center ${isActive(
                "/showTask"
              )}`}
            >
              Show Tasks
            </Link>
          </div>
        )}

        {/* Right - Login & Sign Up (Visible on Desktop) */}
        {user ? (
          <div className="hidden md:flex items-center space-x-4 text-base z-10">
            <Link href={"/profile/user"}>
              <button className="hover:text-gray-300 cursor-pointer">
                {user.profileURL ? (
                  <Image
                    alt="Profile"
                    src={user?.profileURL}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[35px] h-[35px] bg-black rounded-full">
                    {user?.name.split(" ")[0].split("")[0]}
                  </div>
                )}
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
                {user.profileURL ? (
                  <Image
                    alt="Profile"
                    src={user?.profileURL}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-[35px] h-[35px] bg-black rounded-full">
                    {user?.name.split(" ")[0].split("")[0]}
                  </div>
                )}
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
        <div className="absolute top-full text-2xl left-0 w-full bg-gray-800 p-4 mt-1 md:hidden">
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

      {user && (
        <div className="mt-2 flex  md:hidden  text-base ">
          <Link
            href={"/"}
            className={` flex flex-1 py-1 items-center justify-center ${isActive(
              "/"
            )}`}
          >
            Home
          </Link>
          <Link
            href={"/addTask"}
            className={`flex flex-1 py-1 items-center justify-center ${isActive(
              "/addTask"
            )}`}
          >
            Add Tasks
          </Link>
          <Link
            href="/showTask"
            className={`flex flex-1 py-1 items-center justify-center ${isActive(
              "/showTask"
            )}`}
          >
            Show Tasks
          </Link>
        </div>
      )}
    </nav>
  );
}
