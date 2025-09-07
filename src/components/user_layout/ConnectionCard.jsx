import { useContext, useState } from "react";
import defaultUser from "../../assets/default_user.jpg";
import PurpleButton from "../shared/buttons/PurpleButton";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import GrayButton from "../shared/buttons/GrayButton";

const ConnectionCard = ({ user }) => {
    const { userDetails } = useContext(AuthContext);

    const [clicked, setClicked] = useState(false);

    const handleConnect = () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Sending Request...');

        const from = userDetails?._id;
        const to = user?._id;
        const status = "pending";

        const data = { from, to, status };

        axios.post("http://localhost:5000/connections", data)
            .then((data) => {
                if (data?.data?.acknowledged) {
                    toast.success('Request Sent', { id: toastId });
                }
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
                src={user?.userImage || defaultUser}
                alt={user?.name || "User"}
                className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {/* ---------- User Name ---------- */}
            <h3 className="text-lg font-bold text-dark font-poppins">
                {user?.name || "Unknown"}
            </h3>

            {/* ---------- Role | Department ---------- */}
            <p className="text-sm text-slate-600 mb-4">
                {user?.role || "N/A"} | {user?.department || "N/A"}
            </p>

            {/* ---------- Connection Button ---------- */}
            {
                clicked ?
                    <GrayButton
                        text="Request Sent"
                        className="w-full text-sm"
                    ></GrayButton>
                    :
                    <PurpleButton
                        text="Connect"
                        className="w-full text-sm"
                        clickFunction={() => { handleConnect(); setClicked(true) }}
                    />
            }

        </div>
    );
};

export default ConnectionCard;
