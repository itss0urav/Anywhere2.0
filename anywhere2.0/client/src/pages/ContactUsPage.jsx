import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TawkTo from "../config/tawkto";
const ContactUsPage = () => {
  const navigate = useNavigate();

  TawkTo();

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
          <h1 className="font-bold text-2xl mb-2 text-gray-700">Contact Us</h1>
          <p className="mb-4 text-gray-600">
            We'd love to hear from you! Send us a message and we'll respond as
            soon as possible.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/Help")}
          >
            Go to Help
          </button>
        </div>
      </div>
      <div className=" min-h-screen">
        <div className="bg-white text-gray-600 p-6">
          <div className="text-center">
            <img
              src="https://media.discordapp.net/attachments/979241917852303370/1112399216027906139/Vanilla-1s-285px_1.gif?width=356&height=177"
              alt="Profile"
              className="mx-auto"
            />
            <h1 className="text-3xl font-semibold mb-4 font-roboto">
              Sourav, Full Stack Web Developer
            </h1>
            <p className="text-lg mb-4">
              A passionate web developer from Kerala, India, currently mastering
              the MERN Stack.
            </p>
            <p className="text-lg mb-4">
              I am enthusiastic about developing dynamic and interactive web
              applications. I love exploring new technologies and constantly
              learning to enhance my skills.
            </p>
            <p className="text-lg mb-4">
              I'm actively seeking new opportunities and connections in the web
              development industry. Feel free to connect with me. Check out my
              projects on GitHub.
            </p>
            <div className="flex justify-center gap-4">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                alt="HTML5"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                alt="CSS3"
                width="40"
                height="40"
              />
              <img
                src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
                alt="Tailwind CSS"
                width="40"
                height="40"
              />
              <img
                src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg"
                alt="Git"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                alt="JavaScript"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg"
                alt="MongoDB"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg"
                alt="Express.js"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg"
                alt="React"
                width="40"
                height="40"
              />
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
                alt="Node.js"
                width="40"
                height="40"
              />
              <img
                src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
                alt="Firebase"
                width="40"
                height="40"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png"
                alt="ChatGPT"
                width="40"
                height="40"
              />
            </div>

            <h2 className="text-2xl font-semibold my-2">
              Familiar Adobe Software:
            </h2>
            <div className="flex justify-center space-x-4 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1024px-Adobe_Premiere_Pro_CC_icon.svg.png"
                alt="Adobe Premiere Pro"
                width="40"
                height="40"
              />
              <img
                src="https://www.adobe.com/content/dam/shared/images/product-icons/svg/photoshop.svg"
                alt="Adobe Photoshop"
                width="40"
                height="40"
              />
              <img
                src="https://www.adobe.com/content/dam/cc/us/en/products/ccoverview/ae_cc_app_RGB.svg"
                alt="Adobe After Effects"
                width="40"
                height="40"
              />
            </div>
            <p className="text-lg mb-4">
              Let's build amazing web experiences together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
