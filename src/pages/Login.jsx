import { Link } from "react-router-dom";

const Login = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center px-4 text-sm md:text-base">
            <div className="w-full max-w-md">
                <div className="bg-[#ffffffe3] rounded-2xl shadow-xl p-8">
                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* email */}
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

                        {/* password */}
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
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between">
                            {/* Remember me */}
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

                            {/* forgot password */}
                            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primary focus:outline-none focus:scale-95 transition-all ease-linear cursor-pointer"
                        >
                            Log into your account
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-gray-400" />
                        <span className="px-3 text-xs uppercase tracking-wide text-gray-600">or</span>
                        <div className="h-px flex-1 bg-gray-400" />
                    </div>

                    {/* Registration link */}
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to="/auth/register" className="font-medium text-primary hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;