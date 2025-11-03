import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";

const UserChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // ---------- password show or hide toggling state ----------
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ---------- error states ----------
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const handleChangePassword = (e) => {
        e.preventDefault();

        // ---------- error states reset ----------
        setPasswordError(null);
        setConfirmPasswordError(null);

        // ---------- password length error ----------
        if (newPassword.length < 8) {
            setPasswordError("Password should be at least 8 character");
            return;
        }

        // ---------- password pattern error ----------
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setPasswordError("Password should contain at least one uppercase[A-Z], one lower case[a-z], one digit[0-9], and a special symbol");
            return;
        }


        // ---------- password confirmation error ----------
        if (newPassword !== confirmNewPassword) {
            setConfirmPasswordError("Passwords don't match");
            return;
        }

        // Call your API to update password
        console.log("Password changed to:", newPassword);
    };

    return (
        <div>
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-20 text-semi-dark flex flex-col justify-center items-center">
                <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark">Change Password</h2>

                <form
                    className="max-w-md bg-white p-6 rounded-lg shadow-md space-y-4 w-full"
                    onSubmit={handleChangePassword}
                >
                    {/* Previous Password */}
                    <div>
                        <div className="relative">
                            <input
                                id="previousPassword"
                                name="previousPassword"
                                value="********"
                                type="password"
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10 cursor-not-allowed"
                                placeholder="Previous Password"
                                disabled
                            />
                        </div>
                    </div>


                    {/*---------- Password ----------*/}
                    <div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                required
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                placeholder="New Password"
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

                        {/*---------- password error display ----------*/}
                        {passwordError &&
                            <p className="text-red-600 text-xs sm:text-sm">
                                <CiWarning className="text-sm sm:text-base inline mr-1" />
                                <span>
                                    {passwordError}
                                </span>
                            </p>}
                    </div>

                    {/*---------- Confirm Password ----------*/}
                    <div>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                placeholder="Confirm New Password"
                            />

                            {/*----------Confirm password show or hide toggle button ----------*/}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                            >
                                {showConfirmPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                            </button>
                        </div>

                        {/*---------- confirm password error display ----------*/}
                        {confirmPasswordError &&
                            <p className="text-red-600 text-xs sm:text-sm">
                                <CiWarning className="text-sm sm:text-base inline mr-1" />
                                <span>
                                    {confirmPasswordError}
                                </span>
                            </p>}
                    </div>

                    {/* Submit Button */}
                    <PurpleButton text="Update Password" type="submit"></PurpleButton>
                </form>
            </div>
        </div>
    );
};

export default UserChangePassword;
