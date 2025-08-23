import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CiWarning } from "react-icons/ci";
import AuthContext from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import WelcomeText from "../../components/auth_layout/WelcomeText";
import ButtonWide from "../../components/shared/ButtonWide";

const Login = () => {

    // ---------- data from auth provider ----------
    const { login, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // ---------- error states ----------
    const [credentialError, setCredentialError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        // ---------- error states reset ----------
        setCredentialError(null);

        // ---------- form data ----------
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // ---------- loading toast ----------
        const toastId = toast.loading('Logging in...');

        // ---------- login function ----------
        login(email, password)
            .then((result) => {
                navigate('/');

                // ---------- toast success ----------
                toast.success('Logged in successfully', { id: toastId });
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    setCredentialError("Invalid email and password")
                }

                // ---------- toast error ----------
                toast.error('Login failed', { id: toastId });
                setUser(null);
            })
    };

    return (
        <>
            <WelcomeText></WelcomeText>

            <div className="flex items-center justify-center px-4 text-sm md:text-base">
                <div className="w-full max-w-md">
                    <div className="bg-[#ffffffe3] rounded-2xl shadow-xl p-8">

                        {/*---------- Form ----------*/}
                        <form onSubmit={handleLogin} className="space-y-5">

                            {/*---------- email ----------*/}
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                    placeholder="Email"
                                />
                            </div>

                            {/*---------- password ----------*/}
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                    placeholder="Password"
                                />

                                {/*---------- invalid email and password error display ----------*/}
                                {credentialError &&
                                    <p className="text-red-600 text-xs sm:text-sm">
                                        <CiWarning className="text-sm sm:text-base inline mr-1" />
                                        <span>
                                            {credentialError}
                                        </span>
                                    </p>}
                            </div>

                            <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between">

                                {/*---------- Remember me ----------*/}
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                {/*---------- forgot password ----------*/}
                                <Link to="/auth/reset-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            {/*---------- login button ----------*/}
                            <ButtonWide text="Log into your account"></ButtonWide>
                        </form>

                        {/*---------- divider ----------*/}
                        <div className="my-6 flex items-center">
                            <div className="h-px flex-1 bg-gray-400" />
                            <span className="px-3 text-xs uppercase tracking-wide text-gray-600">or</span>
                            <div className="h-px flex-1 bg-gray-400" />
                        </div>

                        {/*---------- Registration link ----------*/}
                        <div className="text-center text-sm">
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link to="/auth/register" className="font-medium text-primary hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;