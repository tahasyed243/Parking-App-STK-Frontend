// src/pages/HomePage.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Snowfall from "react-snowfall";
import PublicNavbar  from "../components/PublicNavbar";

export default function HomePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950">
      <PublicNavbar />
      {/* Snowfall Effect */}
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 0
        }}
        color="white"
        snowflakeCount={200}
        speed={[0.5, 3]}
        wind={[-0.5, 2]}
        radius={[0.5, 4]}
        rotationSpeed={[-1, 1]}
      />

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Smart Parking Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Simple</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Find, book, and manage parking spots effortlessly. Save time, reduce stress, and park smarter with our intuitive platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {token ? (
              <NavLink
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                Go to Dashboard →
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                >
                  Start Free Trial
                </NavLink>
                <NavLink
                  to="/features"
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-300 font-bold rounded-full hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  View Features
                </NavLink>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "10K+", label: "Happy Users" },
              { value: "5K+", label: "Parking Spots" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-cyan-700 transition-colors">
                <div className="text-3xl font-bold text-cyan-300 mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ParkEase</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-cyan-700 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-gray-800/80 to-cyan-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-gray-700">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Parking Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of smart parkers who save time and reduce stress every day
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {token ? (
                <NavLink
                  to="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Go to Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Start Free Trial
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="px-8 py-4 border-2 border-cyan-500 text-cyan-300 font-bold rounded-full hover:bg-cyan-900/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Sales
                  </NavLink>
                </>
              )}
            </div>

            <p className="mt-8 text-gray-400 text-sm">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </main>

      {/* Dark Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}