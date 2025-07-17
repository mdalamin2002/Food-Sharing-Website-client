import Lottie from "lottie-react";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ react-router-dom
import Swal from "sweetalert2";

import loginAnimation from "../assets/loginAnimation.json";
import Social from "../components/Social"; // Google / GitHub social auth buttons
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";



const Login = () => {
  const { signIn, setAuthLoading } = useContext(AuthContext); // setAuthLoading optional if you track global loading
  const location = useLocation();
  const navigate = useNavigate();

  // Where to go after login
  const from = location.state?.from?.pathname || "/";

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const pass = form.pass.value.trim();
    const remember = form.remember.checked; // optional persist strategy

    // basic validation
    if (!email || !pass) {
      toast.error("Please enter email & password.");
      return;
    }

    try {
      setSubmitting(true);
      setAuthLoading?.(true);

      const result = await signIn(email, pass); // expect Firebase userCred
      const firebaseUser = result.user;

      // get fresh ID token
      const token = await firebaseUser.getIdToken(/* forceRefresh */ true);
      localStorage.setItem("access-token", token);
      localStorage.setItem("user-email", firebaseUser.email || email);

      // if you want session vs local persistence, handle here
      if (!remember) {
        // Example: mark session-only (optional custom logic)
        sessionStorage.setItem("access-token", token);
      }

      toast.success("Logged in successfully!");

      // small delay so user sees toast (optional)
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      console.error("Login error", err);

      // Parse Firebase auth error codes
      let msg = "Login failed. Please try again.";
      const code = err?.code || err?.message || "";
      if (code.includes("auth/invalid-credential")) msg = "Invalid email or password.";
      else if (code.includes("auth/user-not-found")) msg = "No user found for this email.";
      else if (code.includes("auth/wrong-password")) msg = "Incorrect password.";
      else if (code.includes("auth/invalid-email")) msg = "Invalid email format.";

      toast.error(msg);

      // Optional SweetAlert (visual)
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: msg,
        confirmButtonColor: "#d33",
      });
    } finally {
      setSubmitting(false);
      setAuthLoading?.(false);
    }
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      {/* react-hot-toast container (can also be placed in App.jsx once) */}
      <Toaster position="top-right" />

      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-8">
            {/* Form */}
            <div className="login-form flex-1 w-full">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                {/* Email */}
                <label className="flex justify-start items-center gap-2">
                  <BiEnvelope className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="enter email"
                    required
                  />
                </label>

                {/* Password */}
                <div className="space-y-1 w-full">
                  <label className="flex justify-start items-center gap-2 w-full">
                    <BiKey className="text-3xl text-slate-500" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="enter password"
                      required
                    />
                  </label>
                  <p className="text-end text-[13px] text-slate-500">
                    forgot password?{/* implement later */}
                  </p>
                </div>

                {/* Remember Me */}
                <label className="p-1 flex gap-3 -mt-4 items-center cursor-pointer select-none">
                  <input type="checkbox" name="remember" className="checkbox checkbox-sm" />
                  <span>Remember Me</span>
                </label>

                {/* Submit */}
                <input
                  type="submit"
                  value={submitting ? "Logging in..." : "Login Now"}
                  disabled={submitting}
                  className={`btn cursor-pointer ${submitting ? "btn-disabled" : ""}`}
                />

                {/* Register link */}
                <p className="text-center text-sm text-slate-600">
                  New here? <Link to="/registration" className="text-orange-500 underline">Register</Link>
                </p>
              </form>
            </div>

            {/* Social Login Section */}
            <Social />

            {/* Lottie */}
            <div className="lottie flex-1 mx-20 max-w-md hidden md:block">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
