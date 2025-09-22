import { useContext, useEffect, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { Link } from "react-router-dom";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import ResourceCard from "../../components/user_layout/UserResources/ResourceCard";


const UserResources = () => {
    // ---------- user data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- all resources list ----------
    const [allResources, setAllResources] = useState([]);

    // ---------- my resources list ----------
    const [myResources, setMyResources] = useState([]);

    useEffect(() => {
        // ---------- get all upcoming events ----------
        userDetails?._id && axios.get(`http://localhost:5000/resources/all/${userDetails?._id}`)
            .then(data => setAllResources(data.data))
            .catch(() => setAllResources([]))

        // ---------- get all my events ----------
        userDetails?._id && axios.get(`http://localhost:5000/resources/my/${userDetails?._id}`)
            .then(data => setMyResources(data.data))
            .catch(() => setMyResources([]))
    }, [userDetails])

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <div>

                    {/* ---------- heading and button container ---------- */}
                    <div className="flex gap-2 justify-between items-center">
                        <h2 className="font-poppins text-xl font-bold text-dark">My Contributions ({myResources.length})</h2>

                        {/* ---------- add contribution button ---------- */}
                        <Link to='/post-resource'>

                            {/* ---------- for larger device ---------- */}
                            <PurpleButton className="max-w-fit text-sm hidden sm:block" text="Add Contribution"></PurpleButton>

                            {/* ---------- for smaller device ---------- */}
                            <IoMdAddCircleOutline className="sm:hidden text-2xl text-primary" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-5 mt-6">
                        {
                            // ---------- check if myResources is empty or not ---------- 
                            myResources?.length > 0 ?

                                // ---------- not empty ---------- 
                                myResources.map(resource => <ResourceCard key={resource._id} resource={resource}></ResourceCard>)
                                :
                                // ---------- empty ---------- 
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                    You haven't shared anything yet.
                                </div>
                        }
                    </div>
                </div>

                {/* ---------- community contribution section ---------- */}
                <div className="mt-12">
                    <h2 className="font-poppins text-xl font-bold text-dark">Community Contributions</h2>

                    {/* ---------- card container ---------- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-5 mt-6">
                        {
                            // ---------- check if allResources is empty or not ---------- 
                            allResources?.length > 0 ?
                            
                                // ---------- not empty ---------- 
                                allResources.map(resource => <ResourceCard key={resource._id} resource={resource}></ResourceCard>)
                                :
                                // ---------- empty ---------- 
                                <div className="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                    No resources have been shared yet.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserResources;