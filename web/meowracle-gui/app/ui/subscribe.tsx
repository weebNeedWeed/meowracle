"use client";

import { useState } from "react";
import { useSubscribeForLetters } from "../lib/api/subscriptions";

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
    <section className="bg-white py-16" id="subscribe">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Subscribe to Receive Letters
        </h2>
        <p className="text-gray-700 mb-8">
          Stay updated with our latest news and offers. Subscribe to our
          newsletter.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-8 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
        {subscribed && (
          <p className="text-green-600 mt-4">Thank you for subscribing!</p>
        )}
        {!subscribed && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
          <p className="text-red-600 mt-4">Invalid email address.</p>
        )}
      </div>
    </section>
  );
}
