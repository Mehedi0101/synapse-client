import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";
import WelcomeText from "../../components/auth_layout/WelcomeText";
import ButtonWide from "../../components/shared/buttons/ButtonWide";

const Register = () => {
  
  // ---------- data from auth provider ----------
  const { createUser, setUser } = useContext(AuthContext);

  // ---------- role(admin,student) state ----------
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  // ---------- error states ----------
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);



  const handleSubmit = (e) => {
    e.preventDefault();

    // ---------- error states reset ----------
    setPasswordError(null);
    setConfirmPasswordError(null);

    // ---------- form data ----------
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;


    // ---------- password length error ----------
    if (password.length < 8) {
      setPasswordError("Password should be at least 8 character");
      return;
    }

    // ---------- password pattern error ----------
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("Password should contain at least one uppercase[A-Z], one lower case[a-z], one digit[0-9], and a special symbol");
      return;
    }


    // ---------- password confirmation error ----------
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    }

    // ---------- loading toast ----------
    const toastId = toast.loading('Creating account...');

    // ---------- register function ----------
    createUser(email, password)
      .then(() => {
        navigate('/');
        // ---------- success toast ----------
        toast.success('Signed up successfully', { id: toastId });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          // ---------- error toast ----------
          toast.error('Email is already in use', { id: toastId });
          return;
        }
        setUser(null);
      })

  };

  return (
    <>
      <WelcomeText></WelcomeText>

      <div className="flex items-center justify-center px-4 text-sm md:text-base">
        <div className="w-full max-w-md">
          <div className="bg-[#ffffffe3] rounded-2xl shadow-xl p-8">

            {/*---------- Form ----------*/}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/*---------- Full Name ----------*/}
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

              {/*---------- Email ----------*/}
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

              {/*---------- Password ----------*/}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Password"
                />

                {/*---------- password error display ----------*/}
                {passwordError &&
                  <p className="text-red-600 text-xs sm:text-sm">
                    <CiWarning className="text-sm sm:text-base inline mr-1" />
                    <span>
                      {passwordError}
                    </span>
                  </p>}
              </div>

              {/*---------- Confirm Password ----------*/}
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                  placeholder="Confirm Password"
                />

                {/*---------- confirm password error display ----------*/}
                {confirmPasswordError &&
                  <p className="text-red-600 text-xs sm:text-sm">
                    <CiWarning className="text-sm sm:text-base inline mr-1" />
                    <span>
                      {confirmPasswordError}
                    </span>
                  </p>}
              </div>

              {/*---------- Role ----------*/}
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

              {/*---------- Student Fields ----------*/}
              {role === "student" && (
                <div className="space-y-5">

                  {/*---------- student id ----------*/}
                  <div>
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Student ID"
                    />
                  </div>

                  {/*---------- department ----------*/}
                  <div>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Department"
                    />
                  </div>

                  {/*---------- semester ----------*/}
                  <div>
                    <input
                      id="semester"
                      name="semester"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Current Year / Semester"
                    />
                  </div>

                  {/*---------- expected graduation year ----------*/}
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

              {/*---------- Alumni Fields ----------*/}
              {role === "alumni" && (
                <div className="space-y-5">

                  {/*---------- department ----------*/}
                  <div>
                    <input
                      id="alumniDepartment"
                      name="alumniDepartment"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Department"
                    />
                  </div>

                  {/*---------- graduation year ----------*/}
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

                  {/*---------- job title ----------*/}
                  <div>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Current Job Title"
                    />
                  </div>

                  {/*---------- company ----------*/}
                  <div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Current Company / Organization"
                    />
                  </div>

                  {/*---------- linkedIn profile link ----------*/}
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

              {/*---------- Register button ----------*/}
              <ButtonWide text="Create your account"></ButtonWide>
            </form>

            {/*---------- divider ----------*/}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-gray-400" />
              <span className="px-3 text-xs uppercase tracking-wide text-gray-600">or</span>
              <div className="h-px flex-1 bg-gray-400" />
            </div>

            {/*---------- Login link ----------*/}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/auth/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
