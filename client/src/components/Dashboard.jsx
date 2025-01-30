/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { File, Upload, Grid, List, Search, Edit, Delete } from "lucide-react";
import IndexCardModal from "./IndexCardModal";
import EditCardModal from "./EditCardModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNotecard, setEditNotecard] = useState(null);
  const [notecards, setNotecards] = useState([]);
  const [selectedNotecard, setSelectedNotecard] = useState(null);
  const [showLogout, setShowLogout] = useState(false); // Logout dropdown
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch notecards on mount (and whenever token changes)
  useEffect(() => {
    const fetchNotecards = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch("http://localhost:3000/notecards", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNotecards(data);
        } else {
          console.error("Failed to fetch notecards");
        }
      } catch (error) {
        console.error("Error fetching notecards:", error.message);
      }
    };

    fetchNotecards();
    // We can remove [notecards] from the deps array to avoid infinite re-fetching
  }, [token, notecards]);

  // Filter notecards by searchTerm
  const filteredNotecards = notecards.filter(
    (notecard) =>
      notecard.title &&
      notecard.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Upload a new PDF -> create a new notecard
  const handleFileUpload = async (event) => {
    console.log("Uploading file...");
    const file = event.target.files[0];
    const userId = localStorage.getItem("userId");

    if (file && file.type === "application/pdf") {
      try {
        // Step 1: Build FormData with the PDF file
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId); // Append userId as well

        // Step 2: Send to Node's /api/summarize-pdf
        const response = await fetch(
          "http://localhost:3000/api/summarize-pdf",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // if needed
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to summarize or create notecard");
        }

        // Step 3: Get the newly created notecard from Node
        const createdCard = await response.json();
        // Append new notecard to state
        setNotecards((prevCards) => [...prevCards, createdCard]);
        console.log("Notecard created successfully:", createdCard);
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Open the modal to view notecard details
  const openModal = (notecard) => {
    setSelectedNotecard(notecard);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedNotecard(null);
  };

  const handleEdit = (notecard, e) => {
    e.stopPropagation(); // Prevent modal opening from card click
    setEditNotecard(notecard);
    setEditModalOpen(true);
  };
  // Function to handle save from the modal
  const handleSaveEdit = async (updatedNotecard) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${updatedNotecard.originalTitle}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newTitle: updatedNotecard.title,
            body: updatedNotecard.body,
          }),
        },
      );

      if (response.ok) {
        const { updatedCard } = await response.json();
        setNotecards((prev) =>
          prev.map((card) =>
            card.id === updatedCard._id ? { ...card, ...updatedCard } : card,
          ),
        );

        setEditModalOpen(false); // Close the modal after saving
      } else {
        console.error("Failed to save edits");
      }
    } catch (error) {
      console.error("Error saving edits:", error.message);
    }
  };

  // DELETE Logic: DELETE -> http://localhost:3000/:title
  const handleDelete = async (notecard, e) => {
    e.stopPropagation(); // Prevent opening the modal

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${notecard.title}"?`,
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/${notecard.title}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Notecard deleted successfully");
        // Remove it from state
        setNotecards((prev) =>
          prev.filter((card) => card.title !== notecard.title),
        );
      } else {
        console.error("Failed to delete notecard");
      }
    } catch (error) {
      console.error("Error deleting notecard:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-earthyOffWhite font-sourGummy p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          {/* Username + Logout */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-earthyGreen">
              {localStorage.getItem("name")}'s Notecards
            </h1>
            {showLogout && (
              <div className="absolute left-0 w-32 bg-earthyCream text-earthyBrown rounded-md shadow-lg py-2 z-10">
                <button
                  className="cursor-pointer w-full items-center bg-earthyBrown text-earthyCream py-2 px-4 rounded-md hover:bg-earthyGreen transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search notecards"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-earthyBrown rounded-md focus:outline-none focus:ring-2 focus:ring-earthyGreen bg-earthyOffWhite"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earthyBrown"
                size={18}
              />
            </div>

            {/* Grid/List Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-md ${
                  view === "grid"
                    ? "bg-earthyBrown text-earthyCream"
                    : "text-earthyBrown"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-md ${
                  view === "list"
                    ? "bg-earthyBrown text-earthyCream"
                    : "text-earthyBrown"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Upload Button */}
            <label className="cursor-pointer bg-earthyBrown text-earthyCream py-2 px-4 rounded-md hover:bg-earthyGreen transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload size={20} className="inline mr-2" />
              Upload PDF
            </label>
          </div>
        </header>

        {/* Notecard Grid/List */}
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              : "grid-cols-1 gap-4"
          }`}
        >
          {filteredNotecards.map((notecard) => (
            <div
              key={notecard.id || notecard._id} // Ensure unique key
              className={`bg-earthyCream p-5 rounded-lg shadow-md ${
                view === "grid"
                  ? "flex flex-col"
                  : "flex items-center justify-between"
              } cursor-pointer hover:shadow-lg hover:scale-[105%] duration-[0.25s] transition-all`}
              onClick={() => openModal(notecard)}
            >
              <div className="flex items-center mb-2">
                <File className="text-earthyBrown mr-2" size={24} />
                <h3 className="text-lg font-semibold text-earthyBrown">
                  {notecard.title}
                </h3>
              </div>
              <p className="text-sm text-earthyBrown">{notecard.date}</p>

              {/* Action Buttons: Edit & Delete */}
              <div className="flex gap-2 justify-end items-end mt-auto">
                <button
                  className="cursor-pointer items-center bg-earthyBrown text-earthyCream py-2 px-4 rounded-md hover:bg-earthyGreen transition-colors"
                  onClick={(e) => handleEdit(notecard, e)}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="cursor-pointer items-center bg-earthyBrown text-earthyCream py-2 px-4 rounded-md hover:bg-earthyGreen transition-colors"
                  onClick={(e) => handleDelete(notecard, e)}
                >
                  <Delete size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal to view notecard details */}
      <IndexCardModal
        isOpen={!!selectedNotecard}
        onClose={closeModal}
        notecard={selectedNotecard}
      />
      {/* Edit Modal */}
      <EditCardModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        notecard={editNotecard}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
