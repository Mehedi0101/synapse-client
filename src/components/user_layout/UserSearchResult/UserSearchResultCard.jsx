import { Link } from "react-router-dom";
import { useContext } from "react";
import {
    UserPlus,
    UserMinus,
    Check,
    X
} from "lucide-react";
import AuthContext from "../../../contexts/AuthContext";
import defaultUser from "../../../assets/default_user.jpg";
import PurpleButton from "../../shared/buttons/PurpleButton";
import RedButton from "../../shared/buttons/RedButton";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const UserSearchResultCard = ({ user, refetch }) => {

    const { userDetails, user: auth } = useContext(AuthContext);
    const status = user.connectionStatus || {};

    const isEmpty = Object.keys(status).length === 0;
    const isPending = status.status === "pending";
    const isAccepted = status.status === "accepted";

    const isSentByMe = isPending && status.from === userDetails?._id;
    const isSentToMe = isPending && status.to === userDetails?._id;

    // ---------- send connection request function ----------
    const handleConnect = async () => {

        // ---------- loading toast ----------
        const toastId = toast.loading('Sending Request...');

        // ---------- connection request data ----------
        const from = userDetails?._id;
        const to = user?.id;
        const status = "pending";

        // ---------- post request to insert a connection request to database ----------
        try {
            const connectionData = { from, to, status };

            const token = await auth.getIdToken();
            const { data } = await axios.post("http://localhost:5000/connections", connectionData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data?.acknowledged) {
                toast.success('Request Sent', { id: toastId });
                refetch();
            }
            else {
                toast.error('Something went wrong', { id: toastId });
            }
        }
        catch {
            toast.error('Something went wrong', { id: toastId });
        }
    };


    // ---------- remove connection function ----------
    const handleRemove = () => {
        // ---------- sweetalert for confirmation ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove ${user?.name}?</h2>
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
        }).then(async (result) => {

            // ---------- actions after confirming ---------- 
            if (result.isConfirmed) {
                // ---------- loading toast ----------
                const toastId = toast.loading('Removing...');

                // ---------- request to delete a connection based on it's id ----------
                try {
                    const token = await auth.getIdToken();
                    const { data } = await axios.delete(`http://localhost:5000/connections/${userDetails?._id}/${user?.connectionStatus?.connectionId}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success('Removed', { id: toastId });
                        refetch();
                    }
                    else {
                        toast.error('Something went wrong', { id: toastId });
                    }
                }
                catch (error) {
                    console.log(error);
                    toast.error('Something went wrong', { id: toastId });
                }
            }
        })
    };

    // ---------- remove connection request function ----------
    const handleCancelRequest = async () => {

        // ---------- loading toast ----------
        const toastId = toast.loading('Cancelling...');

        // ---------- post request to remove a connection request to database ----------
        try {
            const token = await auth.getIdToken();

            const { data } = await axios.delete(`http://localhost:5000/connections/${userDetails?._id}/${user?.connectionStatus?.connectionId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data?.acknowledged) {
                toast.success('Cancelled', { id: toastId });
                refetch();
            }
            else {
                toast.error('Something went wrong', { id: toastId });
            }
        }
        catch {
            toast.error('Something went wrong', { id: toastId });
        }
    };

    // ---------- accept connection request function ----------
    const handleAcceptRequest = async () => {
        // ---------- loading toast ----------
        const toastId = toast.loading('Accepting...');

        // ---------- patch request when accepting connection request ----------
        try {
            const token = await auth.getIdToken();

            const { data } = await axios.patch("http://localhost:5000/connections/accept", { connectionId: user?.connectionStatus?.connectionId, userId: userDetails?._id }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data?.acknowledged) {
                toast.success('Accepted', { id: toastId });
                refetch();
            }
            else {
                toast.error('Something went wrong', { id: toastId });
            }
        }
        catch {
            toast.error('Something went wrong', { id: toastId });
        }
    };

    return (
        <div className="rounded-2xl shadow-lg p-4 flex flex-col min-[400px]:flex-row text-center min-[400px]:text-left items-center gap-4 hover:shadow-xl transition-shadow duration-300">

            {/* ---------- User Image ---------- */}
            <div className="min-w-fit">
                <img
                    src={user.image || defaultUser}
                    onError={(e) => { e.currentTarget.src = defaultUser; }}
                    alt="user image"
                    className="w-24 h-24 rounded-full object-cover"
                />
            </div>

            <div className="w-full">
                <Link to={`/profile/${user.id}`} className="w-fit">
                    <h3 className="text-dark hover:underline hover:text-primary transition-all duration-200 font-bold font-poppins inline-block">
                        {user.name}
                    </h3>
                </Link>

                <p className="text-sm text-slate-600 mt-1">
                    {user.role} | {user.department}
                </p>
            </div>

            {/* ---------- Buttons Section ---------- */}
            <div className="w-full min-[400px]:w-fit flex gap-4 justify-center min-[400px]:justify-end">

                {/* ------------------- FULL BUTTONS: for small devices ------------------- */}
                <div className="flex flex-col gap-3 w-full min-[400px]:hidden">

                    {isEmpty && (
                        <PurpleButton
                            text="Connect"
                            className="w-full text-sm"
                            clickFunction={handleConnect}
                        />
                    )}

                    {isAccepted && (
                        <RedButton
                            text="Remove"
                            className="w-full text-sm"
                            clickFunction={handleRemove}
                        />
                    )}

                    {isSentByMe && (
                        <RedButton
                            text="Cancel Request"
                            className="w-full text-sm"
                            clickFunction={handleCancelRequest}
                        />
                    )}

                    {isSentToMe && (
                        <>
                            <PurpleButton
                                text="Accept"
                                className="w-full text-sm"
                                clickFunction={handleAcceptRequest}
                            />
                            <RedButton
                                text="Reject"
                                className="w-full text-sm"
                                clickFunction={handleCancelRequest}
                            />
                        </>
                    )}
                </div>

                {/* ------------------- ICON BUTTONS: for large devices ------------------- */}
                <div className="hidden min-[400px]:flex gap-4">

                    {isEmpty && (
                        <button
                            onClick={handleConnect}
                            className="text-primary hover:text-primary/70 transition cursor-pointer"
                            title="Send Request"
                        >
                            <UserPlus size={26} />
                        </button>
                    )}

                    {isAccepted && (
                        <button
                            onClick={handleRemove}
                            className="text-red-600 hover:text-red-600/70 transition cursor-pointer"
                            title="Remove Connection"
                        >
                            <UserMinus size={26} />
                        </button>
                    )}

                    {isSentByMe && (
                        <button
                            onClick={handleCancelRequest}
                            className="text-red-600 hover:text-red-600/70 transition cursor-pointer"
                            title="Cancel Request"
                        >
                            <X size={28} />
                        </button>
                    )}

                    {isSentToMe && (
                        <>
                            <button
                                onClick={handleAcceptRequest}
                                className="text-primary hover:text-primary/70 transition cursor-pointer"
                                title="Accept Request"
                            >
                                <Check size={28} />
                            </button>

                            <button
                                onClick={handleCancelRequest}
                                className="text-red-600 hover:text-red-600/70 transition cursor-pointer"
                                title="Reject Request"
                            >
                                <X size={28} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserSearchResultCard;