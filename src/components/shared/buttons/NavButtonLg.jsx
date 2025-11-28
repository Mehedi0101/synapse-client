import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NavButtonLg = ({ icon, text }) => {

    const { user, userDetails } = useContext(AuthContext);

    const fetchUnread = async () => {
        const token = await user.getIdToken();
        const { data } = await axios.get(
            `http://localhost:5000/chat-info/unread/${userDetails._id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return data?.hasNewMessages;
    };

    const { data: hasUnread } = useQuery({
        queryKey: ["unread-messages", userDetails?._id],
        queryFn: fetchUnread,

        // run query for Messages button
        enabled: text === "Messages" && !!userDetails?._id,
        refetchInterval: 4000, // 4 second
    });

    return (

        <button
            className="relative flex flex-col space-y-1.5 justify-center items-center font-poppins 
                       hover:text-primary transition-colors duration-150 ease-in cursor-pointer w-20"
        >
            {/* ICON */}
            <div className="text-xl relative">
                {icon}

                {/* Unread badge */}
                {text === "Messages" && hasUnread && (
                    <span className="
                        absolute -top-1 -right-1 h-1.5 w-1.5 bg-red-500 rounded-full 
                        animate-pulse
                    " />
                )}
            </div>

            {/* TEXT */}
            <span className="text-sm font-light">{text}</span>
        </button>
    );
};

export default NavButtonLg;