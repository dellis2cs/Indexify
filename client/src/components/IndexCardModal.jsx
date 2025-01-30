/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react"; // Optional for nicer transitions

export default function IndexCardModal({ isOpen, onClose, notecard }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      {/* Background Overlay */}
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50
                     backdrop-blur-sm"
          onClick={onClose} // Close when clicking the background
        />
      </Transition.Child>

      {/* Centered Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Transition.Child
          as={Fragment}
          enter="transition-transform ease-out duration-200"
          enterFrom="scale-90 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-transform ease-in duration-150"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-90 opacity-0"
        >
          {/* Modal Card */}
          <div
            className="relative bg-earthyCream rounded-lg shadow-xl
                       w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()} // Prevent overlay close
          >
            {/* Header with Title and Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-earthyGreen font-sourGummy">
                {notecard?.title || "No Title"}
              </h2>
              <button
                onClick={onClose}
                className="text-earthyBrown hover:text-earthyGreen"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="bg-white p-4 rounded-md shadow-inner mb-4 max-h-[50vh] overflow-y-auto">
              <p className="text-earthyBrown whitespace-pre-wrap">
                {notecard?.body || "No content available."}
              </p>
            </div>

            {/* Footer or Additional Info (optional) */}
            <div className="flex justify-end text-sm text-earthyBrown">
              {/* Add any extra details here if needed */}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
