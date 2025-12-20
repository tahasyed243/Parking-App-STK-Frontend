import React, { useEffect, useState } from "react";
import { getSpots, reserveSpot, occupySpot, freeSpot } from "../api/parkingApi";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Snowfall from "react-snowfall";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TableView() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    fetchSpots();

    const interval = setInterval(fetchSpots, 30000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      const data = await getSpots();
      setSpots(data);
    } catch (error) {
      toast.error("Failed to load spots");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (spot) => {
    const name = prompt("Enter your name for reservation") || "Guest";
    if (!name.trim()) return;

    try {
      await reserveSpot(spot.id, name);
      toast.success(`Spot ${spot.spotNumber} reserved!`);
      fetchSpots();
    } catch (error) {
      toast.error("Failed to reserve spot");
    }
  };

  const handleOccupy = async (spot) => {
    try {
      await occupySpot(spot.id);
      toast.success(`Spot ${spot.spotNumber} occupied!`);
      fetchSpots();
    } catch (error) {
      toast.error("Failed to occupy spot");
    }
  };

  const handleFree = async (spot) => {
    try {
      await freeSpot(spot.id);
      toast.success(`Spot ${spot.spotNumber} freed!`);
      fetchSpots();
    } catch (error) {
      toast.error("Failed to free spot");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "free": return "text-green-500";
      case "reserved": return "text-yellow-500";
      case "occupied": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "free": return "✅";
      case "reserved": return "⏳";
      case "occupied": return "🚗";
      default: return "❓";
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {!isMobile && (
        <Snowfall
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 0
          }}
          color="white"
          snowflakeCount={150}
          speed={[0.5, 3]}
          wind={[-0.5, 2]}
          radius={[0.5, 4]}
          rotationSpeed={[-1, 1]}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Parking Spots Overview
          </h1>
          <p className="text-gray-400 mt-2">Manage all parking spots in one table view</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="text-gray-400 text-sm">Total Spots</div>
            <div className="text-2xl font-bold text-white">{spots.length}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="text-gray-400 text-sm">Available</div>
            <div className="text-2xl font-bold text-green-500">
              {spots.filter(s => s.status === "free").length}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="text-gray-400 text-sm">Occupied</div>
            <div className="text-2xl font-bold text-red-500">
              {spots.filter(s => s.status === "occupied").length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <th className="p-4 text-left text-white font-semibold">Spot #</th>
                  <th className="p-4 text-left text-white font-semibold">Status</th>
                  <th className="p-4 text-left text-white font-semibold">Reserved By</th>
                  <th className="p-4 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                      </div>
                      <p className="text-gray-400 mt-2">Loading spots...</p>
                    </td>
                  </tr>
                ) : spots.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400">
                      No parking spots found
                    </td>
                  </tr>
                ) : (
                  spots.map((spot, index) => (
                    <motion.tr
                      key={spot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">
                              {spot.spotNumber}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Spot {spot.spotNumber}</div>
                            <div className="text-gray-400 text-sm">ID: {spot.id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getStatusIcon(spot.status)}</span>
                          <span className={`font-semibold capitalize ${getStatusColor(spot.status)}`}>
                            {spot.status}
                          </span>
                        </div>
                        {spot.status === "reserved" && spot.reservedUntil && (
                          <div className="text-gray-400 text-sm mt-1">
                            Until: {new Date(spot.reservedUntil).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="text-white">
                          {spot.reservedBy || (
                            <span className="text-gray-400 italic">Not reserved</span>
                          )}
                        </div>
                        {spot.reservedBy && spot.status === "occupied" && (
                          <div className="text-gray-400 text-sm">
                            Currently occupied
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {spot.status === "free" && (
                            <button
                              onClick={() => handleReserve(spot)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                            >
                              Reserve
                            </button>
                          )}

                          {spot.status === "reserved" && (
                            <>
                              <button
                                onClick={() => handleOccupy(spot)}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                              >
                                Occupy
                              </button>
                              <button
                                onClick={() => handleFree(spot)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {spot.status === "occupied" && (
                            <button
                              onClick={() => handleFree(spot)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                            >
                              Free
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Total: {spots.length} spots • Auto-refresh every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}