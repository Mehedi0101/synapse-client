import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserMentorshipRequest = () => {

    // ---------- user data from auth provider ----------
    const { userDetails, user } = useContext(AuthContext);

    // ---------- hooks ----------
    const navigate = useNavigate();

    // ---------- request states ----------
    const [goal, setGoal] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMentor, setSelectedMentor] = useState("");

    // ---------- fetch connections of current user and filter alumni ----------
    const { data: connections = [] } = useQuery({
        queryKey: ["connected-users"],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/connections/accepted/${userDetails._id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res?.data?.filter(connection => connection?.otherUser?.role === "Alumni");
        },
        enabled: !!userDetails?._id
    })


    // ---------- submit mentorship request ----------
    const handleSubmit = (e) => {
        e.preventDefault();

        // ---------- if any field is empty then show error toast ----------
        if (!goal.trim() || !description.trim() || !selectedMentor) {
            return toast.error("Please fill in all fields");
        }

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Mentorship Request</h2>
                    <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">Once a mentor is assigned you can't choose another mentor.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Submitting Request...");

                // ---------- mentorship request data ----------
                const requestData = {
                    studentId: userDetails._id,
                    mentorId: selectedMentor,
                    goal,
                    description
                };

                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.post("http://localhost:5000/mentorship", requestData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Request submitted successfully!", { id: toastId });
                        navigate("/mentorship");
                    }
                    else {
                        toast.error("Something went wrong", { id: toastId });
                    }
                }
                catch {
                    toast.error("Something went wrong", { id: toastId });
                }
            }
        });
    };

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Mentorship Request";
    }, []);

    return (
        <div>
            {/* ---------- user header without searchbar ---------- */}
            <UserHeader searchBar="invisible"></UserHeader>

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                {/* ---------- Heading ---------- */}
                <h2 className="font-poppins text-xl lg:text-2xl font-bold mb-6 text-dark">
                    Request a Mentor
                </h2>

                {/* ---------- Form ---------- */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl sm:p-6 md:p-8 space-y-6"
                >
                    {/* ---------- Goal ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Your Goal
                        </label>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="What do you want to achieve?"
                            required
                        />
                    </div>

                    {/* ---------- Description ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Provide more details about your mentorship needs..."
                            rows="5"
                            required
                        />
                    </div>

                    {/* ---------- Mentor Selection ---------- */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Choose Mentors from Your Connections
                        </label>
                        <select
                            onChange={(e) => setSelectedMentor(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select mentor...</option>
                            {connections.map((connection) => (
                                <option key={connection._id} value={connection?.otherUser?._id}>
                                    {connection?.otherUser?.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ---------- Submit Button ---------- */}
                    <PurpleButton text="Submit Request" type="submit"></PurpleButton>
                </form>
            </div>
        </div>
    );
};

export default UserMentorshipRequest;