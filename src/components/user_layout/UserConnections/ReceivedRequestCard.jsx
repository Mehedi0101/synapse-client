import { useState } from "react";
import defaultUser from "../../../assets/default_user.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import GrayButton from "../../shared/buttons/GrayButton";
import RedButton from "../../shared/buttons/RedButton";
import { formatDistanceToNow } from "date-fns";
import PurpleButton from "../../shared/buttons/PurpleButton";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ReceivedRequestCard = ({ req, refetchReceivedRequests, refetchPeopleYouMayConnect }) => {

    // ---------- button status ----------
    const [requestStatus, setRequestStatus] = useState("pending");
    let timeAgo = formatDistanceToNow(new Date(req.createdAt), { addSuffix: true });
    timeAgo = timeAgo.replace("less than a minute ago", "Just now");

    const handleAcceptRequest = () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Accepting...');

        // ---------- patch request when accepting connection request ----------
        axios.patch("http://localhost:5000/connections/accept", { id: req._id })
            .then((data) => {

                // ---------- accept successful ----------
                if (data?.data?.acknowledged) {
                    toast.success('Accepted', { id: toastId });
                    setRequestStatus("accepted");
                    refetchReceivedRequests();
                }

                // ---------- accept unsuccessful ----------
                else {
                    toast.error('Something went wrong', { id: toastId });
                }
            })
            .catch(() => {

                // ---------- accept unsuccessful ----------
                toast.error('Something went wrong', { id: toastId });
            })
    }

    const handleCancelRequest = () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Cancelling...');

        // ---------- post request to insert a connection request to database ----------
        axios.delete(`http://localhost:5000/connections/${req._id}`,)
            .then((data) => {

                // ---------- delete request successful ----------
                if (data?.data?.acknowledged) {
                    toast.success('Cancelled', { id: toastId });
                    setRequestStatus("cancelled");
                    refetchReceivedRequests();
                    refetchPeopleYouMayConnect();
                }

                // ---------- delete request unsuccessful ----------
                else {
                    toast.error('Something went wrong', { id: toastId });
                }
            })
            .catch(() => {

                // ---------- delete request unsuccessful ----------
                toast.error('Something went wrong', { id: toastId });
            })
    }

    return (
        <motion.div

            // ---------- card animation configuration ----------
            initial={{ opacity: 0, y: 50 }} // start invisible and 50px lower
            whileInView={{ opacity: 1, y: 0 }} // animate into place
            viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
            transition={{ duration: 0.6, ease: "easeOut" }}

            className="rounded-2xl shadow-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-xl transition-shadow duration-300 col-span-1">

            {/* ---------- User Image ---------- */}
            <img
                src={req?.fromUser?.userImage || defaultUser}
                onError={(e) => { e.currentTarget.src = defaultUser; }}
                alt="user image"
                className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {/* ---------- User Name ---------- */}
            <Link to={`/profile/${req?.fromUser?._id}`} className="text-dark hover:underline hover:text-primary transition-all duration-200">
                <h3 className="font-bold font-poppins">
                    {req?.fromUser?.name || "N/A"}
                </h3>
            </Link>

            {/* ---------- Role | Department ---------- */}
            <p className="text-sm text-slate-600 mb-4">
                {req?.fromUser?.role || "N/A"} | {req?.fromUser?.department || "N/A"}
            </p>

            <div className="w-full">

                {/* ---------- time ago ---------- */}
                <p className="text-xs text-slate-500 mb-3">
                    {timeAgo}
                </p>

                {/* ---------- if request status is pending then show accept and cancel button ---------- */}
                {
                    requestStatus === "pending" &&
                    <div className="flex flex-col min-[300px]:flex-row gap-2">
                        <PurpleButton text="Accept"
                            className="text-sm"
                            clickFunction={() => { handleAcceptRequest(); }}
                        />
                        <RedButton
                            text="Cancel"
                            className="text-sm"
                            clickFunction={() => { handleCancelRequest(); }}
                        />
                    </div>
                }
                {/* ---------- if request status is accepted then show the gray button (disabled) ---------- */}
                {
                    requestStatus === "accepted" &&
                    <div className="flex gap-2">
                        <GrayButton
                            text="Accepted"
                            className="w-full text-sm"
                        ></GrayButton>
                    </div>
                }
                {/* ---------- if request status is cancelled then show the gray button (disabled) ---------- */}
                {
                    requestStatus === "cancelled" &&
                    <div className="flex gap-2">
                        <GrayButton
                            text="Cancelled"
                            className="w-full text-sm"
                        ></GrayButton>
                    </div>
                }
            </div>
        </motion.div >
    );
};

export default ReceivedRequestCard;