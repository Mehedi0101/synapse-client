import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {

    // ---------- hooks ----------
    const navigate = useNavigate();

    // ---------- from auth provider ----------
    const { logout } = useContext(AuthContext);

    useEffect(() => {

        // ---------- interceptor for handling 401 and 403 status centrally ----------
        const interceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {

                    // ---------- session expired ----------
                    toast.info("Session expired. Please log in again.");
                    logout();
                    navigate('/auth/login');
                }
                else if (error.response && error.response.status === 403) {
                    navigate('/forbidden');
                }
                return Promise.reject(error);
            }
        );

        return () => axiosInstance.interceptors.response.eject(interceptor);
    }, [navigate, logout]);

    return axiosInstance;
};

export default useAxiosSecure;