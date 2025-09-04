import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import AuthContext from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    // ---------- user state ----------
    const [user, setUser] = useState(null);
    console.log(user);

    // ---------- loading state ----------
    const [loading, setLoading] = useState(true);

    // ---------- register function ----------
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    // ---------- login function ----------
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    // ---------- logout function ----------
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // ---------- user observer ----------
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser);
        });

        return () => unsubscribe();
    },[])

    // ---------- data available to children ----------
    const authData = {
        loading,
        user,
        setUser,
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