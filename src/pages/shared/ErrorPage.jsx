import { Link } from "react-router-dom";
import not_found from "../../assets/404_not_found.svg";
import { useEffect } from "react";

const ErrorPage = () => {

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Not Found";
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center font-open-sans">
            <img
                src={not_found}
                alt="404 Illustration"
                className="w-72 md:w-96"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3 font-poppins">
                Page Not Found
            </h1>

            <p className="text-slate-600 max-w-md mb-6">
                Sorry, the page you're looking for doesn’t exist or has been moved.
            </p>

            <Link
                to="/"
                className="px-6 py-3 bg-primary text-white rounded-full font-medium shadow hover:bg-primary-dark transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;