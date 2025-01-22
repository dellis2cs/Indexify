/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON payload
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data._id);

        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-earthyOffWhite font-sourGummy">
      <div className="relative border-[3px] border-earthyGreen shadow-md rounded px-8 py-6 w-full max-w-md">
        {/* "X" Link to Home */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-earthyGreen hover:text-earthyBrown text-xl font-bold"
        >
          X
        </Link>

        <h1 className="text-2xl font-bold text-earthyGreen text-center mb-4">
          Login
        </h1>
        <form onSubmit={handleFormSubmit}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login & Sign Up Buttons */}
          <div>
            <button
              type="submit"
              className="w-full bg-earthyBrown text-earthyCream font-semibold py-2 px-4 mb-5 rounded shadow
                           hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors"
            >
              Log In
            </button>

            <Link to="/signup">
              <button
                type="button"
                className="w-full bg-earthyBrown text-earthyCream font-semibold py-2 px-4 rounded shadow
                           hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
