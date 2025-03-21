"use client";
import React, { useState } from "react";
import Image from "next/image";
import signupSvg from "../../../public/undraw_sign-up_qamz.svg"; // Replace with your actual image
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL:
      "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [signupState, setSignupState] = useState("Sign Up");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(user);
    setSignupState("Signing Up...");

    if (!user.name) {
      toast.error("Please enter your username.", {
        position: "top-center",
      });
      setSignupState("Sign Up");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
      });
      setSignupState("Sign Up");
      return;
    }

    if (!user.password) {
      toast.error("Please enter a password.", {
        position: "top-center",
      });
      setSignupState("Sign Up");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/users", user);
      console.log(res.data);
      toast.success("Signed up successfully!!", { position: "top-center" });
      setSignupState("Sign Up");
    } catch (err) {
      console.log(err);
      toast.error("Signup failed!" + err.response.data.error._message, {
        position: "top-center",
      });
      setSignupState("Sign Up");
    }
  };

  const clearForm = () => {
    setUser({
      ...user,
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <Image src={signupSvg} alt="Signup" className="w-1/2 h-1/2 mr-4" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        {/* Username */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.username}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">About</label>
          <textarea
            placeholder="Tell us about yourself"
            rows="4"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, about: e.target.value })}
            value={user.about}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 sm:justify-center">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 cursor-pointer"
          >
            {signupState}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            onClick={clearForm}
          >
            Clear Data
          </button>
        </div>
      </form>
    </div>
  );
}
