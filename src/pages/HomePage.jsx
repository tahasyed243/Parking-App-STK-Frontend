// src/pages/HomePage.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Snowfall from "react-snowfall";
import PublicNavbar from "../components/PublicNavbar";

export default function HomePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 overflow-x-hidden">
      <PublicNavbar />
      
      {/* Snowfall Effect */}
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 0
        }}
        color="rgba(224, 247, 250, 0.8)"
        snowflakeCount={100}
        speed={[0.8, 2]}
        wind={[-0.2, 0.3]}
        radius={[1, 3]}
      />

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Smart Parking Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Simple</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto px-2">
            Find, book, and manage parking spots effortlessly. Save time, reduce stress, and park smarter with our intuitive platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 md:mb-16">
            {token ? (
              <NavLink
                to="/dashboard"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base md:text-lg text-center"
              >
                Go to Dashboard →
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base md:text-lg text-center"
                >
                  Start Free Trial
                </NavLink>
                <NavLink
                  to="/features"
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-cyan-500 text-cyan-300 font-bold rounded-full hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base md:text-lg text-center"
                >
                  View Features
                </NavLink>
              </>
            )}
          </div>

          {/* Stats - Mobile Friendly */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-2">
            {[
              { value: "10K+", label: "Happy Users", icon: "👥" },
              { value: "5K+", label: "Parking Spots", icon: "🚗" },
              { value: "99%", label: "Satisfaction", icon: "⭐" },
              { value: "24/7", label: "Support", icon: "🔧" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-800/70 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow border border-gray-700 hover:border-cyan-700 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 font-medium text-xs sm:text-sm md:text-base text-center">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 md:mt-20 lg:mt-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ParkEase</span>?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
            {[
              {
                title: "Fast Booking",
                description: "Reserve parking in under 60 seconds with our streamlined process.",
                icon: "⚡",
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "Secure & Safe",
                description: "Bank-level security for all your transactions and data.",
                icon: "🔒",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Live Tracking",
                description: "Real-time GPS navigation to your reserved parking spot.",
                icon: "📍",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 hover:border-cyan-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-center text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 lg:mt-24 bg-gradient-to-r from-gray-800/80 to-cyan-900/30 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to Transform Your Parking Experience?
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of smart parkers who save time and reduce stress every day
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {token ? (
                <NavLink
                  to="/dashboard"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base text-center"
                >
                  Go to Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base text-center"
                  >
                    Start Free Trial
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 border border-cyan-500 text-cyan-300 font-bold rounded-full hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base text-center"
                  >
                    Contact Sales
                  </NavLink>
                </>
              )}
            </div>

            <p className="mt-6 md:mt-8 text-gray-400 text-xs sm:text-sm">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 mt-12 md:mt-16">
        <Footer />
      </div>
    </div>
  );
}