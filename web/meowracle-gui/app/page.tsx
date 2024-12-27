"use client";

import Link from "next/link";
import { useState } from "react";
import Subscribe from "./ui/subscribe";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white fixed w-full z-10 shadow-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-gray-800 font-bold text-2xl">Meowracle</div>
          <div
            className={`${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
            } transition-all duration-300 ease-in-out md:flex items-center md:space-x-6 
      fixed md:static top-0 right-0 h-screen md:h-auto w-64 md:w-auto 
      bg-white md:bg-transparent p-8 md:p-0 shadow-2xl md:shadow-none`}
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#how-it-works"
              >
                How It Works
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#why-youll-love-it"
              >
                Why You&apos;ll Love It
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#faq"
              >
                FAQ
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#subscribe"
              >
                Subscribe
              </a>
              <div className="md:hidden flex flex-col space-y-4 pt-6 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Get Started Free
                </Link>
                <a
                  href="#how-it-works"
                  className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Try It Now
            </Link>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 z-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      <header className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center text-gray-800 pt-16">
        <div className="container mx-auto px-6 py-16 text-center" id="home">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Showcase Your{" "}
            <span className=" text-blue-600">AWS Certifications</span>
            <span className="block text-gray-600">with Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning{" "}
            <span className="text-blue-600 font-semibold inline-flex items-center justify-center align-middle">
              <svg
                className="w-5 h-5 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-1.122-2.5-2.5-2.5s-2.5 1.122-2.5 2.5v5.5h-3v-10h3v1.268c.878-.878 2.122-1.268 3.5-1.268 2.481 0 4.5 2.019 4.5 4.5v5.5z" />
              </svg>
              LinkedIn
            </span>{" "}
            cover images to showcase your AWS certifications. Turn your
            achievements into shareable highlights{" "}
            <span className="font-bold text-green-600">in seconds</span>.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-center"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
            >
              Learn More
            </a>
          </div>
          <div className="mt-12 px-4 sm:px-6 lg:px-8">
            <div className="relative p-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 max-w-2xl mx-auto">
              <video
                width={800}
                height={400}
                autoPlay
                loop
                muted
                className="rounded-lg shadow-xl mx-auto w-full object-cover"
              >
                <source
                  src="https://videocdn.cdnpk.net/videos/48264b9c-b179-507e-be6d-3142ce612ef8/horizontal/previews/clear/large.mp4?token=exp=1735308663~hmac=f8109c7e989ac3472d2213df73ef836ee03ed16a756e86d8863d447e79f85410"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-50 py-16" id="how-it-works">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-lg">
                  1
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">
                    Choose Your Template
                  </h3>
                  <p className="text-gray-600">
                    Select a pre-designed template to get started. Our diverse
                    collection includes templates for all AWS certifications,
                    ensuring your achievements stand out.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-lg">
                  2
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h3 className="text-2xl font-bold mb-2">Customize Design</h3>
                  <p className="text-gray-600">
                    Drag and drop your AWS badges onto the template.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-lg">
                  3
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Download</h3>
                  <p className="text-gray-600">
                    Save your creation in your preferred format. Ready to upload
                    it as your cover image to LinkedIn or share it with your
                    network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16" id="why-youll-love-it">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Why You&apos;ll Love It</h2>
          <p className="text-gray-700 mb-8">
            Our tool simplifies the entire design process. Jump right in!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg p-6 bg-gray-50">
              <h3 className="font-semibold text-xl mb-2">Quick Setup</h3>
              <p>
                Create your cover in just a few clicks and share it instantly.
              </p>
            </div>
            <div className="rounded-lg p-6 bg-gray-50">
              <h3 className="font-semibold text-xl mb-2">High Quality</h3>
              <p>
                Always get beautiful results in any size or format you need.
              </p>
            </div>
            <div className="rounded-lg p-6 bg-gray-50">
              <h3 className="font-semibold text-xl mb-2">Always Free</h3>
              <p>
                Go ahead and unleash your creativity without spending a dime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <Link
            href="/dashboard"
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            Try It Now
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16" id="faq">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                What export formats are supported?
              </h3>
              <p className="text-gray-600">
                Currently, we only support downloading in JPEG image format.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                What is the export resolution?
              </h3>
              <p className="text-gray-600">
                The resolution of the exported image is 4752×1188 pixels.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                Which AWS Badge can I showcase?
              </h3>
              <p className="text-gray-600">
                You can showcase up to 12 AWS supported badges because they are
                part of the certification exam program. These include:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2 mt-2">
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Cloud Practitioner
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified AI Practitioner
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Solutions Architect – Associate
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Developer – Associate
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Data Engineer – Associate
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified SysOps Administrator – Associate
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Machine Learning Engineer – Associate
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Solutions Architect – Professional
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified DevOps Engineer – Professional
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Machine Learning – Specialty
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Advanced Networking – Specialty
                </li>
                <li className="hover:text-gray-900 transition-colors">
                  AWS Certified Security – Specialty
                </li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                What can I do with my designs?
              </h3>
              <p className="text-gray-600">
                You can download your designs then upload them to LinkedIn as a
                cover image.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Subscribe />

      <footer className="bg-gray-50 text-gray-600 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-800 font-bold text-xl mb-4">
                Meowracle
              </h3>
              <p className="text-sm">Create beautiful cover images with ease</p>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Go to top
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-gray-900 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-gray-900 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a
                    href="#subscribe"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Subscribe for Letters
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/Meowracle_"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-gray-900 transition-colors"
                >
                  Twitter
                </Link>
                <Link
                  href="https://github.com/weebNeedWeed"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-gray-900 transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/meowracle/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2024 meowracle.live. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
