"use client";
import { useAuth } from "@/context/AuthContext";
import { post } from "@/lib/API";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.username || "");
      setImage(parsedUser.userProfile || "");
    }
  }, [setUser]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/file/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          setImage(responseData.data);
          // Update userProfile in local storage
          const updatedUser = { ...user, userProfile: responseData.data };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          console.error("Failed to upload the file");
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const data: any = {
      id: user?.id,
      username: name,
      userProfile: image,
    };

    try {
      const response:any = await post("user/update-user-profile", data);

      if (response?.data) {
        const updatedUser = {
          ...user,
          username: response.data.user?.username,
          userProfile: response.data.user.userProfile,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist updated user data
      }

      console.log(response, "response");
    } catch (err: unknown) {
      console.error("Error updating profile", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <div className="flex items-center mt-2">
            <img
              src={image || "/default-profile.png"}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border border-gray-300"
            />
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              className="ml-4"
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-4 rounded bg-[#164e63] text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
