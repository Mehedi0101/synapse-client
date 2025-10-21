import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultUser from "../../../assets/default_user.jpg";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const StartConversationTab = () => {
    const { userDetails } = useContext(AuthContext);

    const { data: connections = [], isPending } = useQuery({
        queryKey: ["connections", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/connections/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id,
    });

    if (isPending) {
        return <p className="text-center text-slate-500">Loading connections...</p>;
    }

    if (connections.length === 0) {
        return <p className="text-center text-slate-500">No connections found.</p>;
    }

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {connections.map((connection) => {
                const friend =
                    connection.from._id === userDetails._id
                        ? connection.to
                        : connection.from;

                return (
                    <div
                        key={connection._id}
                        className="flex items-center justify-between bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={friend?.userImage || defaultUser}
                                alt={friend?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h4
                                    className="font-semibold text-dark truncate max-w-[120px]"
                                    title={friend?.name}
                                >
                                    {friend?.name}
                                </h4>
                                <p className="text-xs text-slate-500">
                                    {friend?.role || "User"}
                                </p>
                            </div>
                        </div>

                        <Link
                            to={`/messages/chat/${friend._id}`}
                            className="text-xs bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-dark transition"
                        >
                            Message
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default StartConversationTab;