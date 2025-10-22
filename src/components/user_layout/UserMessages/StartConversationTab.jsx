import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultUser from "../../../assets/default_user.jpg";
import { Link } from "react-router-dom";
import PurpleButton from "../../shared/buttons/PurpleButton";
import { LuMessageCircleMore } from "react-icons/lu";

const StartConversationTab = () => {

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- fetch all accepted connections ----------
    const { data: connections = [], isPending } = useQuery({
        queryKey: ["connections", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:5000/connections/accepted/${userDetails?._id}`
            );
            return res.data;
        },
        enabled: !!userDetails?._id,
    });

    // ---------- pending (fetching connections) ----------
    if (isPending) {
        return <p className="text-center text-slate-500">Loading connections...</p>;
    }

    // ---------- no connections found ----------
    if (connections.length === 0) {
        return <p className="text-center text-slate-500">No connections found.</p>;
    }

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {connections.map((connection) => {
                const friend = connection.otherUser;

                return (
                    <div
                        key={connection._id}
                        className="flex items-center gap-2 justify-between bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition"
                    >
                        {/* ---------- connection's info ---------- */}
                        <div className="flex items-center gap-3">

                            {/* ---------- image ---------- */}
                            <img
                                src={friend?.userImage || defaultUser}
                                alt={friend?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>

                                {/* ---------- name ---------- */}
                                <h4
                                    className="font-semibold text-dark"
                                    title={friend?.name}
                                >
                                    {friend?.name}
                                </h4>

                                {/* ---------- role ---------- */}
                                <p className="text-xs text-slate-500">
                                    {friend?.role || "User"}
                                </p>
                            </div>
                        </div>

                        {/* ---------- message button ---------- */}
                        <Link
                            to={`/messages/chat/${friend?._id}`}
                        >
                            {/* ---------- large device ---------- */}
                            <PurpleButton text="Message" className="text-xs hidden min-[400px]:block"></PurpleButton>

                            {/* ---------- small device ---------- */}
                            <LuMessageCircleMore className="min-[400px]:hidden text-xl text-primary" />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default StartConversationTab;