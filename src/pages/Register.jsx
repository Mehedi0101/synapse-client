import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

  const [role,setRole] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center px-4 text-sm md:text-base">
      <div className="w-full max-w-md">
        <div className="bg-[#ffffffe3] rounded-2xl shadow-xl p-8">
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                placeholder="Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                placeholder="Password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>

            {/* Role */}
            <div>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none bg-transparent"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>

            {/* Student Fields */}
            {role === "student" && (
              <div className="space-y-5">
                <div>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Student ID"
                  />
                </div>
                <div>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Department"
                  />
                </div>
                <div>
                  <input
                    id="semester"
                    name="semester"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Current Year / Semester"
                  />
                </div>
                <div>
                  <input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    min="2000"
                    max="2100"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Expected Graduation Year"
                  />
                </div>
              </div>
            )}

            {/* Alumni Fields */}
            {role === "alumni" && (
              <div className="space-y-5">
                <div>
                  <input
                    id="alumniDepartment"
                    name="alumniDepartment"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Department"
                  />
                </div>
                <div>
                  <input
                    id="graduationYearAlumni"
                    name="graduationYearAlumni"
                    type="number"
                    min="1980"
                    max="2100"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Graduation Year"
                  />
                </div>
                <div>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Current Job Title"
                  />
                </div>
                <div>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="Current Company / Organization"
                  />
                </div>
                <div>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    placeholder="LinkedIn Profile (optional)"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primary focus:outline-none focus:scale-95 transition-all ease-linear cursor-pointer"
            >
              Create your account
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-400" />
            <span className="px-3 text-xs uppercase tracking-wide text-gray-600">or</span>
            <div className="h-px flex-1 bg-gray-400" />
          </div>

          {/* Login link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Register;
