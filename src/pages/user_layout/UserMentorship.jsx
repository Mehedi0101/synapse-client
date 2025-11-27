import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StudentNoRequest from "../../components/user_layout/UserMentorship/StudentNoRequest";
import StudentPendingRequest from "../../components/user_layout/UserMentorship/StudentPendingRequest";
import AlumniNotAssigned from "../../components/user_layout/UserMentorship/AlumniNotAssigned";
import MentorshipStatusSkeleton from "../../components/skeletons/MentorshipStatusSkeleton";
import AlumniMentorshipTabs from "../../components/user_layout/UserMentorship/AlumniMentorshipTabs";
import StudentMentorshipInProgress from "../../components/user_layout/UserMentorship/StudentMentorshipInProgress";


const UserMentorship = () => {
    // ---------- user details from context ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- role detection ----------
    const isStudent = userDetails?.role === "Student";
    const isAlumni = userDetails?.role === "Alumni";

    // ---------- fetch mentorship data (student) ----------
    const { data: mentorship = null, isPending: mentorshipPending } = useQuery({
        queryKey: ["mentorship-student", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/mentorship/student/${userDetails?._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: isStudent && !!userDetails?._id
    })

    // ---------- fetch mentorship data (alumni) ----------
    const { data: mentor = [], isPending: mentorPending } = useQuery({
        queryKey: ["mentorship-alumni", userDetails?._id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/mentorship/mentor/${userDetails?._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: isAlumni && !!userDetails?._id
    })

    return (
        <div>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                {/* ---------- Heading ---------- */}
                <h2 className="font-poppins text-xl lg:text-2xl font-bold mb-10 text-dark">
                    Mentorship
                </h2>

                {/* ---------- skeleton when data loading ---------- */}
                {isStudent && mentorshipPending &&
                    <MentorshipStatusSkeleton></MentorshipStatusSkeleton>
                }

                {/* ---------- Student view (no mentorship request made) ---------- */}
                {isStudent && !mentorshipPending && !mentorship &&
                    <StudentNoRequest></StudentNoRequest>
                }

                {/* ---------- Student view (pending mentorship request) ---------- */}
                {isStudent && !mentorshipPending && mentorship && mentorship?.status !== "accepted" &&
                    <StudentPendingRequest mentorship={mentorship}></StudentPendingRequest>
                }

                {/* ---------- Student view (in progress mentorship) ---------- */}
                {isStudent && !mentorshipPending && mentorship && mentorship?.status === "accepted" &&
                    <StudentMentorshipInProgress mentorship={mentorship}></StudentMentorshipInProgress>
                }




                {/* ---------- Alumni view (no mentees) ---------- */}
                {isAlumni && mentorPending &&
                    <MentorshipStatusSkeleton></MentorshipStatusSkeleton>
                }

                {/* ---------- alumni no request and in progress mentorship ---------- */}
                {isAlumni && !mentorPending && mentor.length === 0 &&
                    <AlumniNotAssigned></AlumniNotAssigned>
                }

                {/* ---------- Placeholder for future (active mentorships) ---------- */}
                {isAlumni && !mentorPending && mentor.length > 0 &&
                    <AlumniMentorshipTabs mentorData={mentor}></AlumniMentorshipTabs>
                }
            </div>
        </div>

    );
};

export default UserMentorship;