import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import defaultUser from "../../../assets/default_user.jpg";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import formatTimeAgo from "../../../functions/formatTimeAgo";

const InboxTab = () => {

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- hooks ----------
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // ---------- fetch chat info ----------
    const { data: chats = [], isPending } = useQuery({
        queryKey: ["chat-info", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/chat-info/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id,
    });

    // ---------- mark as read (tanstack mutation) ----------
    const markAsRead = useMutation({
        mutationFn: async ({ chatId, userId }) => {
            await axios.patch(`http://localhost:5000/chat-info/read/${chatId}/${userId}`);
        },
        onSuccess: () => {
            // Refresh inbox to show updated unread count
            queryClient.invalidateQueries(["chat-info", userDetails?._id]);
        },
    });

    // ---------- chat open function ----------
    const handleOpenChat = (chatId, friendId, hasUnread) => {
        if (hasUnread) {
            markAsRead.mutate({ chatId, userId: userDetails._id });
        }
        navigate(`/messages/chat/${friendId}`);
    };

    // ---------- when fetching chat info ----------
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-slate-500">Loading inbox...</p>
            </div>
        );
    }

    // ---------- if no chat info found ----------
    if (!chats.length) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-slate-500">No conversations yet.</p>
            </div>
        );
    }

    // ---------- Sort by most recent ----------
    const sortedChats = [...chats].sort((a, b) => new Date(b.lastAt) - new Date(a.lastAt));

    return (
        <div className="flex flex-col gap-3">
            {sortedChats.map((chat) => {

                // ---------- chat info data for displaying ----------
                const friend = chat.otherUser || {};
                const lastMessage = chat.lastMessage || "No messages yet";
                const unreadCount = chat.unreadCount || 0;
                const hasUnread = unreadCount > 0;

                return (

                    // ---------- chat info ----------
                    <div
                        key={chat._id}
                        onClick={() => handleOpenChat(chat._id, friend._id, hasUnread)}
                        className={`flex items-center justify-between p-4 rounded-xl transition border border-gray-100 shadow-sm hover:shadow-md cursor-pointer ${hasUnread ? "bg-indigo-50" : "bg-white"
                            }`}
                    >
                        {/* ---------- Left Section (friend info) ---------- */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="relative flex-shrink-0">

                                {/* ---------- friend image ---------- */}
                                <img
                                    src={friend?.userImage || defaultUser}
                                    onError={(e) => { e.currentTarget.src = defaultUser; }}
                                    alt={friend?.name}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />

                                {/* ---------- unread count (if any) ---------- */}
                                {hasUnread && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">

                                {/* ---------- friend name ---------- */}
                                <h4
                                    className="font-semibold text-dark truncate max-w-[160px]"
                                    title={friend?.name}
                                >
                                    {friend?.name || "Unknown User"}
                                </h4>

                                {/* ---------- friend role ---------- */}
                                <p
                                    className={`text-xs truncate max-w-[200px] ${hasUnread ? "text-slate-800 font-medium" : "text-slate-500"
                                        }`}
                                    title={lastMessage}
                                >
                                    {lastMessage}
                                </p>
                            </div>
                        </div>

                        {/* ---------- Timestamp for large device ---------- */}
                        <span
                            className={`text-xs whitespace-nowrap ml-3 ${hasUnread ? "text-indigo-600 font-medium" : "text-slate-400"
                                } hidden sm:block`}
                        >
                            {chat.lastAt
                                ? formatDistanceToNow(new Date(chat.lastAt), { addSuffix: true })
                                : ""}
                        </span>

                        {/* ---------- timestamp for small device ---------- */}
                        <span
                            className={`text-xs whitespace-nowrap ml-3 ${hasUnread ? "text-indigo-600 font-medium" : "text-slate-400"
                                } sm:hidden`}
                        >
                            {chat.lastAt
                                ? formatTimeAgo(new Date(chat.lastAt))
                                : ""}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default InboxTab;