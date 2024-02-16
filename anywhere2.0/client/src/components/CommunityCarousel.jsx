import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const CommunityCarousel = () => {
  const [communities, setCommunities] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const response = await axios.get("/community/get");
        setCommunities(response.data);
      } catch (error) {
        console.error(`Error fetching communities: ${error}`);
      }
    };

    getCommunities();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("forward");
      setCurrentSlide((currentSlide + 1) % communities.length);
    }, 3000); // Change slide every 2 seconds

    return () => clearInterval(timer); // Clean up on component unmount
  }, [communities, currentSlide]);

  const nextSlide = () => {
    setDirection("forward");
    setCurrentSlide((currentSlide + 1) % communities.length);
  };

  const prevSlide = () => {
    setDirection("backward");
    setCurrentSlide(
      (currentSlide - 1 + communities.length) % communities.length
    );
  };

  return (
    <div className="mt-[12rem] mb-[12rem] flex items-center justify-center">
      {communities.map((community, index) => (
        <Link
          to={`/posts/community/${encodeURIComponent(community.communityName)}`}
          className={` absolute w-full transition-transform duration-1000 ease-in-out transform ${
            index === currentSlide
              ? "translate-x-0"
              : direction === "forward"
                ? "translate-x-full"
                : "-translate-x-full"
          }`}
          key={community._id}
        >
          <img
            src={community.logoUrl}
            alt={community.communityName}
            className="object-cover w-full h-64 md:h-96 "
          />
          <h2 className="absolute bottom-0 left-0 m-4 md:text-4xl text-lg  font-bold text-white bg-black  p-2 bg-opacity-30 rounded-md">
            {community.communityName}
          </h2>
        </Link>
      ))}
      <MdKeyboardArrowLeft
        className="absolute left-0 m-4 text-4xl text-white cursor-pointer   z-10"
        onClick={prevSlide}
      />
      <MdKeyboardArrowRight
        className="absolute right-0 m-4 text-4xl text-white cursor-pointer   z-10"
        onClick={nextSlide}
      />
    </div>
  );
};

export default CommunityCarousel;
