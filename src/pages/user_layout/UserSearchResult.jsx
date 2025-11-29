import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MyConnectionCard from "../../components/user_layout/UserAllConnections/MyConnectionCard";
import ConnectedUsersCardSkeleton from "../../components/skeletons/ConnectedUsersCardSkeleton";
import UserSearchResultCard from "../../components/user_layout/UserSearchResult/UserSearchResultCard";

const UserSearchResult = () => {

    // ---------- get search query from URL ----------
    const { keyword } = useParams();

    // ---------- user data ----------
    const { user, userDetails } = useContext(AuthContext);

    // ---------- fetch search result ----------
    const { data: searchResults = [], isPending, refetch: refetchSearchResult } = useQuery({
        queryKey: ["search-users", keyword, userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(
                `http://localhost:5000/users/search/${userDetails?._id}?keyword=${keyword}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            return res.data;
        },
        enabled: !!keyword && !!userDetails?._id,
    });

    // ---------- page title ----------
    useEffect(() => {
        document.title = `Search: ${keyword}`;
    }, [keyword]);


    return (
        <div>

            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar="" />

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">

                <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">
                    Search Results for: "{keyword}" ({searchResults.length})
                </h2>

                {/* ---------- card container ---------- */}
                <div className="mt-6 space-y-3">

                    {isPending ? (
                        <ConnectedUsersCardSkeleton />
                    ) : searchResults.length > 0 ? (
                        searchResults.map((u) => (
                            <UserSearchResultCard key={u.id} user={u} refetch={refetchSearchResult} />
                        ))
                    ) : (
                        <div className="min-h-80 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                            No users found matching "{keyword}"
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default UserSearchResult;