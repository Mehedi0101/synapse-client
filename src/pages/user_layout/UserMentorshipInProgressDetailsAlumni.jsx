import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import defaultUser from "../../assets/default_user.jpg";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import AuthContext from "../../contexts/AuthContext";

const UserMentorshipInProgressDetailsAlumni = () => {

    const { user } = useContext(AuthContext);

    // ---------- id from url ----------
    const { id } = useParams();

    // ---------- hooks ----------
    const navigate = useNavigate();

    // ---------- Fetch mentorship details ----------
    const { data: mentorship = null, isPending, refetch } = useQuery({
        queryKey: ["mentorship-details", id],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.get(`http://localhost:5000/mentorship/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!id,
    });

    // ---------- selected step state ----------
    const [selectedStep, setSelectedStep] = useState("");

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Mentorship";
    }, []);

    // ---------- if data loading or no mentorship details available ----------
    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-slate-600 font-semibold">
                Loading mentorship details...
            </div>
        );
    }

    // ---------- if no mentorship details available ----------
    if (!mentorship) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-slate-600 font-semibold">
                No mentorship details available
            </div>
        );
    }

    // ---------- mentorship data ----------
    const { student, goal, description, createdAt, steps = [], currentStep } = mentorship;

    const currentStepIndex = steps.indexOf(currentStep);
    const remainingSteps = steps.slice(currentStepIndex + 1);

    // ---------- handle step update ----------
    const handleStepChange = () => {

        // ---------- if no step selected ----------
        if (!selectedStep) return toast.error("Please select a step to update");

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A;font-family:Poppins,sans-serif;font-size:22px;font-weight:bold;">Update Current Step?</h2>
                    <p style="color:#334155;font-family:Open Sans,sans-serif;font-size:16px;margin-top:8px;">Set current step to <strong>${selectedStep}</strong>?</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {

            // ---------- after confirmation ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Updating step...");

                // ---------- patch request to server ----------
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.patch(`http://localhost:5000/mentorship/${id}`, { currentStep: selectedStep }, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Current step updated!", { id: toastId });
                        refetch();
                        setSelectedStep("");
                    }
                    else {
                        toast.error("Update failed", { id: toastId });
                    }
                }
                catch {
                    toast.error("Update failed", { id: toastId });
                }
            }
        });
    };

    // ---------- handle mentorship completion ----------
    const handleComplete = () => {
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A;font-family:Poppins,sans-serif;font-size:22px;font-weight:bold;">Mark as Completed?</h2>
                    <p style="color:#334155;font-family:Open Sans,sans-serif;font-size:16px;margin-top:8px;">Are you sure you want to mark this mentorship as completed?</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Marking as completed...");

                // ---------- patch request to server ----------
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.patch(`http://localhost:5000/mentorship/${id}`, { status: "completed" }, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Mentorship completed!", { id: toastId });
                        refetch();
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

    // ---------- handle mentorship cancel ----------
    const handleCancel = () => {

        // ---------- confirmation alert ----------
        Swal.fire({
            html: `
                    <h2 style="color:#0F172A;font-family:Poppins,sans-serif;font-size:22px;font-weight:bold;">Cancel Mentorship?</h2>
                    <p style="color:#334155;font-family:Open Sans,sans-serif;font-size:16px;margin-top:8px;">This action cannot be undone.</p>
                `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6f16d7",
        }).then(async (result) => {

            // ---------- if confirmed ----------
            if (result.isConfirmed) {
                const toastId = toast.loading("Cancelling...");

                // ---------- patch request to server ----------
                try {
                    const token = await user.getIdToken();
                    const { data } = await axios.patch(`http://localhost:5000/mentorship/${id}`, { status: "cancelled" }, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (data?.acknowledged) {
                        toast.success("Mentorship cancelled!", { id: toastId });
                        refetch();
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

    return (
        <div>
            {/* ---------- Header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <h2 className="font-poppins text-xl lg:text-2xl font-bold mb-8 text-dark">
                    Mentorship Progress
                </h2>

                {/* ---------- Main card ---------- */}
                <div className="bg-white rounded-xl sm:p-8 shadow-md space-y-8">

                    {/* ---------- Student Info ---------- */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 border-b pb-6 border-gray-200">

                        {/* ---------- student image ---------- */}
                        <img
                            src={student?.userImage || defaultUser}
                            onError={(e) => { e.currentTarget.src = defaultUser; }}
                            alt={student?.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>

                            {/* ---------- student name ---------- */}
                            <h3 className="font-semibold text-lg text-dark font-poppins">
                                {student?.name}
                            </h3>

                            {/* ---------- goal ---------- */}
                            <p className="text-slate-600 text-sm mt-1">
                                Goal: <span className="font-medium">{goal}</span>
                            </p>

                            {/* ---------- date ---------- */}
                            <p className="text-slate-500 text-sm">
                                Started on:{" "}
                                <span>{format(new Date(createdAt), "MMMM dd, yyyy")}</span>
                            </p>
                        </div>
                    </div>

                    {/* ---------- Description ---------- */}
                    <div>
                        <h4 className="font-semibold text-dark mb-2">Description</h4>
                        <p className="text-slate-600 leading-relaxed">{description}</p>
                    </div>

                    {/* ---------- Step Progress ---------- */}
                    <div>
                        <h4 className="font-semibold text-dark mb-4">Progress</h4>

                        {/* ---------- Completed steps ---------- */}
                        <div className="space-y-3 mb-6">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 p-3 rounded-lg ${index < currentStepIndex
                                        ? "bg-green-50 border border-green-200"
                                        : index === currentStepIndex
                                            ? "bg-purple-50 border border-purple-200"
                                            : "bg-gray-50 border border-gray-100"
                                        }`}
                                >
                                    {index < currentStepIndex ? (
                                        <MdCheckCircle className="text-green-600 text-lg" /> // completed steps
                                    ) : index === currentStepIndex ? (
                                        <FaFlagCheckered className="text-purple-600 text-lg" /> // current step
                                    ) : (
                                        <span className="w-4 h-4 border rounded-full border-gray-300"></span> // upcoming steps
                                    )}
                                    <span className="font-medium text-slate-700">{step}</span>
                                </div>
                            ))}
                        </div>

                        {/* ---------- Step update dropdown ---------- */}
                        {remainingSteps.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <select
                                    value={selectedStep}
                                    onChange={(e) => setSelectedStep(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="" disabled>Select next step...</option>
                                    {remainingSteps.map((step, idx) => (
                                        <option key={idx} value={step}>
                                            {step}
                                        </option>
                                    ))}
                                </select>

                                {/* ---------- update step button ---------- */}
                                <PurpleButton text="Update Step" clickFunction={handleStepChange} />
                            </div>
                        )}

                        {/* ---------- Mark Completed ---------- */}
                        {currentStepIndex === steps.length - 1 && (
                            <div className="mt-6">

                                {/* ---------- mentorship complete button ---------- */}
                                <PurpleButton
                                    text="Mark as Completed"
                                    clickFunction={handleComplete}
                                />
                            </div>
                        )}
                    </div>

                    {/* ---------- Cancel mentorship ---------- */}
                    <div className="pt-6 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition cursor-pointer"
                        >
                            <MdCancel size={18} />
                            Cancel Mentorship
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMentorshipInProgressDetailsAlumni;