import React from "react";
import { pinData } from "../context/pinContext";
import PinCard from "../components/PinCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const { pins } = pinData();
  const {setIsAuth,setUser} = UserData();

  let userPins;
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }
  //   console.log(userPins);
  const navigate = useNavigate();

  const logoutHandler = async() => {
    try {
        const {data} = await axios.get("/api/user/logout");
        toast.success(data.message);
        navigate("/login");
        setIsAuth(false);
        setUser([]);
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };
  return (
    <div>
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
          <p className="text-center to-gray-600 mt-2">{user.email}</p>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={logoutHandler}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {userPins && userPins.length > 0 ? (
              userPins.map((e) => <PinCard key={e.id} pin={e} />)
            ) : (
              <p>No Pin Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
