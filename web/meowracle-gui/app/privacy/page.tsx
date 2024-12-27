import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="container mx-auto px-6 py-16">
        <Link
          href={"/"}
          className="absolute top-4 left-4 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Privacy Policy
        </h1>
        <div className="text-center text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600 mb-4">
            At Meowracle, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect only basic usage analytics to improve our service. This
            may include IP addresses, browser type, pages visited, and other
            similar data. No personal information is stored.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            Usage data helps us understand how users interact with our service
            to make improvements.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement industry-standard security measures to protect any
            information collected.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
          <p className="text-gray-600 mb-4">
            We do not share any information with third parties.
          </p>
          <h2 className="text-2xl font-semibold mb-2">User Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to access, correct, or delete your data. Please
            contact us if you wish to exercise these rights.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p className="text-gray-600 mb-4">
            We use cookies to enhance your experience on our website. You can
            control cookie settings through your browser.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Policy Updates</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions about this Privacy Policy, please contact us
            at giaule.work@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}
