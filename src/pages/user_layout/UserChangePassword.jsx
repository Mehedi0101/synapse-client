import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PurpleButton from "../../components/shared/buttons/PurpleButton";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { useContext, useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import AuthContext from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserChangePassword = () => {

    // ---------- hooks ----------
    const { changePassword } = useContext(AuthContext);
    const navigate = useNavigate();

    // ---------- password states ----------
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    // ---------- password show or hide toggling state ----------
    const [showPreviousPassword, setShowPreviousPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ---------- error states ----------
    const [newPasswordError, setNewPasswordError] = useState(null);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);

    // ---------- change password function ----------
    const handleChangePassword = (e) => {
        e.preventDefault();

        // ---------- error states reset ----------
        setNewPasswordError(null);
        setConfirmNewPasswordError(null);

        // ---------- password length error ----------
        if (newPassword.length < 8) {
            setNewPasswordError("Password should be at least 8 character");
            return;
        }

        // ---------- password pattern error ----------
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setNewPasswordError("Password should contain at least one uppercase[A-Z], one lower case[a-z], one digit[0-9], and a special symbol");
            return;
        }


        // ---------- password confirmation error ----------
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("Passwords don't match");
            return;
        }

        // ---------- loading toast ----------
        const toastId = toast.loading('Changing password...');

        // ---------- change password function from auth provider ----------
        changePassword(previousPassword, newPassword)
            .then(() => {
                toast.success('Password changed', { id: toastId });

                // ---------- go to homepage ----------
                navigate('/profile');
            })
            .catch(() => {
                // ---------- incorrect password toast ----------
                toast.error('Incorrect current password', { id: toastId });
            })
    };

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Change Password";
    }, []);

    return (
        <div>

            {/* ---------- user header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-20 text-semi-dark flex flex-col justify-center items-center">

                {/* ---------- heading ---------- */}
                <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark mb-4 min-[450px]:p-0">Change Password</h2>

                <form
                    className="max-w-md bg-white p-0 min-[450px]:p-6 rounded-lg shadow-md space-y-4 w-full"
                    onSubmit={handleChangePassword}
                >

                    {/*---------- Previous Password ----------*/}
                    <div>
                        <div className="relative">
                            <input
                                id="previousPassword"
                                name="previousPassword"
                                value={previousPassword}
                                onChange={(e) => setPreviousPassword(e.target.value)}
                                type={showPreviousPassword ? "text" : "password"}
                                required
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                placeholder="Current Password"
                            />

                            {/*---------- Password show or hide toggle button ----------*/}
                            <button
                                type="button"
                                onClick={() => setShowPreviousPassword(!showPreviousPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                            >
                                {showPreviousPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                            </button>
                        </div>
                    </div>


                    {/*---------- New Password ----------*/}
                    <div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showNewPassword ? "text" : "password"}
                                required
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                placeholder="New Password"
                            />

                            {/*---------- Password show or hide toggle button ----------*/}
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                            >
                                {showNewPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                            </button>
                        </div>

                        {/*---------- password error display ----------*/}
                        {newPasswordError &&
                            <p className="text-red-600 text-xs sm:text-sm">
                                <CiWarning className="text-sm sm:text-base inline mr-1" />
                                <span>
                                    {newPasswordError}
                                </span>
                            </p>}
                    </div>

                    {/*---------- Confirm New Password ----------*/}
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
                        {confirmNewPasswordError &&
                            <p className="text-red-600 text-xs sm:text-sm">
                                <CiWarning className="text-sm sm:text-base inline mr-1" />
                                <span>
                                    {confirmNewPasswordError}
                                </span>
                            </p>}
                    </div>

                    {/* Update Password Button */}
                    <PurpleButton text="Update Password" type="submit"></PurpleButton>
                </form>
            </div>
        </div>
    );
};

export default UserChangePassword;
