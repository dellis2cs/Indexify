/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function EditCardModal({ isOpen, onClose, notecard, onSave }) {
  const [title, setTitle] = useState(notecard?.title || "");
  const [body, setBody] = useState(notecard?.body || "");
  const [originalTitle, setOriginalTitle] = useState("");

  // Reset the fields whenever the modal is opened for a new card
  React.useEffect(() => {
    if (notecard) {
      setTitle(notecard.title);
      setBody(notecard.body);
      setOriginalTitle(notecard.title);
    }
  }, [notecard]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ ...notecard, originalTitle, title, body });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md bg-earthyOffWhite">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Notecard
        </h2>
        <div className="mb-4 bg-earthyOffWhite">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-earthyGreen rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-earthyOffWhite"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 block w-full p-2 border border-earthyGreen rounded-md focus:ring-earthyBrown focus:border-earthyBrown bg-earthyOffWhite"
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-earthyBrown hover:bg-earthyGreen text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
