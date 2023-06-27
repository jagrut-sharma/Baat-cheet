/* eslint-disable react/prop-types */
import { HashLoader } from "react-spinners";

export default function Loader({ loadingState }) {
  return (
    <div className="mt-8 flex items-center justify-center">
      <HashLoader
        color={
          localStorage.getItem("theme") === "light" ? "#1d4ed8" : "#3b82f6"
        }
        loading={loadingState}
      />
    </div>
  );
}
