import { useState } from "react";
import defaultUser from "../../assets/default_user.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import GrayButton from "../shared/buttons/GrayButton";
import RedButton from "../shared/buttons/RedButton";
import { formatDistanceToNow } from "date-fns";

const SentRequestCard = ({ req }) => {

    // ---------- button status ----------
    const [clicked, setClicked] = useState(false);
    let timeAgo = formatDistanceToNow(new Date(req.createdAt), { addSuffix: true });
    timeAgo = timeAgo.replace("less than a minute ago", "Just now");

    const handleCancelRequest = () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Sending Request...');

        // ---------- post request to insert a connection request to database ----------
        axios.delete(`http://localhost:5000/connections/${req._id}`,)
            .then((data) => {

                // ---------- post request successful ----------
                console.log(data.data);
                if (data?.data?.acknowledged) {
                    toast.success('Request Sent', { id: toastId });
                }

                // ---------- post request unsuccessful ----------
                else {
                    toast.error('Something went wrong', { id: toastId });
                }
            })
            .catch(() => {
                toast.error('Something went wrong', { id: toastId });
            })
    }

    return (
        <div className="rounded-2xl shadow-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-xl transition-shadow duration-300 col-span-1">

            {/* ---------- User Image ---------- */}
            <img
                src={req?.toUser?.userImage || defaultUser}
                alt="user image"
                className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {/* ---------- User Name ---------- */}
            <h3 className="text-lg font-bold text-dark font-poppins">
                {req?.toUser?.name || "N/A"}
            </h3>

            {/* ---------- Role | Department ---------- */}
            <p className="text-sm text-slate-600 mb-4">
                {req?.toUser?.role || "N/A"} | {req?.toUser?.department || "N/A"}
            </p>

            <div className="w-full">
                <p className="text-xs text-slate-500 mb-3">
                    {timeAgo}
                </p>
                {/* ---------- Connection Button ---------- */}
                {
                    clicked ?
                        // ---------- if clicked then show the disabled gray button ----------
                        <GrayButton
                            text="Request Cancelled"
                            className="w-full text-sm"
                        ></GrayButton>
                        :
                        // ---------- if not clicked then show the connect button ----------
                        <RedButton
                            text="Cancel Request"
                            className="w-full text-sm"
                            clickFunction={() => { handleCancelRequest(); setClicked(true) }}
                        />
                }
            </div>
        </div>
    );
};

export default SentRequestCard;