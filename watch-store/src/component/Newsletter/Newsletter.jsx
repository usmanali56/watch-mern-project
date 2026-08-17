import React, { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post("/newsletter", { email });
      toast.success("Thank you for subscribing!");
      setEmail(""); // input khali kar dete hain success ke baad
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
     data-aos="fade-up" className="relative w-full h-[500px] bg-fixed bg-center bg-cover flex flex-col items-center justify-center px-4 mt-20"
      style={{
        backgroundImage:
          "url('https://demo.templatesjungle.com/elegant/images/bg-newsletter.jpg')",
      }}
    >
      {/* Overlay (optional, halka dark overlay text readability ke liye) */}
      <div data-aos="fade-up" className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div data-aos="fade-up" className="relative z-10 w-full max-w-2xl text-center">
        <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-wide mb-8">
          SIGN UP FOR OUR NEWSLETTER
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Addresss"
            className="w-full px-5 py-4 text-gray-700 bg-white outline-none mb-4"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-medium tracking-wide transition-colors disabled:opacity-50"
          >
            {submitting ? "SUBSCRIBING..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
}