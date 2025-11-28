import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import defaultUser from "../../assets/default_user.jpg";

const UserUpdateResource = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- resource id from url ----------
    const { id } = useParams();

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- Event Banner State ----------
    const [resourceBannerFile, setResourceBannerFile] = useState(null);

    // ---------- Update Event Banner Function ----------
    const updateResourceBanner = async (file) => {
        if (!file) return null;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "synapse/resource-banners");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                formData
            );
            return response.data.secure_url;
        } catch {
            return null;
        }
    };

    // ---------- resource data for display ----------
    const [resourceData, setResourceData] = useState({
        title: "",
        image: "",
        content: ""
    });

    // ---------- fetch resource details ----------
    useEffect(() => {

        const fetchResourceDetails = async () => {

            try {
                const token = await user.getIdToken();
                const { data } = await axios.get(`http://localhost:5000/resources/details/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if (data) {
                    setResourceData(data);
                }
                else {
                    navigate("/error");
                }
            }
            catch {
                navigate("/error");
            }
        }

        fetchResourceDetails();
    }, [user, id, navigate]);

    // ---------- update resource function ----------
    const handleUpdateResource = (e) => {
        e.preventDefault();

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight:bold;">Confirm Update?</h2>
                <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Do you want to update this resource?</p>
            `,
            confirmButtonText: "Update",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating Resource...");

                // ---------- Upload logo only when submitting ----------
                let finalBannerUrl = resourceData?.image

                if (resourceBannerFile) {
                    const uploaded = await updateResourceBanner(resourceBannerFile);
                    if (!uploaded) {
                        toast.error("Banner update failed", { id: toastId });
                        return;
                    }
                    finalBannerUrl = uploaded;
                }

                // ---------- updated event data ----------
                const updatedResourceData = {
                    ...resourceData
                    // title: resourceData?.title,
                    // image: finalBannerUrl,
                    // content: resourceData?.content,
                };

                updatedResourceData.image = finalBannerUrl;

                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.patch(`http://localhost:5000/resources/${id}`, updatedResourceData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Updated successfully!", { id: toastId });
                        navigate(`/resources/${id}`);
                    }
                    else {
                        toast.error("Something went wrong", { id: toastId });
                    }
                }
                catch {
                    toast.error("Something went wrong", { id: toastId });
                }
            }
        });
    };

    return (
        <>
            <UserHeader searchBar="invisible" />

            <form
                onSubmit={handleUpdateResource}
                className="mx-auto my-10 px-3 sm:px-6 lg:px-8 text-semi-dark text-sm lg:text-base space-y-8"
            >
                {/* ---------- Resource Heading ---------- */}
                <h2 className="text-lg lg:text-xl font-bold text-dark font-poppins border-b-2 pb-2">
                    Update Resource
                </h2>

                {/* ---------- Author Info section ---------- */}
                <div className="flex items-center gap-3">

                    {/* ---------- author image ---------- */}
                    <img
                        src={userDetails?.userImage || defaultUser}
                        onError={(e) => { e.currentTarget.src = defaultUser; }}
                        alt="author"
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* ---------- author name, role and department container ---------- */}
                    <div>
                        <p className="font-semibold text-dark">{userDetails?.name}</p>
                        <p className="text-sm text-slate-500">
                            {userDetails?.role} | {userDetails?.department}
                        </p>
                    </div>
                </div>

                {/* ---------- Title ---------- */}
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter resource title"
                        value={resourceData.title}
                        onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                        className="border-b border-slate-400 outline-none w-full py-1"
                        required
                    />
                </div>

                {/* ---------- Image ---------- */}
                <div>
                    {/* <input
                        type="text"
                        name="image"
                        placeholder="Resource banner URL (optional)"
                        value={resourceData.image}
                        onChange={(e) => setResourceData({ ...resourceData, image: e.target.value })}
                        className="border-b border-slate-400 outline-none w-full py-1"
                    /> */}

                    <div
                        className="mt-2 border-2 border-dashed border-slate-400 rounded-lg p-6 text-center cursor-pointer
                                    hover:border-purple-600 hover:bg-purple-50 transition-colors duration-200"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (!file || !file.type.startsWith("image/")) {
                                toast.error("Only image files are allowed!");
                                return;
                            }
                            setResourceBannerFile(file);
                        }}
                        onClick={() => document.getElementById("resource-file-input").click()}
                    >
                        <span className="text-lg text-slate-500">📁 Update Resource Banner</span>
                        <p className="text-sm text-slate-400 mt-1">
                            Click or drag an image here
                        </p>

                        {resourceBannerFile && (
                            <p className="mt-2 text-sm text-slate-600">
                                {resourceBannerFile.name}
                            </p>
                        )}

                        <input
                            id="resource-file-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) setResourceBannerFile(file);
                            }}
                        />
                    </div>
                </div>

                {/* ---------- Content ---------- */}
                <div>
                    <textarea
                        name="content"
                        rows="15"
                        placeholder="Write your resource content..."
                        value={resourceData.content}
                        onChange={(e) => setResourceData({ ...resourceData, content: e.target.value })}
                        className="w-full rounded-lg p-3 resize-none outline-none"
                        required
                    ></textarea>
                </div>

                {/* ---------- Update Button ---------- */}
                <div>
                    <PurpleButton text="Update Resource" type="submit" />
                </div>
            </form>
        </>
    );
};

export default UserUpdateResource;