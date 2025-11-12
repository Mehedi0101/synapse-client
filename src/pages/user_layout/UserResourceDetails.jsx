import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import defaultUser from "../../assets/default_user.jpg";
import defaultBanner from "../../assets/default_resource_banner.jpg";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UserResourceDetails = ({ display = "" }) => {

    // ---------- resource id from url ----------
    const { id } = useParams();

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- resource details for display ----------
    const [resourceDetails, setResourceDetails] = useState({});

    // ---------- fetch resource details ----------
    useEffect(() => {
        axios.get(`http://localhost:5000/resources/details/${id}`)
            .then((data) => {
                if (data.data) setResourceDetails(data.data);
                else navigate("/error");
            })
            .catch(() => navigate("/error"));
    }, [id, navigate]);

    // ---------- resource delete function ----------
    const handleRemoveResource = () => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight:bold;">Remove this contribution?</h2>
                <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This action cannot be undone.</p>
            `,
            confirmButtonText: "Remove",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6f16d7",
        }).then((result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Removing...");

                // ---------- delete request ----------
                axios.delete(`http://localhost:5000/resources/${id}`)
                    .then((res) => {
                        if (res.data?.acknowledged) {
                            toast.success("Removed successfully!", { id: toastId });

                            // ---------- navigate to resources page ----------
                            navigate("/resources");
                        } else {
                            toast.error("Something went wrong", { id: toastId });
                        }
                    })
                    .catch(() => toast.error("Something went wrong"));
            }
        });
    };

    return (
        <div>
            <UserHeader searchBar="invisible" display={display} />

            <div className="max-w-5xl mx-auto my-10 px-3 sm:px-6 lg:px-8">
                {/* ---------- Title & Author section ---------- */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">

                    {/* ---------- title ---------- */}
                    <h1 className="text-2xl md:text-3xl font-bold text-dark font-poppins">
                        {resourceDetails?.title}
                    </h1>

                    {/* ---------- control section (for author only) ---------- */}
                    {resourceDetails?.author?._id === userDetails?._id && (
                        <div className="flex gap-3">

                            {/* ---------- edit ---------- */}
                            <Link to={`/resources/update/${id}`}>
                                <BiEdit className="text-2xl text-slate-600 hover:text-primary cursor-pointer" />
                            </Link>

                            {/* ---------- delete ----------F */}
                            <AiOutlineDelete
                                className="text-2xl text-slate-600 hover:text-red-600 cursor-pointer"
                                onClick={handleRemoveResource}
                            />
                        </div>
                    )}
                </div>

                {/* ---------- Author Info ---------- */}
                <div className="flex items-center gap-3 mt-4">

                    {/* ---------- author image ---------- */}
                    <img
                        src={resourceDetails?.author?.userImage || defaultUser}
                        onError={(e) => { e.currentTarget.src = defaultUser; }}
                        alt="author"
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* ---------- author name, role and department section ---------- */}
                    <div>
                        <p className="font-semibold text-dark">
                            {resourceDetails?.author?.name}
                        </p>
                        <p className="text-sm text-slate-500">
                            {resourceDetails?.author?.role} | {resourceDetails?.author?.department}
                        </p>
                    </div>
                </div>

                {/* ---------- Banner ---------- */}
                {
                    resourceDetails?.image &&
                    <div className="mt-6">
                        <img
                            src={resourceDetails?.image}
                            onError={(e) => { e.currentTarget.src = defaultBanner; }}
                            alt="resource banner"
                            className="w-full h-72 object-cover rounded-xl shadow"
                        />
                    </div>
                }

                {/* ---------- Content ---------- */}
                <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-semi-dark">
                    {resourceDetails?.content?.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserResourceDetails;