import { Link } from "react-router-dom";
import defaultUser from "../../../assets/default_user.jpg";
import { useState } from "react";
import GrayButton from "../../shared/buttons/GrayButton";
import RedButton from "../../shared/buttons/RedButton";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Swal from "sweetalert2";


const MyConnectionCard = ({ connection }) => {
    const [clicked, setClicked] = useState(false);
    const connectionDate = format(new Date(connection.createdAt), "MMMM d, yyyy");

    const handleRemoveConnection = () => {

        // ---------- sweetalert for confirmation ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove ${connection?.otherUser?.name}?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This person will no longer be in your connections list.</p>
                `,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            denyButtonText: 'No',
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-2',
                confirmButton: 'order-1 right-gap',
            },
        }).then((result) => {

            // ---------- actions after confirming ---------- 
            if (result.isConfirmed) {

                // ---------- loading toast ----------
                const toastId = toast.loading('Removing...');

                // ---------- request to delete a connection based on it's id ----------
                axios.delete(`http://localhost:5000/connections/${connection._id}`,)
                    .then((data) => {

                        // ---------- remove successful ----------
                        if (data?.data?.acknowledged) {
                            toast.success('Removed', { id: toastId });
                            setClicked(true);
                        }

                        // ---------- remove unsuccessful ----------
                        else {
                            toast.error('Something went wrong', { id: toastId });
                        }
                    })

                    // ---------- remove request unsuccessful ----------
                    .catch(() => {
                        toast.error('Something went wrong', { id: toastId });
                    })
            }
        })
    }

    return (
        <div className="rounded-2xl shadow-lg p-4 flex flex-col min-[400px]:flex-row text-center min-[400px]:text-left items-center gap-4 hover:shadow-xl transition-shadow duration-300">

            {/* ---------- User Image ---------- */}
            <div className="min-w-fit">
                <img
                    src={connection?.otherUser?.userImage || defaultUser}
                    onError={(e) => { e.currentTarget.src = defaultUser; }}
                    alt="user image"
                    className="w-24 h-24 rounded-full object-cover"
                />
            </div>


            <div className="w-full">
                {/* ---------- User Name ---------- */}
                <Link to={`/profile/${connection?.otherUser?._id}`} className="w-fit">
                    <h3 className="text-dark hover:underline hover:text-primary transition-all duration-200 font-bold font-poppins inline-block">
                        {connection?.otherUser?.name || "N/A"}
                    </h3>
                </Link>

                {/* ---------- Role | Department ---------- */}
                <p className="text-sm text-slate-600 mt-1 w-fit">
                    {connection?.otherUser?.role || "N/A"} | {connection?.otherUser?.department || "N/A"}
                </p>

                {/* ---------- connection date ---------- */}
                <p className="text-xs text-slate-500 mt-2">
                    Connected on {connectionDate}
                </p>
            </div>

            <div className="w-full min-[400px]:w-fit">
                {
                    clicked ?
                        // ---------- if clicked then show the disabled gray button ----------
                        <GrayButton
                            text="Removed"
                            className="w-full text-sm"
                        ></GrayButton>
                        :
                        // ---------- if not clicked then show the remove button ----------
                        <RedButton
                            text="Remove"
                            className="w-full text-sm"
                            clickFunction={handleRemoveConnection}
                        />
                }
            </div>
        </div>
    );
};

export default MyConnectionCard;