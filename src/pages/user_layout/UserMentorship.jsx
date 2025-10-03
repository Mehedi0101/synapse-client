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


const UserMentorship = () => {
    // ---------- user details from context ----------
    const { userDetails } = useContext(AuthContext);

    // ---------- role based rendering ----------
    const isStudent = userDetails?.role === "Student";
    const isAlumni = userDetails?.role === "Alumni";

    // ---------- fetch mentorship data of current user ----------
    const { data: mentorship = null, isPending: mentorshipPending } = useQuery({
        queryKey: ["mentorship-student", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/mentorship/student/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    // ---------- fetch mentorship data of alumni ----------
    const { data: mentor = [], isPending: mentorPending } = useQuery({
        queryKey: ["mentorship-alumni", userDetails?._id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/mentorship/mentor/${userDetails?._id}`);
            return res.data;
        },
        enabled: !!userDetails?._id
    })

    console.log(mentor);

    return (
        <div>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                {/* ---------- Heading ---------- */}
                <h2 className="font-poppins text-xl font-bold mb-10 text-dark">
                    Mentorship
                </h2>

                {isStudent && mentorshipPending &&
                    <MentorshipStatusSkeleton></MentorshipStatusSkeleton>
                }

                {/* ---------- Student view (no mentorship request) ---------- */}
                {isStudent && !mentorshipPending && !mentorship &&
                    <StudentNoRequest></StudentNoRequest>
                }

                {/* ---------- Student view (pending mentorship request) ---------- */}
                {isStudent && !mentorshipPending && mentorship && (mentorship?.status === "pending" || mentorship?.status === "assigned") &&
                    <StudentPendingRequest mentorship={mentorship}></StudentPendingRequest>
                }




                {/* ---------- Alumni view (no mentees) ---------- */}

                {isAlumni && mentorPending &&
                    <MentorshipStatusSkeleton></MentorshipStatusSkeleton>
                }

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