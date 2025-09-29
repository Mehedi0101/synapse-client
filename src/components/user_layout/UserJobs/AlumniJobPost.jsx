import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import PurpleButton from "../../shared/buttons/PurpleButton";
import { IoMdAddCircleOutline } from "react-icons/io";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import JobCardSkeleton from "../../skeletons/JobCardSkeleton";

const AlumniJobPost = () => {

    // ---------- data from auth provider ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- for fetching all my posted jobs ----------
    const { data: myJobPosts = [], isPending } = useQuery({
        queryKey: ["my-job-posts", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/jobs/user/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    return (
        <div>

            {/* ---------- heading and button container ---------- */}
            <div className="flex gap-2 justify-between items-center">
                <h2 className="font-poppins text-xl font-bold text-dark">My Job Posts ({myJobPosts.length})</h2>

                {/* ---------- job posting button ---------- */}
                <Link to='/create-job-post'>

                    {/* ---------- for larger device ---------- */}
                    <PurpleButton className="max-w-fit text-sm hidden sm:block" text="Post a Job"></PurpleButton>

                    {/* ---------- for smaller device ---------- */}
                    <IoMdAddCircleOutline className="sm:hidden text-2xl text-primary" />
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                {
                    // ---------- loading? ---------- 
                    isPending ?
                        <JobCardSkeleton></JobCardSkeleton>
                        :
                        // ---------- check if myJobPosts is empty or not ---------- 
                        myJobPosts?.length > 0 ?
                            // ---------- not empty ---------- 
                            myJobPosts.map(jobPost => <JobCard key={jobPost._id} jobPost={jobPost}></JobCard>)
                            :
                            // ---------- empty ---------- 
                            <div className="col-span-1 lg:col-span-2 min-h-40 flex justify-center items-center text-base sm:text-lg font-bold text-center">
                                You haven't posted any jobs yet.
                            </div>
                }
            </div>
        </div>
    );
};

export default AlumniJobPost;