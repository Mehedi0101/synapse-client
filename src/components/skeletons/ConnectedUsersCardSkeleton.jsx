import React from "react";
import ContentLoader from "react-content-loader";

const ConnectedUsersCardSkeleton = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, idx) => (
                <ContentLoader
                    key={idx}
                    speed={2}
                    width="100%"
                    viewBox="0 0 400 48"
                    backgroundColor="#d6d6d6"
                    foregroundColor="#bdbdbd"
                    className="w-full rounded-2xl p-4 pb-0 shadow-lg"
                >
                    {/* User Image (circle) */}
                    <circle cx="20" cy="20" r="20" />

                    {/* User Name */}
                    <rect x="50" y="3" rx="4" ry="4" width="140" height="10" />

                    {/* Role | Department */}
                    <rect x="50" y="18" rx="3" ry="3" width="180" height="8" />

                    {/* Connection Date */}
                    <rect x="50" y="30" rx="3" ry="3" width="100" height="6" />

                    {/* Button */}
                    <rect x="350" y="16" rx="6" ry="6" width="40" height="12" />
                </ContentLoader>
            ))}
        </>
    );
};

export default ConnectedUsersCardSkeleton;