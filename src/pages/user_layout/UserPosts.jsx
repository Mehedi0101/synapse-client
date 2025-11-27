import { useContext } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import DisplayConnections from "../../components/user_layout/shared/DisplayConnections";
import UserPostCard from "../../components/user_layout/UserPosts/UserPostCard";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- hooks ----------
    const navigate = useNavigate();

    const { data: myPosts = [], refetch: refetchMyPosts, isPending } = useQuery({
        queryKey: ["my-posts", userDetails?._id],
        queryFn: async () => {
            try {
                const token = await user.getIdToken();
                const res = await axios.get(`http://localhost:5000/posts/author/${userDetails._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                return res.data;
            } catch (error) {
                if (error.response?.status === 403) {
                    navigate('/forbidden');
                    return [];
                }
                throw error;
            }
        },
        enabled: !!userDetails?._id
    });

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-4 md:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-3">
                <div className="col-span-1 sm:col-span-2">

                    <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">My Posts ({myPosts.length})</h2>

                    {/* ---------- display post section ---------- */}
                    <div className="mt-6 space-y-6">
                        {
                            isPending ?
                                <PostSkeleton></PostSkeleton>
                                :
                                myPosts.length > 0 ?
                                    myPosts.map(post => <UserPostCard key={post._id} post={post} refetchMyPosts={refetchMyPosts}></UserPostCard>)
                                    :
                                    <div className="min-h-80 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                        You haven't posted anything yet
                                    </div>
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

export default UserPosts;