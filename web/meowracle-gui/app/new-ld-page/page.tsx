"use client";

import { useState } from "react";

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
                href="#"
              >
                Home
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#"
              >
                How It Works
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#"
              >
                Why You'll Love It
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
                href="#"
              >
                FAQ
              </a>
              <div className="md:hidden flex flex-col space-y-4 pt-6 border-t border-gray-200">
                <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Get Started Free
                </button>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              Try It Now
            </button>
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
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Showcase Your AWS Certifications
            <span className="block text-gray-600">with Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning social media cover images to showcase your AWS
            certifications. Turn your achievements into shareable highlights in
            seconds.
          </p>
          <div className="space-x-4">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              Get Started Free
            </button>
            <button className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Learn More
            </button>
          </div>
          <div className="mt-12 px-4 sm:px-6 lg:px-8">
            <img
              src="https://picsum.photos/800/400"
              alt="Example cover"
              className="rounded-lg shadow-lg mx-auto w-full max-w-2xl object-cover"
            />
          </div>
        </div>
      </header>

      <section className="bg-white py-16">
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-lg">
                  1
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Upload Your Image</h3>
                  <p className="text-gray-600">
                    Select or drag and drop your base image to get started. We
                    support all major image formats for your convenience.
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
                    Add text, adjust colors, and apply effects to your image.
                    Our intuitive editor makes it easy to create professional
                    designs.
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
                    Save your creation in your preferred format. Share directly
                    to social media or download for later use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
            Try It Now
          </button>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                What file formats are supported?
              </h3>
              <p className="text-gray-600">
                We support all major image formats including JPG, PNG, WebP, and
                TIFF.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                Is there a file size limit?
              </h3>
              <p className="text-gray-600">
                Yes, you can upload files up to 10MB in size for free accounts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                Can I use custom fonts?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upload your own fonts or choose from our
                library of 1000+ fonts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                How do I share my designs?
              </h3>
              <p className="text-gray-600">
                You can download your designs or share them directly via a link
                or social media.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  GitHub
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2024 Meowracle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
