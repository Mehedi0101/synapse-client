import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";
import WelcomeText from "../../components/auth_layout/WelcomeText";
import ButtonWide from "../../components/shared/buttons/ButtonWide";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Register = () => {

  // ---------- data from auth provider ----------
  const { createUser, setUser, refetchUserDetails } = useContext(AuthContext);

  // ---------- role(admin,student) state ----------
  const [role, setRole] = useState("");

  // ---------- password show or hide toggling state ----------
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const department = form.department.value;
    const role = form.role.value;
    const studentId = form?.studentId?.value;
    const semester = form?.semester?.value;
    const session = form?.session?.value;
    const graduationYear = form?.graduationYear?.value;
    const jobTitle = form?.jobTitle?.value;
    const company = form?.company?.value;

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
        let userData;
        form.role.value === "Student" ? userData = { name, email, role, department, studentId, semester, session } : userData = { name, email, role, department, graduationYear, jobTitle, company };

        axios.post("http://localhost:5000/users", userData)
          .then((data) => {
            if (data?.data?.acknowledged) {
              // ---------- success toast ----------
              toast.success('Registered successfully', { id: toastId });

              // ---------- go to homepage ----------
              navigate('/');

              refetchUserDetails();
            }
            else {
              // ---------- error toast ----------
              toast.error('Something went wrong', { id: toastId });
            }
          })
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
    <motion.div

      // ---------- card animation configuration ----------
      initial={{ x: "100vw", opacity: 0 }}    // start off-screen to the right
      animate={{ x: 0, opacity: 1 }}      // move to center
      exit={{ x: 200, opacity: 0 }}       // optional exit animation
      transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
    >
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
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                    placeholder="Password"
                  />

                  {/*---------- Password show or hide toggle button ----------*/}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                  >
                    {showPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                  </button>
                </div>

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
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none pr-10"
                    placeholder="Password"
                  />

                  {/*----------Confirm password show or hide toggle button ----------*/}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary cursor-pointer"
                  >
                    {showConfirmPassword ? <IoEyeOffOutline className="text-lg md:text-xl" /> : <IoEyeOutline className="text-lg md:text-xl" />}
                  </button>
                </div>

                {/*---------- confirm password error display ----------*/}
                {confirmPasswordError &&
                  <p className="text-red-600 text-xs sm:text-sm">
                    <CiWarning className="text-sm sm:text-base inline mr-1" />
                    <span>
                      {confirmPasswordError}
                    </span>
                  </p>}
              </div>

              {/*---------- department ----------*/}
              <div>
                <select
                  id="department"
                  name="department"
                  required
                  defaultValue=""
                  className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none bg-transparent"
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Economics">Economics</option>
                  <option value="English">English</option>
                  <option value="Management">Management</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance and Banking">Finance and Banking</option>
                </select>
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
                  <option value="" disabled>Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>

              {/*---------- Student Fields ----------*/}
              {role === "Student" && (
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

                  {/*---------- semester ----------*/}
                  <div>
                    <select
                      id="semester"
                      name="semester"
                      required
                      defaultValue=""
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none bg-transparent"
                    >
                      <option value="" disabled>
                        Select Current Semester
                      </option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                      <option value="5th">5th</option>
                      <option value="6th">6th</option>
                      <option value="7th">7th</option>
                      <option value="8th">8th</option>
                    </select>
                  </div>

                  {/*---------- session ----------*/}
                  <div>
                    <select
                      id="session"
                      name="session"
                      required
                      defaultValue=""
                      className="mt-1 w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none bg-transparent"
                    >
                      <option value="" disabled>
                        Select Session
                      </option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
                      <option value="2022-23">2022-23</option>
                      <option value="2021-22">2021-22</option>
                      <option value="2020-21">2020-21</option>
                      <option value="2019-20">2019-20</option>
                      <option value="2018-19">2018-19</option>
                      <option value="2017-18">2017-18</option>
                    </select>
                  </div>
                </div>
              )}

              {/*---------- Alumni Fields ----------*/}
              {role === "Alumni" && (
                <div className="space-y-5">

                  {/*---------- graduation year ----------*/}
                  <div>
                    <input
                      id="graduationYear"
                      name="graduationYear"
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
    </motion.div>
  );
};

export default Register;
