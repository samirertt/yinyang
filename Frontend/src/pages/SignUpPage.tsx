import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNav from '../components/LoginNav'
function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Explicitly defining the event type for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Explicitly defining the event type for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Proceed with signup logic (e.g., API call)
    console.log("Form Data:", formData);
    navigate("/login"); // Redirect to login after successful signup
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#212121] relative">
      <LoginNav />
      {/* GIF Background Card */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-[30px] shadow-2xl overflow-hidden">
        <img
          src="https://media.giphy.com/media/wM2jsoKbVTur6/giphy.gif"
          alt="GIF Animation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Sign Up Card */}
      <div className="absolute bg-[#121212] p-8 rounded-2xl shadow-lg text-white w-[350px]">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Sign up in just a few seconds
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded-md shadow"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By signing up, you agree with the{" "}
          <span className="underline">Terms</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
