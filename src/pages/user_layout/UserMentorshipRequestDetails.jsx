import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import defaultUser from "../../assets/default_user.jpg";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { format } from "date-fns";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import RedButton from "../../components/shared/buttons/RedButton";

const UserMentorshipRequestDetails = () => {
    const { id } = useParams(); // mentorship request ID
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // ---------- fetch mentorship request ----------
    const { data: request, isPending } = useQuery({
        queryKey: ["mentorship-request", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/mentorship/${id}`);
            return res.data; // since we used aggregate
        },
        enabled: !!id,
    });

    // ---------- state for steps ----------
    const [steps, setSteps] = useState([]);
    const [stepInput, setStepInput] = useState("");

    useEffect(() => {
        if (request?.steps) {
            setSteps(request.steps);
        }
    }, [request]);

    // ---------- mutation for approve/reject ----------
    const mutation = useMutation({
        mutationFn: async (updateData) => {
            return axios.patch(`http://localhost:5000/mentorship/${id}`, updateData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["mentorship-request", id]);
            queryClient.invalidateQueries(["mentorship-alumni"]);
        },
    });

    // ---------- add step ----------
    const handleAddStep = (e) => {
        e.preventDefault();
        if (stepInput.trim() === "") return;
        setSteps([...steps, stepInput.trim()]);
        setStepInput("");
    };

    // ---------- remove step ----------
    const handleRemoveStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    // ---------- approve mentorship ----------
    const handleApprove = () => {

        if (steps.length === 0) return toast.error("Add mentorship steps first");

        Swal.fire({
            html: `
        <h2 style="color:#0F172A;font-family:Poppins,sans-serif;font-size:22px;font-weight:bold;">Approve Request?</h2>
        <p style="color:#334155;font-family:Open Sans,sans-serif;font-size:16px;margin-top:8px;">This will accept the student as your mentee and save your mentorship plan.</p>
      `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Approving mentorship...");
                mutation.mutate(
                    { status: "accepted", steps },
                    {
                        onSuccess: (res) => {
                            if (res.data?.acknowledged) {
                                toast.success("Mentorship approved!", { id: toastId });
                                navigate("/mentorship");
                            } else {
                                toast.error("Failed to approve", { id: toastId });
                            }
                        },
                        onError: () => toast.error("Something went wrong", { id: toastId }),
                    }
                );
            }
        });
    };

    // ---------- reject mentorship ----------
    const handleReject = () => {
        Swal.fire({
            html: `
        <h2 style="color:#0F172A;font-family:Poppins,sans-serif;font-size:22px;font-weight:bold;">Reject Request?</h2>
        <p style="color:#334155;font-family:Open Sans,sans-serif;font-size:16px;margin-top:8px;">This will reject the mentorship request permanently.</p>
      `,
            confirmButtonText: "Yes",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6f16d7",
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Rejecting request...");
                mutation.mutate(
                    { status: "rejected" },
                    {
                        onSuccess: (res) => {
                            if (res.data?.acknowledged) {
                                toast.success("Request rejected", { id: toastId });
                                navigate("/mentorship");
                            } else {
                                toast.error("Failed to reject", { id: toastId });
                            }
                        },
                        onError: () => toast.error("Something went wrong", { id: toastId }),
                    }
                );
            }
        });
    };

    if (isPending) {
        return (
            <div className="mx-2 md:mx-5 my-8 text-center text-slate-500">
                Loading request details...
            </div>
        );
    }

    if (!request) {
        return (
            <div className="mx-2 md:mx-5 my-8 text-center text-slate-500">
                Request not found
            </div>
        );
    }

    return (
        <div>
            {/* ---------- header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-auto my-8 text-semi-dark max-w-3xl">
                {/* ---------- main card ---------- */}
                <div className="bg-white rounded-xl shadow p-6 sm:p-8 space-y-6">
                    {/* ---------- student info ---------- */}
                    <div className="flex items-center gap-4">
                        <img
                            src={request?.student?.userImage || defaultUser}
                            alt={request?.student?.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-dark">{request?.student?.name}</h3>
                            <p className="text-xs text-slate-500">
                                Requested on {format(new Date(request.createdAt), "MMMM dd, yyyy")}
                            </p>
                        </div>
                    </div>

                    {/* ---------- Goal & Description ---------- */}
                    <div>
                        <h4 className="font-semibold text-dark mb-1">Goal</h4>
                        <p className="text-slate-600">{request?.goal}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-dark mb-1">Description</h4>
                        <p className="text-slate-600 whitespace-pre-line">{request?.description}</p>
                    </div>

                    {/* ---------- Steps ---------- */}
                    <div>
                        <h4 className="font-semibold text-dark mb-2">Mentorship Steps</h4>
                        <div className="flex items-center gap-2 mb-3">
                            <input
                                type="text"
                                value={stepInput}
                                onChange={(e) => setStepInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddStep(e)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Type a step and press Enter"
                            />
                        </div>
                        <ul className="space-y-2">
                            {steps.map((step, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg text-sm"
                                >
                                    <span>{step}</span>
                                    <button
                                        onClick={() => handleRemoveStep(idx)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Actions ---------- */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <PurpleButton text="Approve" clickFunction={handleApprove}></PurpleButton>
                        <RedButton text="Reject" clickFunction={handleReject}></RedButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMentorshipRequestDetails;
