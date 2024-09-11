import React from "react";
import { pinData } from "../context/pinContext";
import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { pins, loading } = pinData();
  return (
    <>
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-wrap m-4">
              {pins && pins.length > 0 ? (
                pins.map((e, i) => <PinCard key={i} pin={e} />)
              ) : (
                <p>No Pins Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    <section className="w-full overflow-hidden py-8 bg-white text-textColor border-t border-gray-500">
      <div className="flex h-full justify-center items-center px-12 mx-auto">
        <div>
          <p className="text-lg font-semibold">
            &copy; 2024{" "}
           <Link
              to="https://nish14.vercel.app/"
              target="_blank"
              className="text-primary"
            >
              Nishant Chauhan
            </Link>
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;