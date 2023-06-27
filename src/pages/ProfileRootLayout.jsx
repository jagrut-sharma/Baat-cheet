import { Outlet } from "react-router-dom";

export default function ProfileRootLayout() {
  return (
    <main className="relative flex flex-col items-center">
      <div className="relative w-full px-6 py-4 md:px-8 lg:max-w-3xl">
        <Outlet />
      </div>
    </main>
  );
}
