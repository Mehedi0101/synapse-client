import menteeSvg from "../../../assets/mentee.svg";

const AlumniNotAssigned = () => {
    return (
        <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center">
            <img
                src={menteeSvg}
                alt="mentees placeholder"
                className="w-48 max-w-full mb-4"
            />
            <h3 className="text-lg font-semibold font-poppins text-dark">
                No Mentees Assigned
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
                You currently don't have any mentees assigned. Once a student
                requests mentorship and admin assigns them to you, their details
                will appear here.
            </p>
        </div>
    );
};

export default AlumniNotAssigned;