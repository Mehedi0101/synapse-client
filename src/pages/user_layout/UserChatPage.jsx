import { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../contexts/AuthContext";
import defaultUser from "../../assets/default_user.jpg";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import toast from "react-hot-toast";

const POLLING_INTERVAL = 2000; // refresh every 2 seconds

const UserChatPage = () => {

    // ---------- friend id from url ----------
    const { id: friendId } = useParams();

    // ---------- user details from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- hooks ----------
    const queryClient = useQueryClient();

    // ---------- message for send ----------
    const [newMessage, setNewMessage] = useState("");

    // ---------- reference for scrolling to the end of the messages ----------
    const messagesEndRef = useRef(null);

    // ---------- Auto-scroll ----------
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // ---------- Fetch Friend Info ----------
    const {
        data: friend,
        isLoading: friendLoading,
    } = useQuery({
        queryKey: ["friend-info", friendId],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/users/${friendId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!friendId,
    });

    // ---------- Fetch Messages ----------
    const {
        data: messages = [],
        isLoading: messagesLoading,
    } = useQuery({
        queryKey: ["chat-messages", userDetails?._id, friendId],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(
                `http://localhost:5000/messages/${userDetails._id}/${friendId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
            );
            return res.data;
        },
        enabled: !!userDetails?._id && !!friendId,
        refetchInterval: POLLING_INTERVAL, // auto refetch every 2 sec
    });

    // ---------- Send Message (Mutation) ----------
    const sendMessageMutation = useMutation({
        mutationFn: async (messageData) => {
            const token = await user.getIdToken();
            await axios.post("http://localhost:5000/messages", messageData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["chat-messages", userDetails?._id, friendId]);
        },
        onError: (error) => {
            // Extract message from server or fallback
            const serverMessage =
                error.response?.data?.message || "Failed to send message";

            toast.error(serverMessage);
        },
    });

    // ---------- send message function ----------
    const handleSend = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            senderId: userDetails._id,
            receiverId: friendId,
            text: newMessage,
            createdAt: new Date(),
        };

        queryClient.setQueryData(["chat-messages", userDetails._id, friendId], (old = []) => [
            ...old,
            { ...messageData, self: true },
        ]);

        setNewMessage("");
        sendMessageMutation.mutate(messageData);
    };

    // ---------- Auto-scroll on new messages ----------
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // ---------- page title ----------
    useEffect(() => {
        document.title = friend?.name || "Chat";
    }, [friend]);

    return (
        <>
            {/* ---------- Header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-4 flex flex-col h-[calc(100vh-85px)] md:h-[calc(100vh-110px)] bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-sm">

                {/* ---------- Chat Header ---------- */}
                <div className="flex items-center gap-3 p-4 bg-white rounded-t-2xl shadow-sm border-b border-gray-100">
                    {friendLoading ? (

                        // ---------- friend data loading ----------
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    ) : (
                        <>

                            {/* ---------- friend image ---------- */}
                            <img
                                src={friend?.userImage || defaultUser}
                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                alt={friend?.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>

                                {/* ---------- friend name ---------- */}
                                <h2 className="font-semibold text-dark text-sm md:text-base">
                                    {friend?.name}
                                </h2>

                                {/* ---------- friend role ---------- */}
                                <p className="text-xs text-slate-500">{friend?.role || "User"}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* ---------- Messages Section ---------- */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-ash scrollbar-track-gray-200">
                    {messagesLoading ? (

                        // ---------- loading message ----------
                        <p className="text-center text-slate-400 mt-10">Loading messages...</p>
                    ) : messages.length === 0 ? (

                        // ---------- no message in this conversation ----------
                        <p className="text-center text-slate-400 mt-10">
                            No messages yet. Say hi 👋
                        </p>
                    ) : (
                        messages.map((msg, index) => {

                            // ---------- detection of sender and receiver ----------
                            const isCurrentUser = msg.senderId === userDetails._id;

                            // ---------- previous and next message ----------
                            const previousMsg = messages[index - 1];
                            const nextMsg = messages[index + 1];

                            // ---------- check if the neighboring message's sender is the same person or not ----------
                            const isSameSenderAsPrev = previousMsg && previousMsg.senderId === msg.senderId;
                            const isSameSenderAsNext = nextMsg && nextMsg.senderId === msg.senderId;

                            // ---------- gap logic ----------
                            const marginTopClass = isSameSenderAsPrev ? "-mt-3" : "mt-4";

                            // ---------- Determine bubble shape (Messenger-style chaining) ----------
                            let bubbleClass = "";
                            if (!isSameSenderAsPrev && !isSameSenderAsNext) {
                                // Single message
                                bubbleClass = "rounded-2xl";
                            } else if (!isSameSenderAsPrev && isSameSenderAsNext) {
                                // Start of sequence
                                bubbleClass = isCurrentUser
                                    ? "rounded-2xl rounded-br-none"
                                    : "rounded-2xl rounded-bl-none";
                            } else if (isSameSenderAsPrev && isSameSenderAsNext) {
                                // Middle of sequence
                                bubbleClass = isCurrentUser
                                    ? "rounded-2xl rounded-tr-none rounded-br-none"
                                    : "rounded-2xl rounded-tl-none rounded-bl-none";
                            } else if (isSameSenderAsPrev && !isSameSenderAsNext) {
                                // End of sequence
                                bubbleClass = isCurrentUser
                                    ? "rounded-2xl rounded-tr-none"
                                    : "rounded-2xl rounded-tl-none";
                            }

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${marginTopClass}`}
                                >
                                    <div
                                        className={`px-4 py-2 text-sm max-w-[80%] md:max-w-[60%] shadow-sm break-words ${isCurrentUser
                                            ? `bg-primary text-white ${bubbleClass}`
                                            : `bg-[#0072cf] text-white ${bubbleClass}`
                                            }`}
                                    >
                                        {/* ---------- message ---------- */}
                                        <p>{msg.text}</p>

                                        {/* ---------- date ---------- */}
                                        <span className="block text-[10px] text-slate-300 mt-1 text-right">
                                            {format(new Date(msg.createdAt), "hh:mm a")}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* ---------- Input Box ---------- */}
                <div className="p-3 bg-white rounded-b-2xl border-t border-gray-100 flex items-center gap-3">

                    {/* ---------- input field ---------- */}
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-200 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white max-w-full min-w-0"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />

                    {/* ---------- send button ---------- */}
                    <button
                        onClick={handleSend}
                        disabled={sendMessageMutation.isPending}
                        className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition disabled:opacity-50"
                    >
                        <IoSend size={20} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserChatPage;