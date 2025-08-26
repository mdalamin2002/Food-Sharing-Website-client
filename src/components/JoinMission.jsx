import React from "react";
import { Link } from "react-router";

const JoinMission = () => {
  return (
    <section className="bg-green-600 text-white py-16 px-4 rounded-xl mx-4 md:mx-10 my-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Mission</h2>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        Become a part of a movement that nourishes communities and protects our planet.
        <br />
        Sign up today to start sharing and caring.
      </p>
      <Link to={'/registration'} className="bg-white text-green-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition">
        Get Started for Free
      </Link>
    </section>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default JoinMission;