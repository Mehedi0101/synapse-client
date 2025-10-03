import ContentLoader from "react-content-loader";

const MentorshipStatusSkeleton = () => {
    return (
        <div className="bg-white rounded-xl sm:p-8 flex flex-col items-center text-center w-full max-w-md mx-auto">
            <ContentLoader
                speed={2}
                width="100%"
                viewBox="0 0 400 250"
                backgroundColor="#d6d6d6"
                foregroundColor="#bdbdbd"
                className="w-full"
            >
                {/* Placeholder for Image */}
                <rect x="125" y="10" rx="12" ry="12" width="150" height="120" />

                {/* Title */}
                <rect x="80" y="150" rx="6" ry="6" width="240" height="18" />

                {/* Subtitle / Description Line 1 */}
                <rect x="40" y="180" rx="4" ry="4" width="320" height="12" />

                {/* Subtitle / Description Line 2 */}
                <rect x="60" y="200" rx="4" ry="4" width="280" height="12" />

                {/* Subtitle / Description Line 3 */}
                <rect x="90" y="220" rx="4" ry="4" width="220" height="12" />
            </ContentLoader>
        </div>
    );
};

export default MentorshipStatusSkeleton;