// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// SVG Icons Components
const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen &&
        !e.target.closest('.mobile-menu') &&
        !e.target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Navigation items configuration
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/grid", label: "Grid View", icon: "🗺️" },
    { to: "/table", label: "Table View", icon: "📋" },
  ];

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear all user-related data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");

      // Show logout message
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // CSS Classes
  const desktopLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
     ${isActive
      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
      : "text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium transition-colors duration-200
     ${isActive
      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <>
      <nav
        className="bg-gray-900 w-screen shadow-xl border-b border-gray-800 sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left Section - Logo & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="menu-button md:hidden p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>

              {/* Logo */}
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate("/dashboard")}
                role="button"
                tabIndex={0}
                aria-label="Go to dashboard"
                onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
              >
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-2xl">
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            S
                          </span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            T
                          </span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            K
                          </span>
                          <svg className="w-4 h-4 ml-1 text-cyan-300 opacity-70 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Name */}
                <div className="flex flex-col">
                  <span className="font-bold text-white text-xl group-hover:text-cyan-300 transition-colors duration-300">
                    ParkEase
                  </span>
                  <span className="text-xs text-gray-400 font-medium tracking-wide">
                    Smart Parking
                  </span>
                </div>
              </div>
            </div>

            {/* Center - Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={desktopLinkClass}
                  end={item.to === "/dashboard"}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Right - Logout Button */}
            <div className="flex items-center gap-4">
              {/* Logout Button - Desktop */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Logout"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden lg:inline">Logging out...</span>
                  </>
                ) : (
                  <>
                    <LogoutIcon className="w-5 h-5" />
                    <span className="hidden lg:inline">Logout</span>
                  </>
                )}
              </button>

              {/* Logout Button - Mobile (Icon only) */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="sm:hidden p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogoutIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Panel */}
      <div className={`md:hidden fixed inset-0 z-[100] ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Side Panel */}
        <div
          className={`mobile-menu absolute top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="text-white font-semibold text-lg">Menu</div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={mobileLinkClass}
                    onClick={() => setIsMobileMenuOpen(false)}
                    end={item.to === "/dashboard"}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-lg">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogoutIcon className="w-5 h-5" />
                    Logout
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-gray-800">
              <p className="text-gray-400 text-sm">ParkEase v1.0.0</p>
              <p className="text-gray-500 text-xs mt-1">Smart Parking System</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}