"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import loginSvg from "../../../public/undraw_login_weas.svg"; // Replace with your actual image
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/slice/authSlice";
// import { loginUser } from "@/store/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth); // Get auth state

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-center",
      });
      return;
    }

    if (!credentials.password) {
      toast.error("Please enter a password.", {
        position: "top-center",
      });
      return;
    }

    // Dispatch login action
    dispatch(loginUser(credentials)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Logged in successfully!", { position: "top-center" });
        router.push("/profile/user");
      } else {
        toast.error("Login failed! " + (res.payload?.message || "Try again."), {
          position: "top-center",
        });
      }
    });
  };

  const clearForm = () => {
    setCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <Image src={loginSvg} alt="Login" className="w-1/3 mr-4" />
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
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-sm font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
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
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
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

      <div className="mt-4 text-center">
        <p className="text-sm">
          Have no account?{" "}
          <button
            onClick={() => router.push("/signUp")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Show error message */}
      {/* {error && <p className="text-red-500 text-center mt-3">{error.message || "Login failed!"}</p>} */}
    </div>
  );
}
