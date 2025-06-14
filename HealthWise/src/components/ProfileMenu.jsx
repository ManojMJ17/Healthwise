import React, { useState, useEffect, useRef } from "react";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="grey w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={toggleMenu}>
        <UserRound size={20} />
      </div>

      {isMenuVisible && (
        <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-[#293642]  border border-gray-300 shadow-lg p-2 rounded-md">
          <ul className="text-sm">
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer" onClick={() => navigate("/profile")}>Profile</li>
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer">Settings</li>
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer">View History</li>
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer">Download Health Summary</li>
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer">Help & Support</li>
            <li className="p-2 hover:bg-gray-100 hover:text-[#293642] cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;