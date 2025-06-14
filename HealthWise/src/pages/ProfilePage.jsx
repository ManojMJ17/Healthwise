import { useState, useEffect } from "react";
import { fetchUserDetails } from "../api";  // Import API function

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

 useEffect(() => {
  fetchUserDetails()
    .then(data => setUserData(data))
    .catch(error => console.error("Failed to load user data:", error));
}, []);

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="mx-10 my-5 flex flex-col gap-4">
      {/* Header */}
      <div className="header flex justify-between items-center w-full px-3">
        <p className="text-[18px] font-bold text-white">HealthWise</p>
        <img src="/anime-style-male.png" alt="Profile Pic" className="w-10 h-10 rounded-full" />
      </div>
      <hr />

      {/* Profile Picture & Edit Option */}
      <div className="profilepic mt-5 flex flex-col items-center">
        <img src="/anime-style-male.png" alt="Profile Pic" className="w-30 h-30 rounded-full" />
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p 
          className="font-bold mt-3 cursor-pointer hover:text-blue-400 transition" 
          onClick={() => setIsEditing(true)}
        >
          Edit
        </p>
      </div>

      {/* Profile Form */}
      <form className="flex flex-col ml-16 gap-4">
        <label className="flex flex-col text-gray-200">
          Full Name:
          <input type="text" value={userData.name} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Email:
          <input type="email" value={userData.email} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Age:
          <input type="number" value={userData.age} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Gender:
          <select value={userData.gender} className="input-style" disabled={!isEditing}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className="flex flex-col text-gray-200">
          Dosha Type:
          <input type="text" value={userData.dosha_type} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Weight (kg):
          <input type="number" value={userData.weight} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Height (cm):
          <input type="number" value={userData.height} className="input-style" disabled={!isEditing} />
        </label>

        <label className="flex flex-col text-gray-200">
          Blood Pressure:
          <input type="text" value={userData.blood_pressure} className="input-style" disabled={!isEditing} />
        </label>

        {/* Show Submit Button ONLY When Editing */}
        {isEditing && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;