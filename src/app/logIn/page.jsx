"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import loginSvg from "../../../public/undraw_login_weas.svg"; // Replace with your actual image

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState("Log In");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginState("Logging In...");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
      });
      setLoginState("Log In");
      return;
    }

    if (!user.password) {
      toast.error("Please enter a password.", {
        position: "top-center",
      });
      setLoginState("Log In");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/login", user);
      console.log(res.data);
      toast.success("Logged in successfully!!", { position: "top-center" });
      setLoginState("Log In");
    } catch (err) {
      console.log(err);
      toast.error("Login failed!" + err.response.data.error._message, {
        position: "top-center",
      });
      setLoginState("Log In");
    }
  };

  const clearForm = () => {
    setUser({
      ...user,
      email: "",
      password: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <Image src={loginSvg} alt="Login" className="w-1/3  mr-4" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Log In Here!!</h2>

      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 sm:justify-center">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 cursor-pointer"
          >
            {loginState}
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
