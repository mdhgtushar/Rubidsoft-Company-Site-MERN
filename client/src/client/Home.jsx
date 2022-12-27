import React from "react";
import Project from "../components/Project";

const Home = () => {
  return (
    <div>
      <div class="bg-gray-100 p-2 px-5 font-bold mb-5">
        <h3>Latest Completed Works:</h3>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-5">
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
      <div class="bg-gray-100 p-2 px-5 font-bold">
        <h3>Technology Strength:</h3>
      </div>

      <div class="flex items-center mb-5">
        <div className="p-5">
          <img
            className="w-32 h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tailwind_CSS_logo.svg/2560px-Tailwind_CSS_logo.svg.png"
            alt="tailwindcss"
          />
        </div>
        <div className="p-5">
          <img
            className="w-32 h-6"
            src="https://camo.githubusercontent.com/423664f678fc08582fa8c2e5999d6eef9225631dcac55e3b3a66a90a0edb6bf7/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f657870726573732d3130392e737667"
            alt="express"
          />
        </div>
        <div className="p-5">
          <img
            className="w-6 h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            alt="react"
          />
        </div>
        <div className="p-5">
          <img
            className="w-32 h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png"
            alt="mongodb"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
