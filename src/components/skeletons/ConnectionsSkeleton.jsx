import ContentLoader from 'react-content-loader';

const ConnectionsSkeleton = () => {
    return (
        <div>
            {Array.from({ length: 8 }).map((_, idx) => (
                <ContentLoader
                    key={idx}
                    speed={2}
                    width="100%"
                    viewBox="0 0 400 60"
                    backgroundColor="#d6d6d6"
                    foregroundColor="#bdbdbd"
                    className="w-full"
                >
                    {/* ---------- User avatar ---------- */}
                    <circle cx="30" cy="30" r="24" />

                    {/* ---------- User name ---------- */}
                    <rect x="70" y="15" rx="6" ry="6" width="180" height="14" />

                    {/* ---------- User role + dept ---------- */}
                    <rect x="70" y="36" rx="5" ry="5" width="250" height="12" />
                </ContentLoader>
            ))}
        </div>
    );
};

export default ConnectionsSkeleton;