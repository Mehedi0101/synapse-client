import pendingSvg from "../../../assets/pending.svg";

const StudentPendingRequest = ({ mentorship }) => {
    return (
        <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">
            <img
                src={pendingSvg}
                alt="pending request"
                className="w-48 max-w-full mb-4"
            />
            <h3 className="text-lg font-semibold font-poppins text-dark">
                Mentorship Request Submitted
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
                Your request has been successfully submitted and is currently under
                review. An admin will soon process your request.
                You will be notified soon about the outcome of your request.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 max-w-md">
                <p><span className="font-semibold">Goal:</span> {mentorship?.goal}</p>
                <p><span className="font-semibold">Chosen Mentor:</span> {mentorship?.mentor?.name || "N/A"}</p>
                <p><span className="font-semibold">Status:</span> <span className="text-yellow-600">Pending</span></p>
            </div>

            <p className="text-xs text-slate-400 mt-4 italic">
                Tip: You cannot request another mentor until this request is processed.
            </p>
        </div>
    );
};

export default StudentPendingRequest;