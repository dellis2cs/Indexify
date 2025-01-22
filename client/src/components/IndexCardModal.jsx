/* eslint-disable react/prop-types */
import { X } from "lucide-react";

export default function IndexCardModal({ isOpen, onClose, notecard }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-earthyCream rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-earthyGreen font-sourGummy">
            {notecard.title}
          </h2>
          <button
            onClick={onClose}
            className="text-earthyBrown hover:text-earthyGreen"
          >
            <X size={24} />
          </button>
        </div>
        <div className="bg-white p-4 rounded-md shadow-inner mb-4">
          <p className="text-earthyBrown">{notecard.body}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-earthyBrown"></div>
      </div>
    </div>
  );
}
