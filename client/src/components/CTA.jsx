import { Link } from "react-router";

export default function CTA() {
  return (
    <div className="bg-earthyGreen font-sourGummy">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-extrabold text-earthyOffWhite sm:text-4xl">
          <span className="block">Ready to boost your study efficiency?</span>
          <span className="block">Start using Indexify today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-earthyCream">
          Transform your study notes into powerful learning tools. Sign up now
          and experience the difference.
        </p>
        <Link to="signup">
          <button className="mt-8 w-full sm:w-auto bg-earthyTaupe text-earthyGreen font-semibold py-2 px-4 rounded shadow hover:bg-earthyBrown hover:text-earthyCream transition-colors">
            Sign up for free
          </button>
        </Link>
      </div>
    </div>
  );
}
