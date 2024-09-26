import React from 'react';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm }:any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="mb-4">Are you sure you want to delete this user?</h2>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 p-2 rounded mr-2"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 p-2 text-white rounded hover:bg-red-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
