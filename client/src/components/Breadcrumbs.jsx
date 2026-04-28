// import { Home, ChevronRight } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

// Utility to format path names
const formatLabel = (str) => {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 print:hidden">
      {/* Home */}
      <Link to="/" className="flex items-center hover:text-gray-700">
        <IoHome className="w-4 h-4" />
      </Link>

      {pathnames.length > 0 && (
        <FaChevronRight className="w-4 h-4 text-gray-400" />
      )}

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center space-x-2">
            <Link
              to={to}
              className={`hover:text-gray-700 ${
                isLast ? "text-gray-700 font-medium" : ""
              }`}
            >
              {formatLabel(value)}
            </Link>

            {!isLast && <FaChevronRight className="w-4 h-4 text-gray-400" />}
          </div>
        );
      })}
    </nav>
  );
}
