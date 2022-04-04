import React, { useState, useEffect, useRef } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";

const Login = () => {
  useTitle("Login");
  const [isLogin, setIsLogin] = useState(true);
  const userNameInput = useRef(null);
  const checkMe = useRef(null);
  useEffect(() => {
    userNameInput.current.focus();
    checkMe.current.checked = true;
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 pt-10">
      <div className="max-w-xl min-h-[400px] bg-[#EBF2FA] shadow-md mx-auto">
        <nav className="space-x-5 list-none pt-2 pb-6 flex">
          <li
            className="ml-8 cursor-pointer hover:border-b-2 border-red-500"
            onClick={() => setIsLogin(true)}
          >
            Login
          </li>
          <li
            className="cursor-pointer hover:border-b-2 border-red-500"
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </li>
        </nav>
        <div>
          {isLogin === true ? (
            <div>
              <div className="space-y-3 ml-8">
                <label className="block mb-2">
                  <span className="mb-1 inline-block">User Name</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="text"
                    placeholder="User name"
                    ref={userNameInput}
                  />
                </label>
                <label className="block mb-2">
                  <span className="pb-1 inline-block">Password</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="password"
                    placeholder="Password"
                  />
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    className="mr-1 align-middle"
                    ref={checkMe}
                  />
                  <span>remember me</span>
                </label>
              </div>
              <div className="ml-8 mt-10">
                <button
                  type="sumbit"
                  className="py-1 px-2 bg-red-500 text-white rounded"
                >
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-3 ml-8">
                <label className="block mb-2">
                  <span className="mb-1 inline-block">User Name</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="text"
                    placeholder="User name"
                  />
                </label>
                <label className="block mb-2">
                  <span className="pb-1 inline-block">Name</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="text"
                    placeholder="Name"
                  />
                </label>
                <label className="block mb-2">
                  <span className="mb-1 inline-block">Password</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="text"
                    placeholder="Password"
                  />
                </label>
                <label className="block mb-2">
                  <span className="pb-1 inline-block">Email</span>
                  <input
                    className="block p-1 rounded-sm w-[93%]"
                    type="email"
                    placeholder="Email"
                  />
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    className="mr-1 align-middle"
                    ref={checkMe}
                  />
                  <span>remember me</span>
                </label>
              </div>
              <div className="ml-8 mt-10">
                <button
                  type="sumbit"
                  className="py-1 px-2 bg-red-500 text-white rounded mb-8"
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
