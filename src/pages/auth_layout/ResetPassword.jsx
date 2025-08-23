import ButtonWide from "../../components/shared/ButtonWide";
import ButtonPrimary from "../../components/shared/ButtonWide";

const ResetPassword = () => {

    const handleResetPassword = e => {
        e.preventDefault();

    }

    return (
        <>
            <div className='max-w-96 text-center mx-auto my-10'>
                <h2 className='font-poppins text-2xl xl:text-3xl font-semibold text-white'>Reset your password</h2>
                <p className='text-sm xl:text-base text-gray-300 mt-4'>Check your email. We will send a link to reset your password</p>
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
        </>
    );
};

export default ResetPassword;