import { useState, useEffect } from "react";
import { fetchUserDetails } from "../api"; // Your API function
import { updateProfile } from "../api";
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);    // Raw user data
  const [formData, setFormData] = useState(null);    // Editable form state
  const [isEditing, setIsEditing] = useState(false); // Edit mode

  useEffect(() => {
    fetchUserDetails()
      .then(data => {
        setUserData(data);
        setFormData(data); // Sync editable form
      })
      .catch(error => console.error("Failed to load user data:", error));
  }, []);

  const getProfilePic = (gender) => {
    if (gender === "male") return "/anime-style-male.png";
    if (gender === "female") return "/anime-style-female.png";
    return "/default-avatar.png";
  };

  if (!userData || !formData) return <p>Loading profile...</p>;

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = async (e) => {
  e.preventDefault();
  try {
    await updateProfile(formData);
    setUserData(formData);
    setIsEditing(false);
    alert("Profile updated successfully");
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update profile");
  }
};


  return (
    <div className="mx-10 my-5 flex flex-col gap-4 p-5">
      {/* Header */}
      <div className="header flex justify-between items-center w-full px-3">
        <p className="text-[18px] font-bold text-white">HealthWise</p>
        <img src={getProfilePic(userData.gender)} alt="Profile Pic" className="w-12 h-12 rounded-full" />
      </div>
      <hr />

      {/* Profile Picture & Edit Toggle */}
      <div className="profilepic mt-5 flex flex-col items-center">
        <img
          src={getProfilePic(userData.gender)}
          alt="Profile Pic"
          className="w-30 h-30 rounded-full"
        />
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
      <form className="flex flex-col ml-16 gap-4" onSubmit={handleSave}>
        <label className="flex flex-col text-gray-200">
          Full Name:
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Email:
          <input
            type="email"
            value={formData.email}
            className="input-style"
            disabled
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Age:
          <input
            type="number"
            value={formData.age}
            onChange={handleChange("age")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Gender:
          <select
            value={formData.gender}
            onChange={handleChange("gender")}
            className="input-style "
            disabled={!isEditing}
          >
            <option className="text-black" value="male">Male</option>
            <option className="text-black" value="female">Female</option>
          </select>
        </label>

        <label className="flex flex-col text-gray-200">
          Dosha Type:
          <input
            type="text"
            value={formData.dosha_type || ""}
            onChange={handleChange("dosha_type")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Weight (kg):
          <input
            type="number"
            value={formData.weight || ""}
            onChange={handleChange("weight")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Height (cm):
          <input
            type="number"
            value={formData.height || ""}
            onChange={handleChange("height")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col text-gray-200">
          Blood Pressure:
          <input
            type="text"
            value={formData.blood_pressure || ""}
            onChange={handleChange("blood_pressure")}
            className="input-style"
            disabled={!isEditing}
          />
        </label>

        {isEditing && (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition w-100"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;