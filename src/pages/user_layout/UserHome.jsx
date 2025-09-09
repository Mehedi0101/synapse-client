import UserHeader from "../../components/user_layout/shared/UserHeader";

const UserHome = () => {
    return (
        <div>
            {/* ---------- user header with searchbar ---------- */}
            <UserHeader searchBar=""></UserHeader>

            {/* ---------- main section ---------- */}
            <div className="mx-2 md:mx-5 my-8 text-semi-dark">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default UserHome;