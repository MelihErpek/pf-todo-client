import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

export default function Header() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(null);
  const history = useHistory();

  // const { userData, loggedIn, setLoggedIn, getLoggedIn } =
  //   useContext(AuthContext);
  const { loggedIn, userData } = useContext(AuthContext);
  const logOut = () => {
    localStorage.setItem("auth-token", "");
  };
  const Name = () => {
    if (userData.user) {
      if (userData.user.user) {
        return (
          <div className="flex space-x-2 text-lg  font-semibold bg-red-100 p-3 ">
            Welcome {userData.user.user.name}
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  };
  // useEffect(() => {
  //   getLoggedIn().then(setIsLoading(false));
  //   console.log("selam")
  // }, [isLoading]);

  return (
    <div>
      {/* <div
        className={` flex items-center justify-center ${
          isLoading ? "bg-gray-200 blur" : "bg-white"
        }`}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="text-center">
            {loggedIn ? (
              <div className="text-green-500">Giriş yapıldı</div>
            ) : (
              <div className="text-red-500">Giriş yapılmadı</div>
            )}
          </div>
        )}
      </div> */}
      {loggedIn ? (
        <div>
          <header className=" text-black p-4 ">
            <div className="flex flex-col md:flex-row md:justify-between items-center w-full">
              <div className="mb-4 md:mb-0">
                <a href="/">
                  <img
                    src="./playable_factory_logo.jpg"
                    alt="Logo"
                    className="w-20 h-20 mx-auto md:mx-0 md:ml-10"
                  />
                </a>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-14 md:mr-40">
                {/* <div className="flex space-x-2 text-lg font-bold bg-blue-300 p-3 rounded-xl">
                  <div>{userData.user.user.name}</div>
                  <div>{userData.user.user.surname}</div>
                </div> */}
                <Name />
                <a className="text-black italic font-bold " href="/yourtodo">
                  Your ToDo List
                </a>
                <a className="text-black italic font-bold " href="/addtodoitem">
                  ADD A ToDo ITEM
                </a>
                <a
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-9 py-3 rounded transition-colors duration-300"
                  href="/home"
                  onClick={() => logOut()}
                >
                  LOG OUT
                </a>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <div>
          <header className=" text-black p-4 ">
            <div className="flex flex-col md:flex-row md:justify-between items-center w-full">
              <div className="mb-4 md:mb-0">
                <a href="/">
                  <img
                    src="./playable_factory_logo.jpg"
                    alt="Logo"
                    className="w-20 h-20 mx-auto md:mx-0 md:ml-10"
                  />
                </a>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-14 md:mr-40">
                <a className="text-black italic font-bold" href="/adduser">
                  ADD USER
                </a>
                <a
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-9 py-3 rounded transition-colors duration-300"
                  href="./login"
                >
                  LOGIN
                </a>
              </div>
            </div>
          </header>
        </div>
      )}
    </div>
  );
}
