import { Link } from "react-router-dom";
import forbidden from "../../assets/403_forbidden.svg";
import { useEffect } from "react";

const ForbiddenPage = () => {

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Forbidden";
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center font-open-sans">
            <img
                src={forbidden}
                alt="Access Denied Illustration"
                className="w-72 md:w-96"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3 font-poppins">
                Access Denied
            </h1>

            <p className="text-slate-600 max-w-md mb-6">
                You don't have permission to view this page.
                Please check your account privileges.
            </p>

            <div className="flex flex-col min-[300px]:flex-row items-center gap-4">
                <Link
                    to="/"
                    className="px-6 py-3 bg-primary text-white rounded-full font-medium shadow hover:bg-primary-dark transition"
                >
                    Go Home
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-200 text-dark rounded-full font-medium hover:bg-gray-300 transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ForbiddenPage;