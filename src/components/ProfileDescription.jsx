import { BiLogOut } from "react-icons/bi";
import AvatarEle from "./AvatarEle";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "../context/AuthContext";
import { logoutHandler } from "../services/authServices";

export default function ProfileDescription() {
  const { setToken, setUser } = useAuth();

  const handleLogout = () => {
    logoutHandler(setToken, setUser);
  };

  return (
    <div className="mb-4 w-[100%] rounded border border-gray-200 bg-gray-50 px-4 py-4 shadow dark:border-gray-600 dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex">
          <AvatarEle imgLink="" firstName={"jagrut"} lastName={"sharma"} />

          <p className="item ml-2 flex flex-col justify-center gap-1 dark:text-gray-50 md:ml-0">
            {"Jagrut" + " " + "Sharma"}
            <span className="text-[small]">{`test@123`}</span>
          </p>
        </div>

        <div className="flex md:hidden">
          <EditProfileModal />
          <button
            className="mx-2 rounded-md bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
            onClick={handleLogout}
          >
            <BiLogOut />
          </button>
        </div>

        {/* <div>
      <button className="mx-2 rounded-md bg-blue-600 p-4 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80">
        Follow
      </button>
    </div> */}

        <div className="hidden md:flex">
          <EditProfileModal />
          <button
            className="mx-2 rounded-xl bg-blue-600 p-2 py-1 font-bold text-white hover:bg-opacity-80 dark:bg-blue-500 dark:hover:opacity-80"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <p className="mt-4 dark:text-gray-50 ">This is a demo bio</p>
      <div className="mt-2 hover:underline dark:text-gray-50 ">
        <a
          href="https://jagrut-sharma.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          https://jagrut-sharma.netlify.app/
        </a>
      </div>
    </div>
  );
}
