import React from "react";
import { pinData } from "../context/pinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Masonry from "react-masonry-css";

const Home = () => {
  const { pins, loading } = pinData();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto"
                columnClassName="bg-clip-padding m-2"
              >
                {pins && pins.length > 0 ? (
                  pins.map((e, i) => <PinCard key={i} pin={e} />)
                ) : (
                  <div className="col-span-full flex items-center justify-center h-32 text-gray-500">
                    <p>No Pins Yet</p>
                  </div>
                )}
              </Masonry>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-white text-gray-800 py-4 px-6 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2024 Developed by{" "}
            <Link
              to="https://nish14.vercel.app/"
              className="text-blue-500 hover:underline hover:text-blue-700 transition duration-300"
            >
              Nishant
            </Link>
          </p>

          <div className="flex items-center space-x-6 mt-2 md:mt-0">
            <Link
              to="https://www.linkedin.com/in/nishant-chauhan-b76371255/"
              className="text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:scale-125"
            >
              <FaLinkedin size={24} />
            </Link>

            <Link
              to="https://github.com/NISHANTCHAUHAN1"
              className="text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:scale-125"
            >
              <FaGithub size={24} />
            </Link>

            <span className="text-sm text-gray-600 hover:text-gray-800 transition duration-300 cursor-pointer">
              Terms of Service
            </span>
            <span className="text-sm text-gray-600 hover:text-gray-800 transition duration-300 cursor-pointer">
              Privacy
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
