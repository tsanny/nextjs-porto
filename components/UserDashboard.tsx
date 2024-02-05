import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [experience, setExperience] = useState({
    title: "",
    description: "",
    startedAt: new Date(),
    endedAt: new Date(),
  });
  const [experienceList, setExperienceList] = useState<any>([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [projectList, setProjectList] = useState<any>([]);

  useEffect(() => {
    loadExperiences();
    loadProjects();
  }, []);

  async function handleAddExperience() {
    if (!experience.title || !experience.description) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await currentUser?.getIdToken()}`,
      },
      body: JSON.stringify(experience),
    };
    const response = await fetch(
      "https://portofolio-be-production.up.railway.app/experiences",
      requestOptions
    );
    const data = await response.json();
    setExperienceList({ ...experienceList, [data.id]: data });
    setExperience({
      description: "",
      title: "",
      startedAt: new Date(),
      endedAt: new Date(),
    });
  }

  async function loadExperiences() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "https://portofolio-be-production.up.railway.app/experiences",
      requestOptions
    );
    const data = await response.json();
    setExperienceList(data);
  }

  async function loadProjects() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "https://portofolio-be-production.up.railway.app/projects",
      requestOptions
    );
    const data = await response.json();
    setProjectList(data);
  }

  return (
    <>
      <div className="w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5">
        {currentUser && (
          <>
            <input
              type="text"
              placeholder="Enter experience"
              value={experience.title}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  title: e.target.value,
                })
              }
              className="outline-none p-2 text-base sm:text-lg text-slate-900"
            />
            <input
              type="text"
              placeholder="Enter description"
              value={experience.description}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  description: e.target.value,
                })
              }
              className="outline-none p-2 text-base sm:text-lg text-slate-900"
            />
            <button
              onClick={handleAddExperience}
              className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase text-lg duration-300 hover:opacity-30"
            >
              {" "}
              ADD EXPERIENCE
            </button>
          </>
        )}
        {experienceList.length > 0 && (
          <h2 className="text-center">Experiences</h2>
        )}

        {Object.keys(experienceList).map((key) => {
          return (
            <ExperienceCard
              key={key}
              id={key}
              loadExperiences={loadExperiences}
            >
              {experienceList[key]}
            </ExperienceCard>
          );
        })}
        {projectList.length > 0 && <h2 className="text-center">Projects</h2>}
        {Object.keys(projectList).map((key) => {
          return (
            <ProjectCard key={key} id={key} loadProjects={loadProjects}>
              {projectList[key]}
            </ProjectCard>
          );
        })}
      </div>
    </>
  );
}
