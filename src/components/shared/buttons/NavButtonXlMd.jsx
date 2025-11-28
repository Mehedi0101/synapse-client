import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NavButtonXlMd = ({ icon, text }) => {
    const { user, userDetails } = useContext(AuthContext);

    // Fetch unread messages only for Messages button
    const fetchUnread = async () => {
        const token = await user.getIdToken();
        const { data } = await axios.get(
            `http://localhost:5000/chat-info/unread/${userDetails._id}`,
            {
                headers: { authorization: `Bearer ${token}` },
            }
        );
        return data?.hasNewMessages;
    };

    const { data: hasUnread } = useQuery({
        queryKey: ["unread-messages", userDetails?._id],
        queryFn: fetchUnread,
        enabled: text === "Messages" && !!userDetails?._id,
        refetchInterval: 4000, // poll every 4s
        refetchOnWindowFocus: false,
    });

    return (
        <button className="relative font-poppins hover:text-primary transition-colors duration-150 ease-in cursor-pointer text-2xl">
            <div className="relative">
                {icon}
                {/* Unread badge */}
                {text === "Messages" && hasUnread && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                )}
            </div>
        </button>
    );
};

export default NavButtonXlMd;