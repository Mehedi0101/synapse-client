import { useContext, useState } from "react";
import defaultUser from "../../../assets/default_user.jpg";
import PurpleButton from "../../shared/buttons/PurpleButton";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import GrayButton from "../../shared/buttons/GrayButton";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ConnectionCard = ({ user, refetchPeopleYouMayConnect, refetchSentRequests }) => {
    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- button status ----------
    const [clicked, setClicked] = useState(false);

    const handleConnect = () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Sending Request...');

        // ---------- connection request data ----------
        const from = userDetails?._id;
        const to = user?._id;
        const status = "pending";

        const data = { from, to, status };

        // ---------- post request to insert a connection request to database ----------
        axios.post("http://localhost:5000/connections", data)
            .then((data) => {

                // ---------- post request successful ----------
                if (data?.data?.acknowledged) {
                    toast.success('Request Sent', { id: toastId });
                    setClicked(true);
                    refetchPeopleYouMayConnect();
                    refetchSentRequests();
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
        <motion.div

            // ---------- card animation configuration ----------
            initial={{ opacity: 0, y: 50 }} // start invisible and 50px lower
            whileInView={{ opacity: 1, y: 0 }} // animate into place
            viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
            transition={{ duration: 0.6, ease: "easeOut" }}

            className="rounded-2xl shadow-lg p-4 flex flex-col justify-between items-center text-center hover:shadow-xl transition-shadow duration-300 col-span-1">

            {/* ---------- User Image ---------- */}
            <img
                src={user?.userImage || defaultUser}
                onError={(e) => { e.currentTarget.src = defaultUser; }}
                alt={user?.name || "User"}
                className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {/* ---------- User Name ---------- */}
            <Link to={`/profile/${user?._id}`} className="text-dark hover:underline hover:text-primary transition-all duration-200">
                <h3 className="font-bold font-poppins">
                    {user?.name || "Unknown"}
                </h3>
            </Link>


            {/* ---------- Role | Department ---------- */}
            <p className="text-sm text-slate-600 mb-4">
                {user?.role || "N/A"} | {user?.department || "N/A"}
            </p>

            {/* ---------- Connection Button ---------- */}
            {
                clicked ?
                    // ---------- if clicked then show the disabled gray button ----------
                    <GrayButton
                        text="Request Sent"
                        className="w-full text-sm"
                    ></GrayButton>
                    :
                    // ---------- if not clicked then show the connect button ----------
                    <PurpleButton
                        text="Connect"
                        className="w-full text-sm"
                        clickFunction={() => { handleConnect() }}
                    />
            }

        </motion.div>
    );
};

export default ConnectionCard;
