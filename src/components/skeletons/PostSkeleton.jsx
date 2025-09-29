import ContentLoader from 'react-content-loader';

const PostSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            viewBox="0 0 1000 420"
            backgroundColor="#d6d6d6"
            foregroundColor="#bdbdbd"
            className="border border-slate-300 rounded-xl p-6 pb-0 w-full"
        >
            {/* ---------- User avatar ---------- */}
            <circle cx="30" cy="25" r="20" />

            {/* ---------- Author name + details ---------- */}
            <rect x="65" y="12" rx="6" ry="6" width="220" height="16" />
            <rect x="65" y="34" rx="5" ry="5" width="300" height="14" />
            <rect x="65" y="54" rx="5" ry="5" width="150" height="14" />

            {/* ---------- Post content (paragraphs) ---------- */}
            <rect x="0" y="85" rx="6" ry="6" width="95%" height="16" />
            <rect x="0" y="110" rx="6" ry="6" width="92%" height="16" />
            <rect x="0" y="135" rx="6" ry="6" width="88%" height="16" />

            <rect x="0" y="165" rx="6" ry="6" width="95%" height="16" />
            <rect x="0" y="190" rx="6" ry="6" width="90%" height="16" />

            {/* ---------- Divider ---------- */}
            <rect x="0" y="225" rx="3" ry="3" width="100%" height="2" />

            {/* ---------- Comment input ---------- */}
            <circle cx="22" cy="265" r="16" />
            <rect x="50" y="250" rx="15" ry="15" width="85%" height="32" />

            {/* ---------- Comment placeholders ---------- */}
            <circle cx="22" cy="310" r="16" />
            <rect x="50" y="296" rx="6" ry="6" width="82%" height="16" />
            <rect x="50" y="316" rx="6" ry="6" width="70%" height="14" />

            <circle cx="22" cy="360" r="16" />
            <rect x="50" y="346" rx="6" ry="6" width="88%" height="16" />
            <rect x="50" y="366" rx="6" ry="6" width="65%" height="14" />
        </ContentLoader>
    );
};

export default PostSkeleton;