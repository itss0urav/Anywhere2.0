import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center ">
        <div className="text-lg text-gray-600 text-center mt-6 w-3/4">
          <div className="text-4xl font-bold tracking-widest font-roboto">Anywhere</div>
          Anywhere is a web application designed to foster a sense of community
          and encourage meaningful discussions among its users. With its
          user-friendly interface, Anywhere provides a platform for individuals
          to come together and engage in a range of conversations.
        </div>
      </div>
      
    </div>
  );
};

export default AboutPage;
