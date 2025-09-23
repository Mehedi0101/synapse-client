import { format } from "date-fns";
import defaultResourceBanner from "../../../assets/default_resource_banner.jpg";
import defaultUser from "../../../assets/default_user.jpg";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ResourceCard = ({ resource }) => {

  // ---------- posted date format convert ----------
  const postedDate = format(new Date(resource?.createdAt), "MMMM d, yyyy");

  // ---------- truncating blog content if it too lengthy ----------
  const preview =
    resource?.content?.length > 120
      ? resource.content.slice(0, 120) + "..."
      : resource.content;

  return (
    <motion.div

      // ---------- card animation configuration ----------
      initial={{ opacity: 0, y: 50 }} // start invisible and 50px lower
      whileInView={{ opacity: 1, y: 0 }} // animate into place
      viewport={{ once: true, amount: 0.2 }} // trigger only once when 20% is visible
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link
        to={`/resources/${resource?._id}`}
        className="rounded-xl flex flex-col shadow-lg hover:shadow-xl cursor-pointer group transition h-full"
      >
        {/* ---------- Banner ---------- */}
        <div className="relative h-44 overflow-hidden rounded-t-xl">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${resource?.image || defaultResourceBanner
                })`,
            }}
          ></div>
        </div>

        {/* ---------- card content ---------- */}
        <div className="flex flex-col flex-1 p-4">

          {/* ---------- Title ---------- */}
          <h3
            className="text-xl text-dark font-semibold font-poppins mb-2 line-clamp-2"
            title={resource?.title}
          >
            {resource?.title}
          </h3>

          {/* ---------- Author Info section ---------- */}
          <div className="flex items-center gap-3 mb-3">

            {/* ---------- author image ---------- */}
            <img
              src={resource?.author?.userImage || defaultUser}
              alt="Author"
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* ---------- author role and department ---------- */}
            <div className="text-sm">
              <p className="font-medium text-dark">{resource?.author?.name}</p>
              <p className="text-slate-500 text-xs">
                {resource?.author?.role} | {resource?.author?.department}
              </p>
            </div>
          </div>

          {/* ---------- preview ---------- */}
          <p className="text-slate-600 text-sm flex-1">{preview}</p>

          {/* ---------- posted date ---------- */}
          <div className="mt-3 text-xs text-slate-500">{postedDate}</div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ResourceCard;