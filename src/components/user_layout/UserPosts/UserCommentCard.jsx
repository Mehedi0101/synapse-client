import { useEffect, useRef, useState } from "react";
import formatTimeAgo from "../../../functions/formatTimeAgo";
import defaultUser from "../../../assets/default_user.jpg";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserCommentCard = ({ comment, handleDeleteComment }) => {

    // ---------- delete button's dropdown state ----------
    const [deleteDropdown, setDeleteDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // ---------- time ago ----------
    const timeAgo = formatTimeAgo(comment?.createdAt);

    // ---------- click outside to close dropdown ----------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDeleteDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="flex items-center gap-2">

                {/* ---------- image container ---------- */}
                <div className="min-w-fit">
                    <img className="w-8 h-8 rounded-full object-cover" src={comment?.commenter?.userImage || defaultUser} onError={(e) => { e.currentTarget.src = defaultUser; }} alt="user image" />
                </div>

                {/* ---------- author info and time ago container ---------- */}
                <div className="min-w-0 w-full flex gap-2 justify-between items-center">

                    {/* ---------- author info ---------- */}
                    <div className="min-w-0">
                        <h3 className="font-poppins text-sm font-semibold">{comment?.commenter?.name || "N/A"}</h3>
                        <p className="text-xs text-slate-500 truncate">{comment?.commenter?.role || "N/A"} | {comment?.commenter?.department || "N/A"}</p>
                    </div>

                    {/* ---------- time ago ---------- */}
                    <div className="flex min-[300px]:flex-row flex-col-reverse items-center min-[300px]:gap-2 gap-0">
                        <p className="text-xs text-slate-500">{timeAgo}</p>
                        <div className="relative" ref={dropdownRef}>

                            {/* ---------- three dot button ---------- */}
                            <BsThreeDots
                                className="cursor-pointer hover:text-primary"
                                onClick={() => setDeleteDropdown(!deleteDropdown)}
                            />

                            {
                                // ---------- dropdown section ---------- 
                                deleteDropdown &&
                                <div className="absolute right-0 mt-2 bg-white font-poppins text-sm min-w-fit rounded-md shadow-xl overflow-hidden">

                                    {/* ---------- delete button ---------- */}
                                    <button
                                        className="flex items-center gap-1 w-full px-4 py-2 text-red-500 cursor-pointer select-none"
                                        onClick={() => {
                                            setDeleteDropdown(false);
                                            handleDeleteComment(comment?._id);
                                        }}
                                    >
                                        {/*---------- delete icon ----------*/}
                                        <RiDeleteBin6Line className="text-lg lg:text-xl" />
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- comment text ---------- */}
            <p className="text-sm ml-10 mt-1">{comment?.comment}</p>
        </div>
    );
};

export default UserCommentCard;