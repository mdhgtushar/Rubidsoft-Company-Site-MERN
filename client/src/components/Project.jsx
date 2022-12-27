import React from "react";

const Project = () => {
  return (
    <div class="w-full border border-gray-200 ">
      <div class="flex items-center  p-5">
        <img
          class="w-24 h-24 rounded-full p-1"
          src="https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2020/08/13/MongoDBKinesisDataFirehose1_rev.png"
          alt="Bonnie"
        />
        <div className="pl-5">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            School-Management-System
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            React, Express, Mongodb
          </span>
          <br />
          <small>Rubidsoft Team</small>
          <hr />
          <a href="/teachers/12" className="text-green-700">
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
