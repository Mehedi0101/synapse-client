import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import DisplayConnections from "../../components/user_layout/shared/DisplayConnections";
import UserPostCard from "../../components/user_layout/UserPosts/UserPostCard";

const UserHome = () => {

    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- posts ----------
    const [myPosts, setMyPosts] = useState([]);

    // ---------- post fetching function ----------
    const fetchMyPosts = (id) => {
        axios.get(`http://localhost:5000/posts/author/${id}`)
            .then((data) => {
                setMyPosts(data.data);
            })
            .catch(() => {
                setMyPosts([]);
            });
    }

    // ---------- get all posts ----------
    useEffect(() => {
        userDetails?._id && fetchMyPosts(userDetails?._id);
    }, [userDetails]);

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark grid gap-4 md:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-3">
                <div className="col-span-1 sm:col-span-2">

                    <h2 className="font-poppins text-xl font-bold text-dark">My Posts ({myPosts.length})</h2>

                    {/* ---------- display post section ---------- */}
                    <div className="mt-6 space-y-6">
                        {
                            myPosts.map(post => <UserPostCard key={post._id} post={post} fetchMyPosts={fetchMyPosts}></UserPostCard>)
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