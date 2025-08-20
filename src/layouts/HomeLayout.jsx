import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const HomeLayout = () => {
    const { user, logOut } = useContext(AuthContext);

    console.log(user);

    const handleLogOut = () => {
        logOut()
        .then(() => {

        })
        .catch(() => {

        })
    }



    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center gap-8">
            <p className="text-3xl">Current User: {user.email}</p>
            <button onClick={handleLogOut}
                type="submit"
                className="rounded-lg bg-primary px-4 py-2.5 text-white font-medium focus:outline-none active:scale-95 transition-all ease-linear cursor-pointer"
            >
                Log Out
            </button>
        </div>
    );
};

export default HomeLayout;