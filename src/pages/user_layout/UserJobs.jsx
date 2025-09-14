import { Link } from "react-router-dom";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import UserHeader from "../../components/user_layout/shared/UserHeader";

const UserJobs = () => {
    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <div>
                    <div className="flex justify-between">
                        <h2 className="font-poppins text-xl font-bold text-dark">My Job Posts</h2>
                        <Link to='/create-job-post'><PurpleButton className="max-w-fit" text="Post a Job"></PurpleButton></Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserJobs;