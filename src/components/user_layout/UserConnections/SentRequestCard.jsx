import { useContext } from "react";
import defaultUser from "../../../assets/default_user.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import RedButton from "../../shared/buttons/RedButton";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import AuthContext from "../../../contexts/AuthContext";

const SentRequestCard = ({ req, refetchSentRequests, refetchPeopleYouMayConnect }) => {

    const { userDetails, user } = useContext(AuthContext);

    // ---------- time when request was sent ----------
    let timeAgo = formatDistanceToNow(new Date(req.createdAt), { addSuffix: true });
    timeAgo = timeAgo.replace("less than a minute ago", "Just now");

    const handleCancelRequest = async () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Cancelling Request...');

        // ---------- post request to remove a connection request to database ----------
        try {
            const token = await user.getIdToken();

            const { data } = await axios.delete(`http://localhost:5000/connections/${userDetails._id}/${req._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data?.acknowledged) {
                toast.success('Request Cancelled', { id: toastId });
                refetchSentRequests();
                refetchPeopleYouMayConnect();
            }
            else {
                toast.error('Something went wrong', { id: toastId });
            }
        }
        catch {
            toast.error('Something went wrong', { id: toastId });
        }
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
                src={req?.toUser?.userImage || defaultUser}
                onError={(e) => { e.currentTarget.src = defaultUser; }}
                alt="user image"
                className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {/* ---------- User Name ---------- */}
            <Link to={`/profile/${req?.toUser?._id}`} className="text-dark hover:underline hover:text-primary transition-all duration-200">
                <h3 className="font-bold font-poppins">
                    {req?.toUser?.name || "N/A"}
                </h3>
            </Link>

            {/* ---------- Role | Department ---------- */}
            <p className="text-sm text-slate-600 mb-4">
                {req?.toUser?.role || "N/A"} | {req?.toUser?.department || "N/A"}
            </p>

            <div className="w-full">

                {/* ---------- time ago ---------- */}
                <p className="text-xs text-slate-500 mb-3">
                    {timeAgo}
                </p>

                {/* // ---------- cancel button ---------- */}
                <RedButton
                    text="Cancel Request"
                    className="w-full text-sm"
                    clickFunction={() => { handleCancelRequest(); }}
                />
            </div>
        </motion.div>
    );
};

export default SentRequestCard;