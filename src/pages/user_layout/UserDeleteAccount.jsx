import { useContext, useState } from "react";
import UserHeader from "../../components/user_layout/shared/UserHeader";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import RedButton from "../../components/shared/buttons/RedButton";
import Swal from "sweetalert2";
import AuthContext from "../../contexts/AuthContext";

const UserDeleteAccount = () => {

    // ---------- hooks ----------
    const { deleteUserAccount } = useContext(AuthContext);
    // const navigate = useNavigate();

    // ---------- password states ----------
    const [currentPassword, setCurrentPassword] = useState("");

    // ---------- password show or hide toggling state ----------
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const handleDeleteAccount = (e) => {
        e.preventDefault();

        Swal.fire({
            html: `
                    <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Confirm Account Deletion</h2>
                    <p style="color:#2e3a59; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px; font-weight: 600;">Are you sure you want to delete your account? This action is permanent and cannot be undone.</p>
                `,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            denyButtonText: 'No',
            confirmButtonColor: "#6f16d7",
            cancelButtonColor: "#d33",
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-2',
                confirmButton: 'order-1 right-gap',
            },
        }).then((result) => {

            // ---------- actions after confirming change ---------- 
            if (result.isConfirmed) {

                deleteUserAccount(currentPassword);

            }
        })
    }

    return (
        <div>

            {/* ---------- user header ---------- */}
            <UserHeader searchBar="invisible" />

            <div className="mx-2 md:mx-5 my-20 md:my-32 text-semi-dark flex flex-col justify-center items-center">

                {/* ---------- heading ---------- */}
                <h2 className="font-poppins text-xl lg:text-2xl font-bold text-dark mb-4 min-[450px]:p-0">Delete Account</h2>

                {/* ---------- explanatory text ---------- */}
                <p className="font-poppins text-sm text-gray-600 mb-6 max-w-md text-center">
                    To permanently delete your account, please enter your current password below. This is a necessary step to verify your identity.
                </p>

                <form
                    className="max-w-md bg-white p-0 min-[450px]:p-6 rounded-lg shadow-md space-y-4 w-full"
                    onSubmit={handleDeleteAccount}
                >

                    {/*---------- password ----------*/}
                    <div>
                        <div className="relative">
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                type={showCurrentPassword ? "text" : "password"}
                                required
                                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                                placeholder="Current Password"
                            />

                            {/*---------- Password show or hide toggle button ----------*/}
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                            >
                                {showCurrentPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Delete Account Button */}
                    <RedButton text="Delete Account" type="submit"></RedButton>
                </form>
            </div>
        </div>
    );
};

export default UserDeleteAccount;