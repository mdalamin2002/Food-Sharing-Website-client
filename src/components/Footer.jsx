import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // TODO: send email to newsletter endpoint or service
    // e.g., axios.post("/newsletter", { email })
    e.target.reset();
     // replace with toast if using react-hot-toast
    Swal.fire("Thanks for subscribing!");
  };

  return (
    <footer className="mt-24 bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white">
      {/* Top CTA band */}
      {/* <div className="w-11/12 mx-auto py-10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
          অতিরিক্ত খাবার আছে? <span className="text-orange-300">শেয়ার করুন</span> & জীবন বাঁচান! 🍲
        </h3>
        <Link
          to="/add-food"
          className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition font-semibold shadow-lg"
        >
          Donate Food
        </Link>
      </div>

      <hr className="border-green-600/40" /> */}

      {/* Main Footer Grid */}
      <div className="w-11/12 mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold">Food Sharing</h2>
          <p className="mt-3 text-green-100 max-w-xs leading-relaxed">
            Reduce food waste. Feed the community. One meal at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Quick Links</h6>
          <ul className="space-y-2 text-green-100">
            <li><Link to="/" className="hover:text-orange-300 transition">Home</Link></li>
            <li><Link to="/available-foods" className="hover:text-orange-300 transition">Available Foods</Link></li>
            <li><Link to="/add-food" className="hover:text-orange-300 transition">Add Food</Link></li>
            <li><Link to="/my-foods" className="hover:text-orange-300 transition">My Foods</Link></li>
            <li><Link to="/my-requests" className="hover:text-orange-300 transition">My Requests</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Contact</h6>
          <ul className="space-y-2 text-green-100">
            <li>Email: support@foodshare.com {/* TODO */}</li>
            <li>Phone: +880 1234 567890 {/* TODO */}</li>
            <li>Dhaka, Bangladesh</li>
          </ul>

          {/* Social */}
          <div className="mt-4 flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/hafezmohammedalamin1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-300 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/md-al-amin-2aa06922a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-orange-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/mdalamin2002"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-orange-300 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Stay Updated</h6>
          <p className="text-green-100 mb-4">Get updates about community drives & food pickup events.</p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition font-semibold shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-green-950/60 py-4 text-center text-sm text-green-300">
        © {year} Food Sharing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
