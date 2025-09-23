import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import ButtonWide from "../../components/shared/buttons/ButtonWide";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const auth = getAuth(app);

const ResetPassword = () => {

    // ---------- reset password function ----------
    const handleResetPassword = e => {
        e.preventDefault();

        // ---------- form data ----------
        const email = e.target.email.value;

        // ---------- loading toast ----------
        const toastId = toast.loading('Sending request...');

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // ---------- loading success ----------
                toast.success('Request sent. Check your email.', { id: toastId });
            })
            .catch(() => {
                // ---------- error toast ----------
                toast.error('Something went wrong. Try again later.', { id: toastId });
            })
    }

    return (
        <motion.div

            // ---------- animation configuration ----------
            initial={{ x: "100vw", opacity: 0 }}    // start off-screen to the right
            animate={{ x: 0, opacity: 1 }}      // move to center
            exit={{ x: 200, opacity: 0 }}       // optional exit animation
            transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
        >
            <div className='max-w-96 text-center mx-auto my-10'>
                <h2 className='font-poppins text-2xl xl:text-3xl font-semibold text-white'>Reset your password</h2>
                <p className='text-sm xl:text-base text-gray-300 mt-4'>Check your email. We will send a link to reset your password. If you can't find it in the inbox then check the spam folder as well.</p>
            </div>

            <div className="flex items-center justify-center px-4 text-sm md:text-base">
                <div className="w-full max-w-md">
                    <div className="bg-[#ffffffe3] rounded-2xl shadow-xl p-8">

                        {/*---------- Form ----------*/}
                        <form onSubmit={handleResetPassword} className="space-y-5">

                            {/*---------- email ----------*/}
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                                    placeholder="Account Email"
                                />
                            </div>

                            {/*---------- reset password button ----------*/}
                            <ButtonWide text="Reset password"></ButtonWide>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResetPassword;