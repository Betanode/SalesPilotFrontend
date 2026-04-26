import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Sales Coach", path: "/sales-coach" },
  { name: "Guide", path: "/guide" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

      <div className="relative max-w-7xl mx-auto px-2">
        
        <div className="flex h-16 items-center justify-between">
          
          {/* 🔥 Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-semibold tracking-tight"
          >
            <span className="text-white">Sales</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Pilot
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
  {navigation.map((item) => {
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={item.name}
        to={item.path}
        className={`relative text-lg font-large transition-colors duration-300
          ${
            isActive
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
      >
        {item.name}
      </Link>
    );
  })}
</div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Profile */}
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full cursor-pointer border border-white/20 hover:scale-105 transition"
              />

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  {["Profile", "Settings", "Logout"].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-2 pb-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}