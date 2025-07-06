import React from "react";
import { Link } from "react-router-dom";

const Project = ({ project }) => {
  return (
    <div className="w-full border border-gray-200 ">
      <div className="flex items-center  p-5">
        <img
          className="w-24 h-24 rounded-full p-1"
          src="https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2020/08/13/MongoDBKinesisDataFirehose1_rev.png"
          alt="Bonnie"
        />
        <div className="pl-5">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {project?.title || "School-Management-System"}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {project?.technologies || "React, Express, Mongodb"}
          </span>
          <br />
          <small>{project?.team || "Rubidsoft Team"}</small>
          <hr />
          <Link to={`/projects/${project?.id || 'default'}`} className="text-green-700 hover:text-green-800 transition-colors duration-200">
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
