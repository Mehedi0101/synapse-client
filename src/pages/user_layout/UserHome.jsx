import defaultUser from "../../assets/default_user.jpg";
import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonWide from "../../components/shared/buttons/ButtonWide";

const UserHome = () => {

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- my connections data ----------
    const [myConnections, setMyConnections] = useState([]);

    const handleCreatePost = () => {

        Swal.fire({
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
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: true,
            width: "600px",
            customClass: {
                popup: "rounded-2xl",
                closeButton: "text-slate-500 hover:text-slate-800 focus:outline-none",
            },
            didOpen: () => {
                const textarea = document.getElementById("postContent");
                const submitBtn = document.getElementById("submitPost");
                textarea.focus();

                // listen for input changes
                textarea.addEventListener("input", () => {
                    if (textarea.value.trim().length > 0) {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
                        submitBtn.classList.add("cursor-pointer");
                    } else {
                        submitBtn.disabled = true;
                        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
                        submitBtn.classList.remove("cursor-pointer");
                    }
                });

                // handle click
                submitBtn.addEventListener("click", () => {
                    const content = textarea.value.trim();
                    if (!content) return; // safeguard
                    console.log("Post submitted:", content);
                    Swal.close();
                });
            },
        });
    };

    // ---------- my connections data fetching ----------
    useEffect(() => {
        userDetails?._id && axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`)
            .then((data) => {
                setMyConnections(data.data);
            })
            .catch(() => {
                setMyConnections([]);
            })
    }, [userDetails])

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-5 grid-cols-1 sm:grid-cols-3">
                <div className="col-span-1 sm:col-span-2 h-96">
                    {/* ---------- create post section ---------- */}
                    <div className="flex gap-2 rounded-xl p-2 pb-4">
                        <div className="min-w-fit">
                            <img className="w-12 h-12 rounded-full object-cover" src={userDetails?.userImage || defaultUser} alt="" />
                        </div>
                        <button onClick={handleCreatePost} className="w-full text-sm text-light border border-slate-400 rounded-full text-left px-5 hover:shadow-xl hover:text-dark active:bg-slate-200 cursor-pointer transition-all duration-100 truncate">Ask for guidance, share experiences...</button>
                    </div>

                </div>

                {/* ---------- connections section (hidden for small devices) ---------- */}
                <div className="hidden sm:block col-span-1">
                    <h2 className="text-dark font-semibold font-poppins">Connections</h2>
                    <hr className="w-12 mt-2 mb-6 border border-primary" />
                    <div className="space-y-2">
                        {myConnections.map(connection => {
                            return (
                                <div key={connection?._id} className="flex gap-2 items-center">
                                    <img className="w-12 h-12 rounded-full object-cover" src={connection?.otherUser?.userImage || defaultUser} alt="" />
                                    <div>
                                        <p className="text-sm font-semibold text-dark">{connection?.otherUser?.name}</p>
                                        <p className="text-xs text-light">{connection?.otherUser?.role} | {connection?.otherUser?.department}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;