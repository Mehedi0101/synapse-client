import { useContext, useEffect } from "react";
import {
    PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from "recharts";
import {
    FaUsers,
    FaBriefcase,
    FaCalendarAlt,
    FaChalkboardTeacher
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StatsSkeleton from "../../components/skeletons/StatsSkeleton";
import AuthContext from "../../contexts/AuthContext";

// ---------- Card Components ----------
// eslint-disable-next-line no-unused-vars
const Card = ({ children, className = "" }) => (
    <div
        className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition focus:outline-none`}
    >
        {children}
    </div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-5 ${className}`}>{children}</div>
);

// ---------- Color Palettes ----------
const COLOR_SETS = {
    roles: ["#6f16d7", "#f59e0b", "#10b981"],
    jobs: ["#3b82f6", "#10b981", "#f97316", "#ef4444"],
    events: ["#06b6d4", "#f43f5e"],
    mentorship: ["#facc15", "#3b82f6", "#10b981", "#ef4444", "#9333ea", "#64748b"],
    line: "#6f16d7"
};

// ---------- Stat Card ----------
// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="shadow-sm rounded-2xl hover:shadow-md transition focus:outline-none">
        <CardContent className="flex items-center justify-between p-5">
            <div>
                <h3 className="text-sm text-slate-500">{title}</h3>
                <p className="text-3xl font-bold text-dark mt-1">{value ?? "-"}</p>
            </div>
            <Icon className={`w-7 h-7 ${color}`} />
        </CardContent>
    </Card>
);

const AdminOverview = () => {

    const { user } = useContext(AuthContext);

    // ---------- fetch admin overview data from the server ----------
    const { data, isPending, isError } = useQuery({
        queryKey: ["admin-overview"],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get("http://localhost:5000/admin/overview", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ---------- show skeleton when data loading ----------
    if (isPending) {
        return (
            <StatsSkeleton></StatsSkeleton>
        );
    }

    // ---------- unable to fetch data from server ----------
    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold text-red-500">Failed to load admin data.</p>
            </div>
        );
    }

    // ---------- data for graph and chart ----------
    const stats = data?.totals || {};
    const usersByRole = data?.usersByRole || [];
    const jobTypeData = data?.jobTypeData || [];
    const eventTypeData = data?.eventTypeData || [];
    const connectionsGrowthData = data?.connectionsGrowthData || [];
    const mentorshipStatusData = data?.mentorshipStatusData || [];
    const topMentors = data?.topMentors || [];

    // ---------- detect if small device ----------
    const isSmallDevice = window.innerWidth < 425;

    return (
        <div className="mx-2 md:mx-5 my-8 text-semi-dark overflow-x-hidden">
            {/* ---------- Page Heading ---------- */}
            <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-8 text-dark">
                Admin Overview
            </h2>

            {/* ---------- Summary Cards ---------- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                <StatCard title="Total Users" value={stats.totalUsers} icon={FaUsers} color="text-blue-500" />
                <StatCard title="Total Events" value={stats.totalEvents} icon={FaCalendarAlt} color="text-amber-500" />
                <StatCard title="Total Jobs" value={stats.totalJobs} icon={FaBriefcase} color="text-green-600" />
                <StatCard title="Mentorships" value={stats.totalMentorships} icon={FaChalkboardTeacher} color="text-purple-600" />
            </div>

            {/* ---------- Graphs Section ---------- */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16 overflow-x-auto">

                {/* ---------- users by role (pie chart) ---------- */}
                <Card className="p-5 min-w-[350px]">
                    <h3 className="font-semibold text-dark mb-4 text-sm md:text-base">Users by Role</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={usersByRole}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {usersByRole.map((entry, index) => (
                                    <Cell key={index} fill={COLOR_SETS.roles[index % COLOR_SETS.roles.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>

                {/* ---------- job type (bar chart) ---------- */}
                <Card className="p-5 min-w-[350px]">
                    <h3 className="font-semibold text-dark mb-4 text-sm md:text-base">Job Type Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={jobTypeData}
                            margin={{ right: 20 }}
                            className={`${isSmallDevice ? "overflow-x-auto" : ""}`}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {jobTypeData.map((entry, index) => (
                                    <Cell key={index} fill={COLOR_SETS.jobs[index % COLOR_SETS.jobs.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* ---------- event type (pie chart) ---------- */}
                <Card className="p-5 min-w-[350px]">
                    <h3 className="font-semibold text-dark mb-4 text-sm md:text-base">Event Type Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={eventTypeData}
                                dataKey="count"
                                nameKey="type"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {eventTypeData.map((entry, index) => (
                                    <Cell key={index} fill={COLOR_SETS.events[index % COLOR_SETS.events.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* ---------- Engagement Section ---------- */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16 overflow-x-auto">

                {/* ---------- connection growth (line chart) ---------- */}
                <Card className="p-5 min-w-[400px]">
                    <h3 className="font-semibold text-dark mb-4 text-sm md:text-base">Connections Growth Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={connectionsGrowthData}
                            margin={{ right: 30 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="connections" stroke={COLOR_SETS.line} strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* ---------- mentorship status (bar chart) ---------- */}
                <Card className="p-5 min-w-[400px]">
                    <h3 className="font-semibold text-dark mb-4 text-sm md:text-base">Mentorship Status Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mentorshipStatusData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count">
                                {mentorshipStatusData.map((entry, index) => (
                                    <Cell key={index} fill={COLOR_SETS.mentorship[index % COLOR_SETS.mentorship.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* ---------- top mentor section ---------- */}
            <Card className="p-5 focus:outline-none overflow-x-auto">
                <h3 className="font-semibold text-dark mb-6 text-sm md:text-base">
                    Top Mentors (by Accepted Mentorships)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm font-poppins">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm">
                            <tr>
                                <th className="py-3 px-4 font-semibold">#</th>
                                <th className="py-3 px-4 font-semibold">Mentor Name</th>
                                <th className="py-3 px-4 font-semibold text-right">Accepted Mentorships</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topMentors.length > 0 ? (
                                topMentors.map((mentor, idx) => (
                                    <tr
                                        key={mentor.name}
                                        className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-slate-100 transition`}
                                    >
                                        <td className="py-3 px-4">{idx + 1}</td>
                                        <td className="py-3 px-4">{mentor.name}</td>
                                        <td className="py-3 px-4 text-right font-semibold text-indigo-600">
                                            {mentor.mentorships}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        No mentor data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminOverview;