import { BookOpen } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-earthyOffWhite shadow-sm font-sourGummy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-earthyGreen" />
          <span className="ml-2 text-2xl font-bold text-earthyGreen">
            Indexify
          </span>
        </div>
        <nav className="flex gap-4">
          <Link to="/login">
            <button className="w-full  sm:w-auto bg-earthyBrown text-earthyCream font-semibold py-2 px-4 rounded shadow hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full  sm:w-auto bg-earthyBrown text-earthyCream font-semibold py-2 px-4 rounded shadow hover:bg-earthyGreen hover:text-earthyOffWhite transition-colors">
              SignUp
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
