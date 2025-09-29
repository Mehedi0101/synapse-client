import defaultUser from "../../assets/default_user.jpg";
import { useContext } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import PostCard from "../../components/user_layout/UserHome/PostCard";
import DisplayConnections from "../../components/user_layout/shared/DisplayConnections";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../../components/skeletons/PostSkeleton";

const UserHome = () => {

    // ---------- for fetching all the posts ----------
    const { data: posts = [], refetch: refetchPosts, isPending } = useQuery({
        queryKey: ["allPosts"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/posts');
            return res.data;
        }
    })

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);


    // ---------- function for creating a post ----------
    const handleCreatePost = () => {

        // ---------- sweet alert to open the post form ----------
        Swal.fire({

            // ---------- alert contents ----------
            html: `
                    <div class="p-4 text-left font-sans">
                        <div class="flex items-center gap-2">
                            <div class="min-w-fit">
                                <img class="w-12 h-12 rounded-full object-cover" src="${userDetails?.userImage || defaultUser}" alt="user image" />
                            </div>
                            <div class="min-w-0">
                                <h3 class="font-poppins font-semibold truncate">${userDetails?.name || "N/A"}</h3>
                                <p class="text-xs truncate">${userDetails?.role || "N/A"}</p>
                            </div>
                        </div>
                        <textarea id="postContent" class="w-full h-40 my-5 resize-none outline-none rounded-lg p-2" placeholder="Ask for guidance, share experiences..."></textarea>
                        <button id="submitPost" disabled class="w-full rounded-lg px-4 py-2.5 text-white font-medium bg-gradient-to-r from-[#6f16d7] to-[#9b4dff] opacity-50 cursor-not-allowed transition">
                            Post
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
                const postBtn = document.getElementById("submitPost");
                textarea.focus();

                // ---------- changing the state of the post button based on whether the text area is empty or not ----------
                textarea.addEventListener("input", () => {
                    if (textarea.value.trim().length > 0) {
                        postBtn.disabled = false;
                        postBtn.classList.remove("opacity-50", "cursor-not-allowed");
                        postBtn.classList.add("cursor-pointer");
                    } else {
                        postBtn.disabled = true;
                        postBtn.classList.add("opacity-50", "cursor-not-allowed");
                        postBtn.classList.remove("cursor-pointer");
                    }
                });

                // ---------- when post button is clicked ----------
                postBtn.addEventListener("click", () => {

                    // ---------- toast loading ----------
                    const toastId = toast.loading('Posting...');

                    // ---------- post text ----------
                    const content = textarea.value.trim();

                    if (!content) return;

                    // ---------- post data for backend ----------
                    const postData = { authorId: userDetails._id, postContent: content };

                    // ---------- post request for creating a post ----------
                    axios.post('http://localhost:5000/posts', postData)
                        .then(data => {

                            // ---------- successful ----------
                            if (data?.data?.acknowledged) {

                                // ---------- refetch post data ----------
                                refetchPosts();

                                // ---------- toast success ----------
                                toast.success('Posted', { id: toastId });
                            }

                            // ---------- failed ----------
                            else toast.error('Something went wrong', { id: toastId });
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


    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-4 md:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-3">
                <div className="col-span-1 sm:col-span-2">

                    {/* ---------- create post section ---------- */}
                    <div className="flex gap-2 rounded-xl pb-4">

                        {/* ---------- user image ---------- */}
                        <div className="min-w-fit">
                            <img className="w-12 h-12 rounded-full object-cover" src={userDetails?.userImage || defaultUser} alt="" />
                        </div>

                        {/* ---------- create a post alert opening button ---------- */}
                        <button onClick={handleCreatePost} className="w-full text-sm text-light border border-slate-400 rounded-full text-left px-5 hover:shadow-xl hover:text-dark active:bg-slate-200 cursor-pointer transition-all duration-100 truncate">Ask for guidance, share experiences...</button>
                    </div>

                    {/* ---------- display post section ---------- */}
                    <div className="mt-10 space-y-6">
                        {
                            isPending ?
                                // ---------- show skeleton when pending ----------
                                <PostSkeleton></PostSkeleton>
                                :
                                posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                        }
                    </div>
                </div>

                {/* ---------- connections section (hidden for small devices) ---------- */}
                <div className="hidden sm:block col-span-1">
                    <DisplayConnections></DisplayConnections>
                </div>
            </div>
        </div>
    );
};

export default UserHome;