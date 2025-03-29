"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import signupSvg from "../../../public/undraw_sign-up_qamz.svg";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For storing the image preview
  const [showPassword, setShowPassword] = useState(false);
  const [signupState, setSignupState] = useState("Sign Up");

  const fileInputRef = useRef(null); // Create a reference for the file input

  // Update file handler to set both the file and the preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setProfilePic(file); // Store the file object

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the image preview URL
    };
    if (file) reader.readAsDataURL(file); // Read the file as Data URL for preview
  };

  // Function to clear the image preview and reset the file input
  const handleClearImage = () => {
    setProfilePic(null);
    setImagePreview(null); // Clear the preview

    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupState("Signing Up...");

    if (!user.name) {
      toast.error("Please enter your username.");
      setSignupState("Sign Up");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.");
      setSignupState("Sign Up");
      return;
    }

    if (!user.password) {
      toast.error("Please enter a password.");
      setSignupState("Sign Up");
      return;
    }

    try {
      let profilePicURL = null;

      // Handle image upload to Cloudinary
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic); // Add the file to form data
        formData.append("upload_preset", "profile_pics"); // The upload preset you've configured in Cloudinary

        const uploadRes = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        profilePicURL = uploadRes.data.url; // Get the image URL from Cloudinary

        console.log(profilePicURL);
      }

      const res = await axios.post("/api/users", {
        ...user,
        profileURL: profilePicURL, // Store the Cloudinary image URL
      });

      toast.success("Signed up successfully!");
      setSignupState("Sign Up");
      router.push("/logIn");
    } catch (err) {
      toast.error("Signup failed!");
      setSignupState("Sign Up");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      <div className="flex justify-center mb-4">
        <Image src={signupSvg} alt="Signup" className="w-1/2 h-1/2 mr-4" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>

        <div className="flex flex-col relative">
          <label className="text-sm font-semibold mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-gray-900 bg-gray-100"
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

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">About</label>
          <textarea
            placeholder="Tell us about yourself"
            rows="4"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setUser({ ...user, about: e.target.value })}
            value={user.about}
          ></textarea>
        </div>

        <div className="flex flex-col w-1/2 md:w-1/3">
          <label className="text-sm font-semibold mb-1">Profile Picture</label>
          <label className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 cursor-pointer text-center">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef} // Attach ref to the file input
            />
          </label>
          {profilePic && (
            <p className="mt-2 text-sm text-gray-600">{profilePic.name}</p>
          )}

          {/* Display Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width={100}
                height={100}
                className="rounded-full"
              />
              <button
                type="button"
                onClick={handleClearImage}
                className="mt-2 text-red-500 text-sm cursor-pointer"
              >
                Clear Image
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-2  md:flex-row  gap-1 md:gap-4 justify-end">
          <button
            type="submit"
            className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-950"
          >
            {signupState}
          </button>
          <button
            type="button"
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={() => {
              setUser({
                name: "",
                email: "",
                password: "",
                about: "",
                profileURL: "",
              });
              setProfilePic(null);
              setImagePreview(null); // Clear preview when clearing the form
              if (fileInputRef.current) {
                fileInputRef.current.value = null; // Reset the file input when clearing the form
              }
            }}
          >
            Clear Data
          </button>
        </div>
      </form>
    </div>
  );
}
