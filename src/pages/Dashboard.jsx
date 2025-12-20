import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSpots } from "../api/parkingApi";
import Navbar from "../components/Navbar";
import Snowfall from "react-snowfall";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
    const [stats, setStats] = useState({ free: 0, reserved: 0, occupied: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: "Guest", email: "" });
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Load user data from localStorage
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                // Notify user if not logged in
                toast.info("You are not logged in. Displaying as Guest.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            toast.error("Failed to load user info", { position: "top-right", autoClose: 3000 });
        }

        fetchStats();

        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const spots = await getSpots();
            setStats({
                free: spots.filter((s) => s.status === "free").length,
                reserved: spots.filter((s) => s.status === "reserved").length,
                occupied: spots.filter((s) => s.status === "occupied").length,
                total: spots.length,
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
            toast.error("Failed to fetch parking stats", { position: "top-right", autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const getStatCards = () => [
        { label: "Free", value: stats.free, color: "from-green-500 to-emerald-600", icon: "✅", description: "Available spots" },
        { label: "Reserved", value: stats.reserved, color: "from-yellow-500 to-amber-600", icon: "⏳", description: "Booked spots" },
        { label: "Occupied", value: stats.occupied, color: "from-red-500 to-rose-600", icon: "🚗", description: "In use spots" },
    ];

    const quickActions = [
        { label: "Grid View", icon: "🗺️", color: "from-blue-500 to-cyan-600", onClick: () => navigate("/grid") },
        { label: "Table View", icon: "📋", color: "from-purple-500 to-pink-600", onClick: () => navigate("/table") },
        { label: "Refresh", icon: "🔄", color: "from-gray-700 to-gray-800", onClick: fetchStats },
    ];

    return (
        <div className="bg-gray-900 min-h-screen relative">
            <ToastContainer />
            {!isMobile && (
                <Snowfall
                    style={{ position: "fixed", width: "100vw", height: "100vh", zIndex: 0 }}
                    color="white"
                    snowflakeCount={150}
                    speed={[0.5, 3]}
                    wind={[-0.5, 2]}
                    radius={[0.5, 4]}
                    rotationSpeed={[-1, 1]}
                />
            )}

            <Navbar />

            <div className="relative z-10 px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block mb-6">
                            <div className="w-28 h-28 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-5xl shadow-2xl">
                                🅿️
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                            Parking Dashboard
                        </h1>

                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 inline-block max-w-2xl">
                            <p className="text-gray-300 text-3xl mb-2">
                                Welcome back !
                            </p>
                            {user.email && <p className="text-gray-400 text-sm">{user.email}</p>}
                            <div className="mt-4 text-gray-500 text-sm">Manage your parking spots efficiently</div>
                        </div>
                    </div>

                    {/* Stats and Cards */}
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 text-center shadow-2xl border border-gray-700">
                        <div className="text-5xl font-bold text-white mb-2">{stats.total}</div>
                        <div className="text-gray-400 text-lg">Total Parking Spots</div>
                        <div className="mt-4 text-gray-500 text-sm">Auto-refreshes every 30 seconds</div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {getStatCards().map((stat, idx) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-2xl border border-white/10`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-3xl">{stat.icon}</div>
                                    <div className="text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full">{stat.label}</div>
                                </div>
                                <div className="text-4xl font-bold text-white mb-2">{loading ? "..." : stat.value}</div>
                                <div className="text-white/80">{stat.description}</div>
                                <div className="mt-4 text-white/60 text-sm">{Math.round((stat.value / stats.total) * 100) || 0}% of total</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {quickActions.map((action) => (
                                <motion.button key={action.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={action.onClick} className={`bg-gradient-to-r ${action.color} rounded-xl p-5 text-white font-medium shadow-lg hover:shadow-xl transition-all flex flex-col items-center gap-3`}>
                                    <span className="text-3xl">{action.icon}</span>
                                    <span>{action.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center mt-10 text-gray-500 text-sm">
                    <p>ParkEase Dashboard • v1.0.0 • Real-time monitoring</p>
                </motion.div>
            </div>
        </div>
    );
}
