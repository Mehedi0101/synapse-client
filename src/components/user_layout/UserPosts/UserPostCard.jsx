import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import formatTimeAgo from '../../../functions/formatTimeAgo';
import axios from 'axios';
import toast from 'react-hot-toast';
import defaultUser from "../../../assets/default_user.jpg";
import { IoSendSharp } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { LuFilePenLine } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import UserCommentCard from './UserCommentCard';
import Swal from 'sweetalert2';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const UserPostCard = ({ post, refetchMyPosts }) => {
    const [postData, setPostData] = useState(post);

    // ---------- user details from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- post control dropdown state ----------
    const [postControlDropdown, setPostControlDropdown] = useState(false);
    const postControlRef = useRef(null);

    // ---------- comment text controlling state ----------
    const [commentText, setCommentText] = useState("");

    // ---------- time ago ----------
    const timeAgo = formatTimeAgo(postData.createdAt);

    // ---------- post updating function ----------
    const handleUpdatePost = () => {

        // ---------- sweet alert to open the post form ----------
        Swal.fire({

            // ---------- alert contents ----------
            html: `
                    <div class="p-4 text-left font-sans">
                        <div class="flex items-center gap-2">
                            <div class="min-w-fit">
                                <img class="w-12 h-12 rounded-full object-cover" src="${userDetails?.userImage || defaultUser}" onerror="this.onerror=null; this.src='${defaultUser}'" alt="user image" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="font-poppins font-semibold truncate">${userDetails?.name || "N/A"}</h3>
                                <p class="text-xs truncate">${userDetails?.role || "N/A"}</p>
                            </div>
                        </div>
                        <textarea id="postContent" class="w-full h-40 my-5 resize-none outline-none rounded-lg p-2" placeholder="Ask for guidance, share experiences...">${postData?.postContent}</textarea>
                        <button id="updatePost" disabled class="w-full rounded-lg px-4 py-2.5 text-white font-medium bg-gradient-to-r from-[#6f16d7] to-[#9b4dff] opacity-50 cursor-not-allowed transition">
                            Confirm Changes
                        </button>
                    </div>
                `,

            // ---------- to disable the bouncing animation ----------
            showClass: {
                popup: 'animate__animated animate__fadeIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            },

            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: true,
            width: "600px",
            customClass: {
                popup: "rounded-2xl",
                closeButton: "text-slate-500 hover:text-slate-800 focus:outline-none",
            },

            // ---------- when the alert is opened ----------
            didOpen: () => {
                const textarea = document.getElementById("postContent");
                const updateBtn = document.getElementById("updatePost");

                // ---------- to move the cursor at the end of the texts ----------
                textarea.focus();
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);

                // ---------- changing the state of the post button based on whether the text area is empty or not ----------
                textarea.addEventListener("input", () => {
                    if (textarea.value.trim().length > 0) {
                        updateBtn.disabled = false;
                        updateBtn.classList.remove("opacity-50", "cursor-not-allowed");
                        updateBtn.classList.add("cursor-pointer");
                    } else {
                        updateBtn.disabled = true;
                        updateBtn.classList.add("opacity-50", "cursor-not-allowed");
                        updateBtn.classList.remove("cursor-pointer");
                    }
                });

                // ---------- when update button is clicked ----------
                updateBtn.addEventListener("click", () => {

                    // ---------- toast loading ----------
                    const toastId = toast.loading('Updating post...');

                    // ---------- updated post text ----------
                    const content = textarea.value.trim();

                    if (!content) return;

                    // ---------- patch request for updating a post ----------
                    axios.patch(`http://localhost:5000/posts/${postData?._id}`, { postContent: content })
                        .then(data => {
                            // ---------- successful ----------
                            setPostData(data.data);

                            // ---------- toast success ----------
                            toast.success('Post updated', { id: toastId });
                        })
                        .catch(() => {
                            // ---------- failed ----------
                            toast.error('Something went wrong', { id: toastId });
                        })

                    // ---------- alert close ----------
                    Swal.close();
                });
            },
        });
    };

    // ---------- function for removing a post ----------
    const handleRemovePost = () => {

        // ---------- sweetalert opening ----------
        Swal.fire({

            // ---------- alert content ----------
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Are you sure you want to remove this post?</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This action cannot be undone.</p>
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
                const toastId = toast.loading('Removing Post...');

                // ---------- request to remove a post ----------
                axios.delete(`http://localhost:5000/posts/${postData?._id}`)
                    .then((data) => {

                        // ---------- remove successful ----------
                        if (data?.data?.acknowledged) {

                            // ---------- refetch all posts from the author ----------
                            refetchMyPosts();

                            // ---------- success toast ----------
                            toast.success('Removed', { id: toastId });
                        }

                        // ---------- remove unsuccessful ----------
                        else {

                            // ---------- error toast ----------
                            toast.error('Something went wrong', { id: toastId });
                        }
                    })

                    // ---------- remove request unsuccessful ----------
                    .catch(() => {

                        // ---------- error toast ----------
                        toast.error('Something went wrong', { id: toastId });
                    })
            }
        })
    }


    // ---------- comment posting function ----------
    const handleComment = e => {
        e.preventDefault();

        // ---------- comment text ----------
        const comment = e.target.comment.value;

        // ---------- if comment doesn't contain any character then return ----------
        if (!comment.trim()) return;

        // ---------- comment data for storing in the database ----------
        const commentData = { commenterId: userDetails._id, comment };

        // ---------- patch request of post for adding a comment ----------
        axios.patch(`http://localhost:5000/posts/comments/add/${postData?._id}`, commentData)
            .then((data) => {

                // ---------- if successful then refetch post data ----------
                setPostData(data.data);
            })
            .catch(() => {

                // ---------- error toast ----------
                toast.error('Something went wrong');
            })

        // ---------- reset comment field ----------
        setCommentText("");
    }


    // ---------- comment deleting function ----------
    const handleDeleteComment = (commentId) => {
        axios.patch(`http://localhost:5000/posts/comments/delete/${postData?._id}`, { commentId })
            .then(data => {

                // ---------- if successful then refetch post data ----------
                setPostData(data.data);
            })
            .catch(() => {

                // ---------- error toast ----------
                toast.error('Something went wrong');
            })
    }

    // ---------- click outside to close dropdown ----------
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (postControlRef.current && !postControlRef.current.contains(event.target)) {
                setPostControlDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.div

            // ---------- card animation configuration ----------
            initial={{ opacity: 0, y: 50 }} // start invisible and 50px lower
            whileInView={{ opacity: 1, y: 0 }} // animate into place
            viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-slate-300 rounded-xl p-6 shadow-xl">

            {/* ---------- card header ---------- */}
            <div className="flex items-center gap-2">

                {/* ---------- image container ---------- */}
                <div className="min-w-fit">
                    <img className="w-12 h-12 rounded-full object-cover" src={postData?.author?.userImage || defaultUser} onError={(e) => { e.currentTarget.src = defaultUser; }} alt="user image" />
                </div>

                <div className='min-w-0 w-full flex justify-between gap-1'>
                    {/* ---------- author info ---------- */}
                    <div className="min-w-0">
                        <h3 className="font-poppins font-semibold truncate">{postData?.author?.name || "N/A"}</h3>
                        <p className="text-xs truncate text-slate-500">{postData?.author?.role || "N/A"} | {postData?.author?.department || "N/A"}</p>
                        <p className="text-xs truncate text-slate-500">{timeAgo}</p>
                    </div>

                    {/* ---------- form control section ---------- */}
                    <div className='relative' ref={postControlRef}>

                        {/* ---------- three dot button ---------- */}
                        <BsThreeDots
                            className='min-w-fit cursor-pointer hover:text-primary'
                            onClick={() => setPostControlDropdown(!postControlDropdown)}
                        />

                        {
                            // ---------- dropdown section ---------- 
                            postControlDropdown &&
                            <div className="absolute right-0 bg-white mt-2 font-poppins text-sm min-w-32 rounded-md shadow-xl overflow-hidden">

                                {/* ---------- update button ---------- */}
                                <button
                                    className="flex items-center gap-1 w-full px-4 py-2 hover:text-primary active:text-primary cursor-pointer select-none"
                                    onClick={() => {
                                        setPostControlDropdown(false);
                                        handleUpdatePost();
                                    }}
                                >
                                    {/*---------- update icon ----------*/}
                                    <LuFilePenLine className="text-lg lg:text-xl" />
                                    Update
                                </button>

                                {/* ---------- delete button ---------- */}
                                <button
                                    className="flex items-center gap-1 w-full px-4 py-2 hover:text-red-500 active:text-red-500  cursor-pointer select-none"
                                    onClick={() => {
                                        setPostControlDropdown(false);
                                        handleRemovePost();
                                    }}
                                >
                                    {/*---------- delete icon ----------*/}
                                    <RiDeleteBin6Line className="text-lg lg:text-xl" />
                                    Remove
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* ---------- post content container ---------- */}
            <div className="my-4">

                {/* ---------- splitting the text container based on the newline character ---------- */}
                {postData?.postContent?.split("\n\n").map((para, idx) => (
                    <p key={idx} className="mb-4 text-sm sm:text-base">
                        {para}
                    </p>
                ))}
            </div>

            {/* ---------- comment count ---------- */}
            <p className="pb-2 mb-6 text-right border-b border-slate-300 font-poppins text-sm font-semibold"><span className="select-none text-primary">{postData?.comments?.length} comment{postData?.comments?.length != 1 && "s"}</span></p>

            {/* ---------- posting a comment section ---------- */}
            <div className="flex items-center gap-2 rounded-xl">

                {/* ---------- user image ---------- */}
                <div className="min-w-fit">
                    <img className="w-8 h-8 rounded-full object-cover" src={userDetails?.userImage || defaultUser} onError={(e) => { e.currentTarget.src = defaultUser; }} alt="" />
                </div>

                {/* ---------- comment text field ---------- */}
                <form className="relative flex items-center w-full" onSubmit={handleComment}>
                    <input
                        name="comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        autoComplete="off"
                        className="w-full text-sm border border-slate-400 rounded-full pl-3 pr-8 py-2 outline-none focus:shadow-lg transition-all duration-100"
                    />

                    {/* ---------- comment button ---------- */}
                    <button className={`absolute right-3 transition-colors ${commentText.trim() ? "text-primary cursor-pointer" : "text-slate-400 cursor-not-allowed"}`}>
                        <IoSendSharp />
                    </button>
                </form>
            </div>

            {/* ---------- display comments section ---------- */}
            {
                postData?.comments?.length > 0 && <div className="mt-6 space-y-5">
                    {
                        postData.comments.map(comment => <UserCommentCard key={comment._id} comment={comment} handleDeleteComment={handleDeleteComment}></UserCommentCard>)
                    }
                </div>
            }
        </motion.div>
    );
};

export default UserPostCard;