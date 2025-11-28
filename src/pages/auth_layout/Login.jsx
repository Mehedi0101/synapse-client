import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import AuthContext from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import WelcomeText from "../../components/auth_layout/WelcomeText";
import ButtonWide from "../../components/shared/buttons/ButtonWide";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Login = () => {

    // ---------- data from auth provider ----------
    const { login, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // ---------- error states ----------
    const [credentialError, setCredentialError] = useState(null);

    // ---------- show or hide password toggling state ----------
    const [showPassword, setShowPassword] = useState(false);

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
            .then(() => {
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


    const handleDemoLogin = (role) => {
        const toastId = toast.loading("Logging in...");

        const demoCredentials = {
            student: {
                email: "gueststudent@email.com",
                password: "Abc@1234"
            },
            alumni: {
                email: "guestalumni@email.com",
                password: "Abc@1234"
            },
            admin: {
                email: "guestadmin@email.com",
                password: "Abc@1234"
            }
        };

        const { email, password } = demoCredentials[role];

        login(email, password)
            .then(() => {
                toast.success("Logged in as Demo " + role, { id: toastId });
                navigate("/");
            })
            .catch(() => {
                toast.error("Demo login failed", { id: toastId });
            });
    };

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Login";
    }, []);

    return (
        <motion.div

            // ---------- animation configuration ----------
            initial={{ x: "-100vw", opacity: 0 }}   // start off-screen to the left
            animate={{ x: 0, opacity: 1 }}      // move to center
            exit={{ x: -200, opacity: 0 }}      // if you want exit animation
            transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}>
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
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                        placeholder="Password"
                                    />

                                    {/*---------- Password show or hide toggle button ----------*/}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                                    >
                                        {showPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                                    </button>
                                </div>

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

                        {/* ---------- Demo Accounts Section ---------- */}
                        <div>
                            <p className="text-center text-gray-600 mb-3 text-sm">
                                Explore the platform instantly
                            </p>

                            <div className="flex flex-col gap-3">

                                {/* Demo Student */}
                                <button
                                    onClick={() => handleDemoLogin("student")}
                                    className="w-full py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition cursor-pointer"
                                >
                                    Continue as Demo Student
                                </button>

                                {/* Demo Alumni */}
                                <button
                                    onClick={() => handleDemoLogin("alumni")}
                                    className="w-full py-2 bg-emerald-600 text-white rounded-full shadow hover:bg-emerald-700 transition cursor-pointer"
                                >
                                    Continue as Demo Alumni
                                </button>

                                {/* Demo Admin */}
                                <button
                                    onClick={() => handleDemoLogin("admin")}
                                    className="w-full py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition cursor-pointer"
                                >
                                    Continue as Demo Admin
                                </button>
                            </div>
                        </div>

                        {/*---------- Registration link ----------*/}
                        <div className="text-center text-sm my-6">
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link to="/auth/register" className="font-medium text-primary hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;