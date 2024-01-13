import React from "react";
import Navbar from "../components/Navbar";

const ServicesPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="bg-white text-gray-600 p-6">
        <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>
        <p className="text-lg mb-4">
          Welcome to our community discussion platform. By accessing or
          utilizing our platform, you consent to adhere to the following terms
          and conditions:
        </p>
        <h2 className="text-2xl font-semibold mb-2">Content</h2>
        <p className="text-lg mb-4">
          You bear sole responsibility for any content that you post or upload
          on the platform. Posting content that is Not Safe For Work (NSFW)
          without appropriate tagging is a violation of our rules.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Conduct</h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="text-lg mb-2">
            Do not post or transmit any content that is unlawful, threatening,
            abusive, defamatory, vulgar, obscene, or otherwise objectionable.
          </li>
          <li className="text-lg mb-2">
            Do not impersonate any person or entity or falsely state or
            otherwise misrepresent your affiliation with a person or entity.
          </li>
          <li className="text-lg mb-2">
            Do not engage in any activity that could potentially harm, disable,
            or overburden our servers or networks.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Termination</h2>
        <p className="text-lg mb-4">
          We reserve the right to terminate or suspend your access to the
          platform at any time without prior notice for any reason, including,
          but not limited to, a breach of these terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Changes to these terms</h2>
        <p className="text-lg mb-4">
          We may revise these terms and conditions at any time without prior
          notice. By continuing to use the platform after any changes, you agree
          to be bound by the revised terms and conditions.
        </p>
        <p className="text-lg">
          If you have any queries, please do not hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;
