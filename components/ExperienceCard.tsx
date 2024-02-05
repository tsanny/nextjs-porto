import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { format } from "date-fns";

export default function ExperienceCard(props: any) {
  const { children } = props;
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(children.title);
  const [newDescription, setNewDescription] = useState(children.description);

  async function handleEditExperience(id: any) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    };
    const response = await fetch(
      `https://portofolio-be-production.up.railway.app/experiences/${children.id}`,
      requestOptions
    );
    const data = await response.json();
    setShowModal(false);
    await props.loadExperiences();
  }

  async function handleDeleteExperience() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await currentUser?.getIdToken()}`,
      },
    };
    const response = await fetch(
      `https://portofolio-be-production.up.railway.app/experiences/${children.id}`,
      requestOptions
    );
    const data = await response.json();
    await props.loadExperiences();
  }

  return (
    <>
      <div className="p-2 border border-white border-solid">
        <div className="flex item-stretch justify-between">
          <div className="text-2xl capitalize">{children.title}</div>
          {currentUser && (
            <div>
              <i
                onClick={() => setShowModal(true)}
                className="fa-solid fa-pencil duration-300 hover:rotate-45 cursor-pointer"
              ></i>
              <i
                onClick={handleDeleteExperience}
                className="fa-solid fa-trash-can px-3 duration-300 hover:scale-125 cursor-pointer"
              ></i>
            </div>
          )}
        </div>
        <div className="text-sm">{children.description}</div>
        <div className="text-sm pt-2">
          {format(new Date(children.startedAt), "MMMM yyyy")}
          {children.endedAt !== null
            ? ` - ${format(new Date(children.endedAt), "MMMM yyyy")}`
            : " - Present"}
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Edit Experience
                  </h3>
                  <hr />
                  <br />
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter title"
                    className="text-gray-900 mt-2 focus:border-cyan-300 focus:bg-cyan-lightest block w-full shadow-sm py-2 px-3 border border-gray-light rounded-md"
                  />
                  <br />
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                    maxLength={500}
                    minLength={1}
                    rows={5}
                    className="text-gray-900 mt-2 focus:border-cyan-300 focus:bg-cyan-lightest block w-full shadow-sm py-2 px-3 border border-gray-light rounded-md"
                  ></textarea>
                </div>

                <div className="bg-gray-lighter py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => handleEditExperience(children.id)}
                    className="text-gray-900 mt-3 w-full inline-flex justify-center rounded-md border border-gray-light shadow-sm px-3 py-2 bg-white text-base font-medium text-gray-dark hover:bg-gray-lightest focus:outline-none focus:ring-offset-2 focus:ring-cyan-darkest sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-900 mt-3 w-full inline-flex justify-center rounded-md border border-gray-light shadow-sm px-3 py-2 bg-white text-base font-medium text-gray-dark hover:bg-gray-lightest focus:outline-none focus:ring-offset-2 focus:ring-cyan-darkest sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
