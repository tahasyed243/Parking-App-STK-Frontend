import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ParkingSpot from "../components/ParkingSpot";
import ReservationForm from "../components/ReservationForm";
import { getSpots, reserveSpot, occupySpot, freeSpot } from "../api/parkingApi";
import Navbar from '../components/Navbar';
import Snowfall from "react-snowfall";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GridView() {
  const [spots, setSpots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
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
      toast.error("Failed to load parking spots");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (name, minutes) => {
    if (!selected) return;
    
    try {
      await reserveSpot(selected.id, name, minutes);
      toast.success(`Spot ${selected.spotNumber} reserved!`);
      setSelected(null);
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

  const handleSelectSpot = (spot) => {
    if (spot.status === "free") {
      setSelected(spot);
    }
  };

  const filteredSpots = spots.filter(spot => {
    if (filter === "all") return true;
    return spot.status === filter;
  });

  const stats = {
    total: spots.length,
    free: spots.filter(s => s.status === "free").length,
    reserved: spots.filter(s => s.status === "reserved").length,
    occupied: spots.filter(s => s.status === "occupied").length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "free": return "bg-green-500";
      case "reserved": return "bg-yellow-500";
      case "occupied": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (loading && spots.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4">Loading parking spots...</p>
        </div>
      </div>
    );
  }

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Choose Your Parking Spot
          </h1>
          <p className="text-gray-400 mt-2">Click on an available spot to reserve it 🚗</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-gray-800 p-4 rounded-xl">
              <div className="text-gray-400 text-sm capitalize">{key} Spots</div>
              <div className={`text-2xl font-bold ${getStatusColor(key)}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          {["all", "free", "reserved", "occupied"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === status 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={fetchSpots}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSpots.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🅿️</div>
              <h3 className="text-xl text-gray-300 mb-2">No spots found</h3>
              <p className="text-gray-500">Try changing the filter</p>
            </div>
          ) : (
            filteredSpots.map(spot => (
              <motion.div
                key={spot.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSpot(spot)}
                className="cursor-pointer"
              >
                <ParkingSpot
                  spot={spot}
                  onOccupy={() => handleOccupy(spot)}
                  onFree={() => handleFree(spot)}
                  onSelect={() => handleSelectSpot(spot)}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Total Capacity: {stats.total} spots • Auto-refresh: Every 30 seconds</p>
        </div>

        {/* Reservation Modal */}
        {selected && (
          <ReservationForm
            spot={selected}
            onClose={() => setSelected(null)}
            onReserve={handleReserve}
          />
        )}
      </div>
    </div>
  );
}