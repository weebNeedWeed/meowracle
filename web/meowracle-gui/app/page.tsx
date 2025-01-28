"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Subscribe from "./ui/subscribe";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "How It Works", href: "#how" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Subscribe", href: "#subscribe" },
  ];

  const testimonials = [
    {
      name: "John Nguyen",
      role: "Data Engineer & Cloud Architect",
      text: "Meowracle transformed how I showcase my AWS certifications. The generated cover images helped me land three interview calls in a week!",
      avatar: "/huyvu.jpg",
    },
    {
      name: "Huy Vu",
      role: "Data Engineer",
      text: "I love the simplicity and ease of use of Meowracle. It's a great tool to make your LinkedIn profile stand out and get noticed by recruiters.",
      avatar: "/lamha.avif",
    },
  ];

  const steps = [
    {
      title: "Choose Template",
      description:
        "Select a template that best fits your style and the number of certifications you want to showcase",
    },
    {
      title: "Customize Design",
      description:
        "Personalize the cover image with your achievements, certification bagdes, and more",
    },
    {
      title: "Download Image",
      description:
        "Download the high-resolution image and upload it to your LinkedIn profile",
    },
  ];

  return (
    <div className="min-h-screen bg-[#16161D] text-[#F5F5F6]">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#27272F]/95 backdrop-blur-sm border-b border-[#5E5E6C]/30 shadow-2xl shadow-[#1BE4C9]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with hover animation */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] rounded-lg flex items-center justify-center"
              >
                <span className="text-[#16161D] text-xl font-bold">M</span>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] bg-clip-text text-transparent group-hover:from-[#23f7d9] group-hover:to-[#1BE4C9] transition-all duration-300">
                MEOWRACLE
              </span>
            </Link>

            {/* Desktop Navigation with animated indicators */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-[#F5F5F6] hover:text-[#1BE4C9] transition-colors duration-200 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1BE4C9]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <div className="absolute inset-0 bg-[#1BE4C9]/10 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200" />
                </a>
              ))}
              <Link href="/app">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] text-[#16161D] font-semibold rounded-lg shadow-lg hover:shadow-[#1BE4C9]/20 transition-all duration-200"
                >
                  Get Started
                </motion.div>
              </Link>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg text-[#F5F5F6] hover:bg-[#1BE4C9]/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
            </motion.button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[#5E5E6C]/30"
            >
              <div className="px-4 pt-4 pb-6 bg-[#27272F]/95 backdrop-blur-sm">
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-[#F5F5F6] hover:bg-[#1BE4C9]/10 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link
                    href="/app"
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] text-[#16161D] font-semibold rounded-lg shadow-lg hover:shadow-[#1BE4C9]/20 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1BE4C9]/10 to-transparent opacity-30" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
                <span className="text-[#F5F5F6]">Make Your </span>
                <span className="relative inline-block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] bg-clip-text text-transparent"
                  >
                    AWS Certs
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  />
                </span>
                <br />
                <span className="text-[#F5F5F6]">Stand Out</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-[#5E5E6C] text-base sm:text-lg mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Transform your AWS certification badges into eye-catching
                LinkedIn cover images. Get noticed by recruiters and peers with
                professional designs in minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/app"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] text-[#16161D] px-6 sm:px-8 py-3 rounded-lg font-bold text-lg shadow-lg shadow-[#1BE4C9]/20 hover:shadow-xl hover:shadow-[#1BE4C9]/30 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  href="#how"
                  className="w-full sm:w-auto border-2 border-[#1BE4C9] text-[#1BE4C9] px-6 sm:px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#1BE4C9]/10 transition-colors duration-300"
                >
                  Usage
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#1BE4C9]/50 shadow-2xl shadow-[#1BE4C9]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1BE4C9]/20 via-transparent to-[#23f7d9]/20" />
                <div className="aspect-video bg-[#27272F]">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    loop
                  >
                    <source src="/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Floating badges decoration - Hidden on mobile */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="hidden lg:block absolute -top-8 -right-8 w-24 h-24 bg-[#27272F] rounded-xl border-2 border-[#1BE4C9]/30 shadow-lg"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="hidden lg:block absolute -bottom-8 -left-8 w-20 h-20 bg-[#27272F] rounded-xl border-2 border-[#1BE4C9]/30 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-[#27272F] relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[#1BE4C9]/5 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1BE4C9]/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F6] mb-4">
              How It Works
            </h2>
            <p className="text-[#5E5E6C] text-lg max-w-2xl mx-auto">
              Transform your AWS certifications into stunning visuals in three
              simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group h-full"
              >
                <div className="p-8 rounded-2xl bg-[#16161D] border border-[#575761] hover:border-[#1BE4C9] transition-all duration-300 shadow-lg hover:shadow-[#1BE4C9]/20 relative overflow-hidden h-full flex flex-col">
                  {/* Step number with gradient background */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-[#1BE4C9]/20 to-[#23f7d9]/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-300" />

                  <div className="relative flex flex-col flex-grow">
                    <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] text-[#16161D] flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#1BE4C9]/20 group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-[#F5F5F6] group-hover:text-[#1BE4C9] transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-[#5E5E6C] text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1BE4C9]/5 to-transparent opacity-30" />
        <div className="absolute inset-0 bg-[#1BE4C9]/5 bg-grid-pattern opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] bg-clip-text text-transparent">
                Trusted
              </span>{" "}
              <span className="text-[#F5F5F6]">by Professionals</span>
            </h2>
            <p className="text-[#5E5E6C] text-lg max-w-2xl mx-auto">
              See what others are saying about their experience with Meowracle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-[#27272F] border border-[#575761] hover:border-[#1BE4C9] transition-all duration-300 shadow-lg hover:shadow-[#1BE4C9]/20 relative overflow-hidden">
                  {/* Decorative quote mark */}
                  <div className="absolute -top-4 -left-4 text-9xl font-serif text-[#1BE4C9]/5 select-none group-hover:text-[#1BE4C9]/10 transition-colors duration-300">
                    &quot;
                  </div>

                  {/* Gradient background effect */}
                  <div className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-br from-[#1BE4C9]/5 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    <p className="text-[#5E5E6C] text-lg mb-6 leading-relaxed">
                      &quot;{testimonial.text}&quot;
                    </p>

                    <div className="flex items-center">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-[#1BE4C9]">
                        <Image
                          src={testimonial.avatar}
                          alt={`${testimonial.name}'s avatar`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-[#F5F5F6] group-hover:text-[#1BE4C9] transition-colors duration-300">
                          {testimonial.name}
                        </p>
                        <p className="text-[#5E5E6C] text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <Subscribe />

      {/* Footer */}
      <footer className="bg-[#27272F] border-t border-[#5E5E6C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] rounded-lg flex items-center justify-center">
                <span className="text-[#16161D] text-xl font-bold">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#1BE4C9] to-[#23f7d9] bg-clip-text text-transparent">
                MEOWRACLE
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="https://x.com/Meowracle_"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#5E5E6C] hover:text-[#1BE4C9] transition-colors duration-200"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/weebNeedWeed"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#5E5E6C] hover:text-[#1BE4C9] transition-colors duration-200"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/meowracle/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[#5E5E6C] hover:text-[#1BE4C9] transition-colors duration-200"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#5E5E6C]/30 text-center text-[#5E5E6C] text-sm">
            © {new Date().getFullYear()} Meowracle. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
