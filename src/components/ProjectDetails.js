import { currencyFormatter } from "../utils/currencyFormatter";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handleOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };
  return (
    <div className="project bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-5 w-[25rem]">
      <div className="top">
        <span className="text-sky-400">ID: {project._id}</span>
        <h3 className="text-3xl font-medium truncate">{project.title}</h3>
        <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">
          {project.tech}
        </span>
      </div>

      <div className="mid text-slate-300 flex gap-10">
        <div className="left flex flex-col">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added: {moment(project.createdAt).format("MMM DD YY, hh:mm A")}
          </span>
          <span>
            Updated: {moment(project.updatedAt).format("MMM DD YY, hh:mm A")}
          </span>
        </div>
        <div className="right flex flex-col">
          <span>Manager: {project.manager}</span>
          <span>Developer: {project.dev}</span>
          <span>
            Duration:{" "}
            {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button
          onClick={handleUpdate}
          className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="text-rose-500 hover:underline"
        >
          Delete
        </button>
      </div>

      {/* overlay */}
      <div
        onClick={handleOverlay}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>

      {/* modal */}

      <div
        className={`update-modal absolute w-[25rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-slate-800 overflow-hidden p-10 rounded-xl border border-slate-700 z-[2] ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <h2 className="text-3xl font-medium text-sky-400 mb-10">
          Update Project
        </h2>
        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
