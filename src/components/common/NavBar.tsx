import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="shadow-lg">
      <div className="container mx-auto px-4 py-3 ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex gap-3 items-center text-2xl font-bold text-red-600 hover:text-red-500 transition-colors"
          >
            <div className="bg-white p-1 rounded-full">
              <img
                src="/imagen2.png"
                alt="Banner2"
                className="rounded-2xl w-[30px] md:w-[40px] object-cover"
              />
            </div>
            MovieRecommend
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              HOME
            </Link>
            <Link
              to="/movies"
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              MOVIES
            </Link>
            <Link
              to="/recommendations"
              className="hover:text-red-400 transition-colors font-medium px-3 py-2 rounded"
            >
              TRENDING
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
