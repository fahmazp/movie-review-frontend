import React from "react";
import { X, House, Clapperboard, Tv, Popcorn, Globe, CircleUser } from "lucide-react";
import logo from "../../assets/images/image 1.png";
import { Link, useLocation } from "react-router-dom";

const navigation = [
    { name: "Home", path: "/", icon: House },
    { name: "Movies", path: "/movies", icon: Clapperboard },
    { name: "TV Shows", path: "/tv-shows", icon: Tv },
    { name: "Watchlists", path: "/user/watchlists", icon: Popcorn },
    { name: "News", path: "/news", icon: Globe },
    { name: "Profile", path: "/user/profile", icon: CircleUser },
  ]

const Sidebar = ({ toggleSidebar }) => {

    const location = useLocation()

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-80 bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 shadow-lg hidden sm:block">
      <div className="flex justify-between items-center mb-8">
        <img alt="logo" src={logo} className="h-10 w-auto object-cover" />
        <button onClick={toggleSidebar}>
          <X size={32} className="bg-amber-400 rounded-full text-black p-0.5" />
        </button>
      </div>

      <ul className="space-y-6">
      {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={toggleSidebar}
              className={`flex items-center gap-2.5 text-base transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-yellow-400 font-semibold underline underline-offset-4"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              <item.icon className="size-4 text-yellow-200" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
