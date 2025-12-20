import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationForm({ spot, onClose, onReserve }) {
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(30);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const timeOptions = [15, 30, 45, 60, 90, 120];

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    
    setLoading(true);
    try {
      await onReserve(name.trim(), minutes);
    } catch (error) {
      console.error("Reservation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEndTime = () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + minutes * 60000);
    return endTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Reserve Spot {spot.spotNumber || spot.id}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Set your reservation details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Your Name *
              </label>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Duration (minutes)
              </label>
              
              {/* Quick Selection Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {timeOptions.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setMinutes(time)}
                    className={`py-2 px-1 rounded-lg transition-all ${
                      minutes === time
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="240"
                  value={minutes}
                  onChange={e => setMinutes(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400 text-sm">1 min</span>
                  <span className="text-white font-medium">{minutes} minutes</span>
                  <span className="text-gray-400 text-sm">4 hours</span>
                </div>
              </div>
            </div>

            {/* Time Preview */}
            <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-sm">Reservation ends at</div>
                <div className="text-white font-semibold text-lg">
                  {calculateEndTime()}
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Timer will start immediately
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  `Reserve (${minutes} min)`
                )}
              </button>
            </div>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-500">
              <p>💡 Your reservation will expire automatically after {minutes} minutes</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}