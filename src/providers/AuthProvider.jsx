import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    // ---------- user state ----------
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    // ---------- loading state ----------
    const [loading, setLoading] = useState(true);

    // ---------- register function ----------
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // ---------- login function ----------
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ---------- logout function ----------
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // ---------- user observer ----------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [])

    // ---------- fetch user data from database if current user is not null ----------
    useEffect(() => {
        if (user?.email) {
            axios.post("http://localhost:5000/users/email", { email: user.email })
                .then((data) => {
                    setUserDetails(data.data);
                })
        }
        else {
            setUserDetails(null);
        }
    }, [user])

    // ---------- data available to children ----------
    const authData = {
        loading,
        user,
        setUser,
        userDetails,
        createUser,
        login,
        logout
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;