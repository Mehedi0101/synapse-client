import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultUser from "../../../assets/default_user.jpg";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const InboxTab = () => {
    const { userDetails } = useContext(AuthContext);

    const { data: conversations = [], isPending } = useQuery({
        queryKey: ["inbox", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/messages/inbox/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id,
    });

    if (isPending) {
        return <p className="text-center text-slate-500">Loading inbox...</p>;
    }

    if (conversations.length === 0) {
        return <p className="text-center text-slate-500">No messages yet.</p>;
    }

    return (
        <div className="flex flex-col gap-3">
            {conversations.map((conv) => {
                const otherUser =
                    conv.participants.find((p) => p._id !== userDetails._id) || {};
                return (
                    <Link
                        key={conv._id}
                        to={`/messages/chat/${otherUser._id}`}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={otherUser?.userImage || defaultUser}
                                alt={otherUser?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h4
                                    className="font-semibold text-dark truncate max-w-[160px]"
                                    title={otherUser?.name}
                                >
                                    {otherUser?.name}
                                </h4>
                                <p
                                    className="text-xs text-slate-500 truncate max-w-[180px]"
                                    title={conv.lastMessage?.text}
                                >
                                    {conv.lastMessage?.text || "No messages yet"}
                                </p>
                            </div>
                        </div>

                        <span className="text-xs text-slate-400 whitespace-nowrap">
                            {formatDistanceToNow(new Date(conv.updatedAt), {
                                addSuffix: true,
                            })}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
};

export default InboxTab;