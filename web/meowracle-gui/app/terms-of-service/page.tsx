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
          Terms of Service
        </h1>
        <div className="text-center text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600 mb-4">
            Welcome to Meowracle! These terms and conditions outline the rules
            and regulations for the use of Meowracle&apos;s Website.
          </p>
          <p className="text-gray-600 mb-4">
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Meowracle if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p className="text-gray-600 mb-4">
            We employ the use of cookies. By accessing Meowracle, you agreed to
            use cookies in agreement with the Meowracle&apos;s Privacy Policy.
          </p>
          <h2 className="text-2xl font-semibold mb-2">License</h2>
          <p className="text-gray-600 mb-4">
            Unless otherwise stated, Meowracle and/or its licensors own the
            intellectual property rights for all material on Meowracle. All
            intellectual property rights are reserved. You may access this from
            Meowracle for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
          <h2 className="text-2xl font-semibold mb-2">You must not:</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
            <li>Republish material from Meowracle</li>
            <li>Sell, rent or sub-license material from Meowracle</li>
            <li>Reproduce, duplicate or copy material from Meowracle</li>
            <li>Redistribute content from Meowracle</li>
          </ul>
          <p className="text-gray-600 mb-4">
            This Agreement shall begin on the date hereof.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Hyperlinking to our Content
          </h2>
          <p className="text-gray-600 mb-4">
            The following organizations may link to our Website without prior
            written approval:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors may link to our Website in the same
              manner as they hyperlink to the Websites of other listed
              businesses; and
            </li>
            <li>
              System wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </li>
          </ul>
          <p className="text-gray-600 mb-4">
            These organizations may link to our home page, to publications or to
            other Website information so long as the link: (a) is not in any way
            deceptive; (b) does not falsely imply sponsorship, endorsement or
            approval of the linking party and its products and/or services; and
            (c) fits within the context of the linking party&apos;s site.
          </p>

          <h2 className="text-2xl font-semibold mb-2">iFrames</h2>
          <p className="text-gray-600 mb-4">
            Without prior approval and written permission, you may not create
            frames around our Webpages that alter in any way the visual
            presentation or appearance of our Website.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Content Liability</h2>
          <p className="text-gray-600 mb-4">
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Your Privacy</h2>
          <p className="text-gray-600 mb-4">Please read Privacy Policy</p>
          <h2 className="text-2xl font-semibold mb-2">Reservation of Rights</h2>
          <p className="text-gray-600 mb-4">
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amend these terms and conditions and its linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Removal of links from our website
          </h2>
          <p className="text-gray-600 mb-4">
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us any moment. We will
            consider requests to remove links but we are not obligated to or so
            or to respond to you directly.
          </p>
          <p className="text-gray-600 mb-4">
            We do not ensure that the information on this website is correct, we
            do not warrant its completeness or accuracy; nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
          <p className="text-gray-600 mb-4">
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
            <li>
              limit or exclude our or your liability for death or personal
              injury;
            </li>
            <li>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </li>
            <li>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
            </li>
            <li>
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </li>
          </ul>
          <p className="text-gray-600 mb-4">
            The limitations and prohibitions of liability set in this Section
            and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer, including liabilities arising in contract, in tort and
            for breach of statutory duty.
          </p>
          <p className="text-gray-600 mb-4">
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </p>
        </div>
      </div>
    </div>
  );
}
