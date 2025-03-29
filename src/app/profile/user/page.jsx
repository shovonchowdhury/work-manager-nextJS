"use client";

import { useSelector } from "react-redux";
import Image from "next/image";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-around min-h-screen bg-gray-100 p-6">
      {/* Profile Image or Fallback */}
      {user?.profileURL ? (
        <Image
          src={user.profileURL}
          alt="Profile Photo"
          width={300}
          height={300}
          className="w-[350px] h-[350px] rounded-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-40 h-40 bg-gray-300 text-5xl font-bold rounded-full">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      )}

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold mt-4">{user?.name}</h2>
        <p className="text-xl text-gray-600">{user?.email}</p>
        <p className="text-xl mt-2 text-gray-800">
          {user?.about || "No bio available"}
        </p>
      </div>
    </div>
  );
}
