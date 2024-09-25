"use client";
import { post } from "@/lib/API";
import React, { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/file/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          alert("File uploaded successfully! File URL: " + responseData.data);
        } else {
          console.error("Failed to upload the file");
        }
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const data={
      id:"id",
      username:name,
      userProfile:image
    }
    try {
      const response = await post("user/update-user-profile", data);
      console.log(response,"response")
    } catch (err: unknown) {
    
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
              src={image}
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
          <button onClick={handleSubmit} className="px-8 py-4 rounded bg-[#164e63] text-white">Submit </button>
        </div>
      </form>
    </div>
  );
}
