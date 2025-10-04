import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/default_user.jpg";
import TableSkeleton from "../../components/skeletons/TableSkeleton";

const AdminResources = () => {
  // ---------- search text ----------
  const [searchText, setSearchText] = useState("");

  // ---------- fetch all resources ----------
  const { data: resources = [],
    refetch: refetchResources,
    isPending,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/resources");
      return res.data;
    },
  });

  // ---------- delete resource ----------
  const handleDeleteResource = (resourceId) => {

    // ---------- confirmation alert ----------
    Swal.fire({
      html: `
        <h2 style="color:#0F172A; font-family:Poppins, sans-serif; font-size:22px; font-weight: bold;">Remove this resource?</h2>
        <p style="color:#334155; font-family:Open Sans, sans-serif; font-size:16px; margin-top:8px;">This resource will no longer be visible to others on this platform.</p>
      `,
      confirmButtonText: "Yes",
      showCancelButton: true,
      confirmButtonColor: "#6f16d7",
      cancelButtonColor: "#d33",
    }).then((result) => {

      // ---------- if confirmed ----------
      if (result.isConfirmed) {
        const toastId = toast.loading("Removing Resource...");
        axios
          .delete(`http://localhost:5000/resources/${resourceId}`)
          .then((data) => {
            if (data.data?.acknowledged) {
              toast.success("Removed", { id: toastId });
              refetchResources();
            } else {
              toast.error("Something went wrong", { id: toastId });
            }
          })
          .catch(() => {
            toast.error("Something went wrong", { id: toastId });
          });
      }
    });
  };

  // ---------- filter resources ----------
  const filteredResources =
    searchText.trim() === ""
      ? resources
      : resources.filter((res) =>
        (res?.title || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );

  return (
    <div>
      {/* ---------- Heading ---------- */}
      <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-dark">
        Manage Resources
      </h2>

      {/* ---------- Search Bar ---------- */}
      <div className="relative mb-6 max-w-md">
        <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border-b border-gray-300 shadow-sm focus:outline-none transition"
        />
      </div>

      {/* ---------- Table ---------- */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-xs md:text-sm font-poppins">
          {/* ---------- Table Head ---------- */}
          <thead className="bg-gradient-to-r from-primary to-purple-500 text-white text-sm">
            <tr>
              <th className="py-3 px-4 font-semibold">#</th>
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Author</th>
              <th className="py-3 px-4 font-semibold">Created At</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>

          {/* ---------- Table Body ---------- */}
          <tbody>
            {isPending ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-500">
                  <TableSkeleton columns={5} />
                </td>
              </tr>
            ) : filteredResources?.length > 0 ? (
              filteredResources.map((res, idx) => (
                <tr
                  key={res._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-slate-100 transition border-b-1 border-slate-300`}
                >
                  {/* ---------- Serial No ---------- */}
                  <td className="py-3 px-4">{idx + 1}</td>

                  {/* ---------- Title ---------- */}
                  <td className="py-3 px-4 max-w-[220px] truncate">
                    <Link
                      title={res?.title}
                      to={`/admin/resources/${res._id}`}
                      className="hover:underline hover:text-primary transition-all duration-200"
                    >
                      {res?.title || "N/A"}
                    </Link>
                  </td>

                  {/* ---------- Author ---------- */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">

                      {/* ---------- Author image---------- */}
                      <img
                        src={res?.author?.userImage || defaultUser}
                        alt="avatar"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="truncate max-w-[100px]">

                        {/* ---------- Author name---------- */}
                        <Link
                          title={res?.author?.name}
                          to={`/admin/users/${res?.author?._id}`}
                          className="hover:underline hover:text-primary transition-all duration-200"
                        >
                          {res?.author?.name || "N/A"}
                        </Link>
                      </span>
                    </div>
                  </td>

                  {/* ---------- Created At ---------- */}
                  <td className="py-3 px-4">
                    {res?.createdAt
                      ? format(new Date(res.createdAt), "MMMM dd, yyyy")
                      : "N/A"}
                  </td>

                  {/* ---------- Action ---------- */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteResource(res._id)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer"
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-slate-500 font-poppins"
                >
                  No resources found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResources;