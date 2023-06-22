/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { guestUser } from "../utils/constants";
import { ClipLoader } from "react-spinners";

export default function AuthForm({
  handleFormSubmit,
  err,
  setErr,
  loader,
  buttonLoader,
  setButtonLoader,
}) {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCnfPasswordVisible, setIsCnfPasswordVisible] = useState(false);
  const [formData, setFormData] = useImmer({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const location = useLocation();

  const handleInputChange = (e) => {
    setFormData((draft) => {
      draft[e.target.name] = e.target.value;
    });
    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonLoader((draft) => {
      draft[e.target.name] = true;
    });

    if (isRegister) {
      if (formData.password !== formData.cnfPassword) {
        setErr("Password do not match");
        return;
      }
      setErr("");
      handleFormSubmit(formData);
    } else {
      handleFormSubmit({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const handleGuestLogin = (e) => {
    setButtonLoader((draft) => {
      draft[e.target.name] = true;
    });

    setFormData((draft) => {
      draft.email = guestUser.email;
      draft.password = guestUser.password;
    });

    handleFormSubmit(guestUser);
  };

  const handleModeSwitch = () => {
    setErr("");
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      cnfPassword: "",
    });
    setIsCnfPasswordVisible(false);
    setIsPasswordVisible(false);
  };

  const handleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleCnfVisibility = () => {
    setIsCnfPasswordVisible((prev) => !prev);
  };

  return (
    <main className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        name={isRegister ? "register" : "login"}
        className="border-1 m-4 flex min-w-[15rem] flex-col items-center gap-4 rounded-md border border-gray-400 p-6 text-blue-700 shadow-lg dark:border-gray-300 dark:bg-gray-700 dark:text-slate-50 sm:min-w-[22rem]"
      >
        <h2 className="font-Poppins text-3xl font-bold dark:text-blue-500">
          {isRegister ? "Sign up" : "Sign in"}
        </h2>

        {err && <p className="font-bold text-[#ff0000]">{err}</p>}

        {isRegister && (
          <div className="flex w-full max-w-[50rem] flex-col">
            <label
              className="font-semibold dark:text-blue-500"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              type="text"
              className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
              name="firstName"
              id="firstName"
              placeholder="John"
              onChange={handleInputChange}
              value={formData.firstName}
              required
            />
          </div>
        )}

        {isRegister && (
          <div className="flex w-full max-w-[50rem] flex-col">
            <label
              className="font-semibold dark:text-blue-500"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              type="text"
              className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              onChange={handleInputChange}
              value={formData.lastName}
              required
            />
          </div>
        )}

        {isRegister && (
          <div className="flex w-full max-w-[50rem] flex-col">
            <label
              className="font-semibold dark:text-blue-500"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
              name="username"
              id="username"
              placeholder="john123"
              onChange={handleInputChange}
              value={formData.username}
              required
            />
          </div>
        )}

        <div className="flex w-full max-w-[50rem] flex-col">
          <label className="font-semibold dark:text-blue-500" htmlFor="email">
            Email Address:
          </label>
          <input
            type="email"
            className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
            name="email"
            id="email"
            placeholder="xyz@abc.com"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </div>

        <div className="flex w-full max-w-[50rem] flex-col">
          <label
            className="font-semibold dark:text-blue-500"
            htmlFor="password"
          >
            Password:
          </label>
          <span className="relative dark:text-slate-50">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
            {isPasswordVisible ? (
              <MdVisibility
                className="absolute right-[8px] top-[38%] cursor-pointer"
                size={"1rem"}
                onClick={handleVisibility}
              />
            ) : (
              <MdVisibilityOff
                className="absolute right-[8px] top-[38%] cursor-pointer"
                size={"1rem"}
                onClick={handleVisibility}
              />
            )}
          </span>
        </div>

        {isRegister && (
          <div className="flex w-full max-w-[50rem] flex-col">
            <label
              className="font-semibold dark:text-blue-500"
              htmlFor="cnfPassword"
            >
              Confirm Password:
            </label>
            <span className="relative dark:text-slate-50">
              <input
                type={isCnfPasswordVisible ? "text" : "password"}
                className="border-1 mt-[5px] w-full rounded-md border border-gray-500 bg-inherit p-1 font-OpenSans text-base text-black focus-visible:bg-slate-50 dark:text-slate-50 dark:focus-visible:bg-gray-400 dark:focus-visible:text-black"
                name="cnfPassword"
                id="cnfPassword"
                placeholder="Confirm Password"
                onChange={handleInputChange}
                value={formData.cnfPassword}
                required
              />
              {isCnfPasswordVisible ? (
                <MdVisibility
                  className="absolute right-[8px] top-[38%] cursor-pointer"
                  size={"1rem"}
                  onClick={handleCnfVisibility}
                />
              ) : (
                <MdVisibilityOff
                  className="absolute right-[8px] top-[38%] cursor-pointer"
                  size={"1rem"}
                  onClick={handleCnfVisibility}
                />
              )}
            </span>
          </div>
        )}

        {!isRegister && (
          <button
            className="w-full cursor-pointer rounded-md bg-blue-700 p-1 font-OpenSans text-base font-bold text-white disabled:opacity-30 dark:bg-blue-600"
            disabled={loader}
          >
            {buttonLoader.login ? (
              <ClipLoader
                color="#ffffff"
                size={20}
                cssOverride={{
                  marginTop: "4px",
                }}
              />
            ) : (
              "Login"
            )}
          </button>
        )}

        {!isRegister && (
          <button
            type="button"
            className="w-full cursor-pointer rounded-md bg-gray-700 p-1 font-OpenSans text-base font-bold text-slate-100 disabled:opacity-30 dark:bg-gray-400 dark:text-blue-600"
            onClick={handleGuestLogin}
            name="guest"
            disabled={loader}
          >
            {buttonLoader.guest ? (
              <ClipLoader
                color="#ffffff"
                size={20}
                cssOverride={{
                  marginTop: "4px",
                }}
              />
            ) : (
              "Guest Login"
            )}
          </button>
        )}

        {isRegister && (
          <button
            className="w-full cursor-pointer rounded-md bg-blue-700 p-1 font-OpenSans text-base font-bold text-white disabled:opacity-30 dark:bg-blue-600"
            disabled={loader}
          >
            {buttonLoader.register ? (
              <ClipLoader
                color="#ffffff"
                size={20}
                cssOverride={{
                  marginTop: "4px",
                }}
              />
            ) : (
              "Register"
            )}
          </button>
        )}

        <p className="text-black dark:text-slate-50">
          Don't have an account?{" "}
          <Link
            to={`?mode=${isRegister ? "signin" : "register"}`}
            onClick={handleModeSwitch}
            state={{ path: location.state?.path }}
            className="font-bold text-blue-700 dark:text-blue-500"
          >
            {isRegister ? "Login" : "Signup"}
          </Link>
        </p>
      </form>
    </main>
  );
}
