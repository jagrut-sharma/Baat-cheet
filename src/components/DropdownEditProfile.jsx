/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { useData } from "../context/DataContext";

export default function DropdownEditProfile({ inputRef, avatarRef, loader }) {
  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleAvatarClick = () => {
    avatarRef.current.click();
  };

  const { theme } = useData();

  return (
    <div className="absolute bottom-[-12px] right-[-5px] text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus-visible:ring-2"
            disabled={loader}
          >
            <div className=" cursor-pointer rounded-full p-2 text-blue-800 hover:bg-blue-100 hover:bg-opacity-80 dark:text-slate-100 dark:hover:bg-gray-400 dark:hover:bg-opacity-50">
              <BsFillCameraFill />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-500 dark:bg-gray-600">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-600 text-white dark:font-bold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-50`}
                    onClick={handleAvatarClick}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                        theme={theme}
                      />
                    )}
                    Choose Avatar
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-600 text-white dark:font-bold"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-slate-50`}
                    onClick={handleUploadClick}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                        theme={theme}
                      />
                    )}
                    Upload
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke={`${props.theme === "light" ? "#1e40af" : "#3b82f6"}`}
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#f8fafc"
        stroke="#f8fafc"
        strokeWidth="2"
      />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4H16V10"
        stroke={`${props.theme === "light" ? "#1e40af" : "#3b82f6"}`}
        strokeWidth="2"
      />
      <path
        d="M16 4L8 12"
        stroke={`${props.theme === "light" ? "#1e40af" : "#3b82f6"}`}
        strokeWidth="2"
      />
      <path
        d="M8 6H4V16H14V12"
        stroke={`${props.theme === "light" ? "#1e40af" : "#3b82f6"}`}
        strokeWidth="2"
      />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#f8fafc" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#f8fafc" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#f8fafc" strokeWidth="2" />
    </svg>
  );
}
