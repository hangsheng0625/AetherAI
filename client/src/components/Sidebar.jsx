import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Eraser,
  Hash,
  House,
  Image,
  Scissors,
  SquarePen,
  Users,
  FileText,
} from "lucide-react";
import { LogOut } from "lucide-react";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-articles", label: "Write Articles", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!user) return null;

  return (
<aside
  className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl transform ${
    sidebar ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
>
      {/* User Profile */}
      <div className="flex flex-col items-center p-6 border-b">
        <img
          src={user.imageUrl}
          className="w-14 h-14 rounded-full"
          alt="User Avatar"
        />
        <h2 className="mt-2 text-lg font-semibold text-gray-800 text-center">
          {user.fullName}
        </h2>
        <button
          onClick={openUserProfile}
          className="mt-1 text-xs text-blue-500 hover:underline"
        >
          Edit Profile
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 gap-2">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(true)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Optional: Add Logout */}
<div className="p-4 border-t mt-auto">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={openUserProfile}>
      <img
        src={user.imageUrl}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="text-xs text-gray-500">{user.emailAddresses[0]?.emailAddress}</div>
    </div>
    <LogOut
      onClick={signOut}
      className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-500"
      title="Log Out"
    />
  </div>
</div>
    </aside>
  );
};

export default Sidebar;
