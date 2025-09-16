import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import AlumniJobPost from "../../components/user_layout/UserJobs/AlumniJobPost";
import axios from "axios";
import JobCard from "../../components/user_layout/UserJobs/JobCard";

const UserJobs = () => {

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- all jobs ----------
    const [allJobs, setAllJobs] = useState([]);

    // ---------- get all jobs ----------
    useEffect(() => {
        userDetails?._id && axios.get(`http://localhost:5000/jobs/${userDetails?._id}`)
            .then(data => setAllJobs(data.data))
            .catch(() => setAllJobs([]))
    }, [userDetails])

    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">

                {/* ---------- post job section (for alumni only) ---------- */}
                {userDetails?.role === "Alumni" && <AlumniJobPost></AlumniJobPost>}

                {/* ---------- available job display section ---------- */}
                <div className="mt-12">
                    <h2 className="font-poppins text-xl font-bold text-dark">Available Job Opportunities</h2>

                    {/* ---------- jobs container ---------- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                        {
                            // ---------- check if allJobs is empty or not ---------- 
                            allJobs?.length > 0 ?
                                // ---------- not empty ---------- 
                                allJobs.map(jobPost => <JobCard key={jobPost._id} jobPost={jobPost}></JobCard>)
                                :
                                // ---------- empty ---------- 
                                <div className="col-span-1 lg:col-span-2 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                    No job opportunities available right now.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserJobs;