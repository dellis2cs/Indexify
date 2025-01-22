import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="py-20 bg-earthyOffWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-sourGummy">
        <h1 className="text-4xl font-extrabold text-earthyGreen sm:text-5xl md:text-6xl">
          Transform Your Study Notes
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-earthyBrown sm:text-lg md:mt-5 md:text-xl md:max-w-3xl ">
          Indexify harnesses the power of AI to convert your PDF notes into
          concise, easy-to-review index cards. Study smarter, not harder.
        </p>
        <div className="mt-5 max-w-[25%] mx-auto sm:flex sm:justify-center md:mt-8">
          <Link to="/login">
            <button className="w-full  sm:w-auto bg-earthyBrown text-earthyCream font-semibold py-2 px-4 rounded shadow hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
