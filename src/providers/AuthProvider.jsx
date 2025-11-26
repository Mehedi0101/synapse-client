import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import app from "../firebase/firebase.config";
import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    // ---------- user state ----------
    const [user, setUser] = useState(null);

    // ---------- loading state ----------
    const [initialLoading, setInitialLoading] = useState(true);

    // ---------- userDetails ----------
    const { data: userDetails = null, refetch: refetchUserDetails, isPending: userDetailsPending } = useQuery({
        queryKey: ["user-details", user?.email],
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axios.post("http://localhost:5000/users/email", { email: user.email }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return res.data;
        },
        enabled: !!user?.email
    });

    const loading = initialLoading || (user && userDetailsPending);

    // ---------- register function ----------
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ---------- login function ----------
    const login = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ---------- logout function ----------
    const logout = () => {
        // setLoading(true);
        return signOut(auth);
    }

    // ---------- change password ----------
    const changePassword = async (oldPassword, newPassword) => {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        return updatePassword(user, newPassword);
    }

    // account delete function
    const deleteUserAccount = async (password) => {

        // ---------- toast loading ---------- 
        const toastId = toast.loading('Removing account permanently...');

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            const token = await user.getIdToken();

            try {
                // ---------- delete from database ----------
                const { data } = await axios.delete(`http://localhost:5000/users/${userDetails._id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if (data?.acknowledged) {
                    await deleteUser(user);
                    logout();
                    setUser(null);
                    toast.success('Account Removed', { id: toastId });
                } else {
                    toast.error('Something went wrong', { id: toastId });
                }
            }
            catch {
                toast.error('Failed to remove account from server', { id: toastId });
            }
        }
        catch {
            // ---------- toast error (incorrect password) ---------- 
            toast.error('Incorrect current password', { id: toastId });
        }
    }

    // Firebase observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setInitialLoading(false);
            console.log(currentUser.accessToken);
        });

        return () => unsubscribe();
    }, []);

    // ---------- data available to children ----------
    const authData = {
        loading,
        user,
        setUser,
        userDetails,
        refetchUserDetails,
        createUser,
        login,
        logout,
        changePassword,
        deleteUserAccount,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;