import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import defaultUser from "../../assets/default_user.jpg";
import axios from "axios";
import toast from "react-hot-toast";

const UserPostResource = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- react hooks ----------
    const navigate = useNavigate();

    // ---------- Resource banner State ----------
    const [resourceBannerFile, setResourceBannerFile] = useState(null);

    // ---------- upload banner function ----------
    const uploadResourceBanner = async (file) => {
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

    // ---------- form states ----------
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // ---------- resource submit function ----------
    const handleResourceSubmit = async (e) => {
        e.preventDefault();

        // ---------- if title or content is blank ----------
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content are required");
            return;
        }

        const toastId = toast.loading("Adding resource...");

        // ---------- upload event banner when uploading ----------
        let uploadedBannerUrl = "";

        if (resourceBannerFile) {
            uploadedBannerUrl = await uploadResourceBanner(resourceBannerFile);

            if (!uploadedBannerUrl) {
                toast.error("Banner upload failed", { id: toastId });
                return;
            }
        }

        // ---------- resource data ----------
        const resourceData = {
            authorId: userDetails?._id,
            title: title.trim(),
            image: uploadedBannerUrl,
            content: content.trim(),
        };

        // ---------- post request ----------
        try {
            const token = await user.getIdToken();
            const { data } = await axios.post("http://localhost:5000/resources", resourceData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (data?.acknowledged) {
                toast.success("Added", { id: toastId });
                navigate("/resources");
            }
            else {
                toast.error("Something went wrong", { id: toastId });
            }
        }
        catch {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <>
            <UserHeader searchBar="invisible" />

            <form
                onSubmit={handleResourceSubmit}
                className="mx-2 md:mx-5 my-8 text-semi-dark text-sm lg:text-base"
            >
                <div className="space-y-6">
                    {/* ---------- title ---------- */}
                    <div>
                        <h2 className="text-xl lg:text-2xl font-bold text-dark font-poppins border-b-2 pb-2 mb-4">
                            Post a Resource
                        </h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full font-poppins text-lg border-b border-slate-400 outline-none py-2"
                            required
                        />
                    </div>

                    {/* ---------- author section ---------- */}
                    <div>
                        <h3 className="text-sm text-slate-600 mb-2 font-poppins">Author</h3>
                        <div className="flex items-center gap-3">

                            {/* ---------- author image ---------- */}
                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={userDetails?.userImage || defaultUser}
                                onError={(e) => { e.currentTarget.src = defaultUser; }}
                                alt="author"
                            />

                            {/* ---------- author info ---------- */}
                            <div>
                                <p className="font-poppins font-semibold">
                                    {userDetails?.name || "N/A"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {userDetails?.role || "N/A"}{" "}
                                    {userDetails?.department ? `| ${userDetails.department}` : ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ---------- banner image url (optional) ---------- */}
                    <div>
                        {/* <input
                            type="text"
                            name="image"
                            placeholder="Banner URL (optional)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full border-b border-slate-400 outline-none py-2"
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
                            <span className="text-lg text-slate-500">📁 Upload Resource Banner</span>
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

                    {/* ---------- resource main content ---------- */}
                    <div>
                        <textarea
                            name="content"
                            rows="12"
                            placeholder="Write your article here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[320px] resize-y p-2 bg-transparent outline-none"
                            required
                        />
                    </div>

                    {/* publish resource button */}
                    <PurpleButton text="Publish Resource" type="submit" />
                </div>
            </form>
        </>
    );
};

export default UserPostResource;
