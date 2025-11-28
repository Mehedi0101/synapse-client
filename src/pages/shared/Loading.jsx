import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {

    // ---------- page title ----------
    useEffect(() => {
        document.title = "Synapse";
    }, []);

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center'>
            <ClipLoader
                color="#6f16d7"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;