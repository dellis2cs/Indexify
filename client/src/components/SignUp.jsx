import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };
    console.log(payload);
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Telling the server you’re sending JSON
        },
        body: JSON.stringify(payload), // Convert the JS object to JSON string
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-earthyOffWhite font-sourGummy">
      <div className="relative bg-earthyOffWhite border-[3px] border-earthySage shadow-md rounded px-8 py-6 w-full max-w-md">
        {/* "X" Link to Home */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-earthyGreen hover:text-earthyBrown text-xl font-bold"
        >
          X
        </Link>

        <h1 className="text-2xl font-bold text-earthyGreen text-center mb-4">
          Create Account
        </h1>
        <form onSubmit={handleFormSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-earthyGreen mb-2 font-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-earthyTaupe rounded bg-white text-earthyBrown
                         focus:outline-none focus:border-earthyGreen transition-colors"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-earthyGreen mb-2 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-earthyTaupe rounded bg-white text-earthyBrown
                         focus:outline-none focus:border-earthyGreen transition-colors"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-earthyGreen mb-2 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-earthyTaupe rounded bg-white text-earthyBrown
                         focus:outline-none focus:border-earthyGreen transition-colors"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-earthyBrown text-earthyCream font-semibold py-2 px-4 rounded shadow
                       hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
