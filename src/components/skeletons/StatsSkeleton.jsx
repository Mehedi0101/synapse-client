import ContentLoader from "react-content-loader";

const StatsSkeleton = () => {
    return (
        <div className="w-full bg-white rounded-xl p-6 shadow-sm">
            <ContentLoader
                speed={2}
                width="100%"
                viewBox="0 0 400 200"
                backgroundColor="#d6d6d6"
                foregroundColor="#bdbdbd"
                className="w-full"
            >
                {/* X Axis Line */}
                <rect x="40" y="220" rx="2" ry="2" width="320" height="4" />

                {/* Y Axis Line */}
                <rect x="40" y="40" rx="2" ry="2" width="4" height="180" />

                {/* Bars */}
                <rect x="60" y="140" rx="4" ry="4" width="30" height="80" />
                <rect x="110" y="100" rx="4" ry="4" width="30" height="120" />
                <rect x="160" y="60" rx="4" ry="4" width="30" height="160" />
                <rect x="210" y="120" rx="4" ry="4" width="30" height="100" />
                <rect x="260" y="80" rx="4" ry="4" width="30" height="140" />
                <rect x="310" y="180" rx="4" ry="4" width="30" height="40" />
            </ContentLoader>
        </div>
    );
};

export default StatsSkeleton;