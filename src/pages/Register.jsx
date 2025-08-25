import Lottie from "lottie-react";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router"; // ✅ useNavigate from react-router-dom
import Swal from "sweetalert2";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const pass = form.pass.value;

    if (!validatePassword(pass)) {
      setLoading(false);
      return;
    }

    try {
      // ✅ Create Firebase user
      const res = await createUser(email, pass);

      // ✅ Update displayName and photoURL
      await updateUser({ displayName: name, photoURL: image });

      // ✅ Sync in context
      setUser({ ...res.user, displayName: name, photoURL: image });

      // ✅ SweetAlert success
      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to Food Sharing Platform",
        icon: "success",
        confirmButtonText: "OK",
      });

      toast.success("Registration successful!");

      // ✅ Navigate to home after success
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <Toaster />
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10">
          <div className="title mt-5">
            <Title>Join with Us</Title>
          </div>

          <div className="flex justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-6 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                {/* Name */}
                <div className="flex items-center">
                  <BiUser className="text-3xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="flex items-center">
                  <BiImageAdd className="text-3xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="text"
                    name="image"
                    placeholder="Enter Image URL"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <BiEnvelope className="text-3xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="flex items-center">
                  <BiKey className="text-3xl text-slate-500 mr-2" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                    required
                  />
                </div>

                {/* Login Link */}
                <p className="text-sm text-center text-slate-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-orange-500 font-semibold">
                    Login here
                  </Link>
                </p>

                {/* Submit Button */}
                <input
                  type="submit"
                  value={loading ? "Registering..." : "Register Now"}
                  disabled={loading}
                  className="btn cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition-all"
                />
              </form>
            </div>

            {/* Social Login */}
            <Social />

            {/* Animation */}
            <div className="lottie flex-1 flex mx-20">
              <Lottie animationData={happy}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
