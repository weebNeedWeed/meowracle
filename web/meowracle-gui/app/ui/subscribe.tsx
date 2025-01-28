"use client";

import { useState } from "react";
import { useSubscribeForLetters } from "../lib/api/subscriptions";
import { motion } from "motion/react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { mutate: subscribe } = useSubscribeForLetters();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }

    setSubscribed(true);
    subscribe(email);
  };

  return (
    <section id="subscribe" className="py-24 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1BE4C9]/5 to-transparent opacity-30" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#F5F5F6]">Stay Updated with </span>
            <span className="bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] bg-clip-text text-transparent">
              New Features
            </span>
          </h2>
          <p className="text-[#5E5E6C] text-lg mb-8">
            Subscribe to our newsletter for the latest updates and features
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-lg bg-[#27272F] border border-[#575761] focus:border-[#1BE4C9] focus:outline-none text-[#F5F5F6] placeholder-[#5E5E6C]"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] text-[#16161D] font-semibold rounded-lg shadow-lg hover:shadow-[#1BE4C9]/20 transition-all duration-200"
            >
              Subscribe
            </motion.button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#1BE4C9] mt-4"
            >
              Thank you for subscribing!
            </motion.p>
          )}
          {!subscribed &&
            email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 mt-4"
              >
                Invalid email address.
              </motion.p>
            )}
        </motion.div>
      </div>
    </section>
  );
}
