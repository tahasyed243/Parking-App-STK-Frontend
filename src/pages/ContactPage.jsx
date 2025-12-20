// src/pages/ContactPage.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";
import Snowfall from "react-snowfall";
import PublicNavbar from "../components/PublicNavbar";

// Custom STK Logo and Icons same as before (omit here for brevity)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you for your message! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 relative overflow-hidden">
      <PublicNavbar />

      {/* Snowfall Effect */}
      <Snowfall
        style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: 0 }}
        color="rgba(255, 255, 255, 0.8)"
        snowflakeCount={150}
        speed={[0.5, 2.5]}
        wind={[-0.5, 1.5]}
        radius={[0.5, 3]}
        rotationSpeed={[-0.5, 0.5]}
      />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Touch</span>
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? Our team is ready to help you 24/7. Let's make parking management effortless together.
          </p>
        </div>

        {/* Grid: Form + Contact Info/FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700 hover:border-cyan-800/50 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {["name", "email", "subject"].map((field, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="block text-gray-300 font-medium capitalize">{field === "name" ? "Your Name" : field === "email" ? "Email Address" : "Subject"}</label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      placeholder={field === "name" ? "Your Full Name" : field === "email" ? "test@example.com" : "How can we help?"}
                      className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 transition-all"
                    />
                  </div>
                ))}

                <div className="space-y-1">
                  <label className="block text-gray-300 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 resize-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitMessage && (
                  <div className="mt-4 p-3 bg-green-900/20 text-green-300 rounded-xl border border-green-800/50">
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8 animate-slide-up delay-100">
            {/* Contact Info */}
            <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-lg border border-gray-700 hover:border-cyan-800/50 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-gray-300 mb-4">We typically respond within 24 hours. For urgent matters, please call us directly.</p>
              <div className="space-y-3">
                {[
                  { title: "Email", details: "support@stkparkease.com", link: "mailto:support@stkparkease.com" },
                  { title: "Phone", details: "+92 (313) 281-9077", link: "tel:+923132819077" },
                  { title: "Address", details: "STK ParkEase HQ, CB-78 Karachi, Pakistan", link: "https://maps.google.com" }
                ].map((info, idx) => (
                  <a key={idx} href={info.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-xl hover:bg-gray-800/60 transition-all border border-gray-700 hover:border-cyan-800/50">
                    <div className="p-2 bg-cyan-900/30 text-cyan-300 rounded-lg">{info.title[0]}</div>
                    <div>
                      <h3 className="font-semibold text-white">{info.title}</h3>
                      <p className="text-gray-300">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-lg border border-gray-700 hover:border-indigo-800/50 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
              <div className="space-y-3">
                {[
                  { q: "What are your support hours?", a: "24/7 email support and phone support from 9 AM to 6 PM EST." },
                  { q: "How do I get a refund?", a: "Contact support team within 30 days of purchase for full refunds." },
                  { q: "Do you offer enterprise solutions?", a: "Yes! Contact sales team for custom packages." },
                  { q: "Is there a free trial?", a: "14-day free trial for all plans." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-3 bg-gray-900/40 rounded-xl border border-gray-700 hover:bg-gray-800/60 hover:border-indigo-800/50 transition-all">
                    <h3 className="font-semibold text-cyan-300 mb-1">{faq.q}</h3>
                    <p className="text-gray-300">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
