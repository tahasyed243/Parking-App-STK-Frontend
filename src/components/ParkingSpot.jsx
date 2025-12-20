import React from "react";
import { motion } from "framer-motion";

export default function ParkingSpot({ spot, onOccupy, onFree, onSelect }) {
  const getStatusConfig = () => {
    switch (spot.status) {
      case "free":
        return {
          bg: "bg-gradient-to-br from-green-500 to-emerald-600",
          text: "text-white",
          shadow: "shadow-lg shadow-green-500/30",
          icon: "✅",
          label: "Available"
        };
      case "reserved":
        return {
          bg: "bg-gradient-to-br from-yellow-500 to-amber-600",
          text: "text-white",
          shadow: "shadow-lg shadow-yellow-500/30",
          icon: "⏳",
          label: "Reserved"
        };
      case "occupied":
        return {
          bg: "bg-gradient-to-br from-red-600 to-rose-700",
          text: "text-white",
          shadow: "shadow-lg shadow-red-500/30",
          icon: "🚗",
          label: "Occupied"
        };
      default:
        return {
          bg: "bg-gray-600",
          text: "text-white",
          shadow: "shadow-lg",
          icon: "❓",
          label: "Unknown"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative rounded-xl ${statusConfig.bg} ${statusConfig.shadow} p-6 cursor-pointer transition-all duration-200`}
      onClick={onSelect}
    >
      {/* Spot Number */}
      <div className="text-center mb-4">
        <h2 className={`text-3xl font-bold ${statusConfig.text} mb-2`}>
          {spot.spotNumber || spot.id}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">{statusConfig.icon}</span>
          <span className={`font-semibold ${statusConfig.text} uppercase tracking-wide`}>
            {spot.status}
          </span>
        </div>
      </div>

      {/* Reserved By Info */}
      {spot.reservedBy && (
        <div className="mb-4 text-center">
          <div className={`text-sm ${statusConfig.text} opacity-90 bg-white/10 px-3 py-1 rounded-full`}>
            {spot.reservedBy}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {spot.status === "reserved" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onOccupy();
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Occupy Spot
          </motion.button>
        )}

        {spot.status === "occupied" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onFree();
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Free Spot
          </motion.button>
        )}

        {spot.status === "free" && (
          <div className="text-center py-2">
            <p className={`text-sm ${statusConfig.text} opacity-80 italic`}>
              Click to reserve
            </p>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="absolute -top-2 -right-2">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig.text} bg-black/30 backdrop-blur-sm`}>
          {statusConfig.label}
        </div>
      </div>
    </motion.div>
  );
}