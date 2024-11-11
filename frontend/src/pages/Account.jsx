import React from "react";
import { pinData } from "../context/pinContext";
// import PinCard from "../components/PinCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const { pins } = pinData();
  const { setIsAuth, setUser } = UserData();

  let userPins;
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-6 w-full">
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-3xl text-gray-700">
              {user.name.slice(0, 1)}
            </span>
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-center text-gray-600 mt-2">{user.email}</p>
        <div className="flex justify-center mt-4 space-x-2">
          <button onClick={logoutHandler} className="bg-gray-200 px-4 py-2 rounded">
            Logout
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {userPins && userPins.length > 0 ? (
            userPins.map((e) => (
              <div
                key={e._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
              >
                <div className="relative group">
                  <img
                    src={e.image.url}
                    alt=""
                    className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-md shadow-md transition-transform duration-200 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <button
                        onClick={() => navigate(`/pin/${e._id}`)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Pin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Pins Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
