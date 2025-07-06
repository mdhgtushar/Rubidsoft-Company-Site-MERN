import React from "react";
import Project from '../../components/Project';
import { projects } from '../../data/projects';

const Works = () => {
  // Use the first 6 projects from the centralized data
  const sampleProjects = projects.slice(0, 6).map(project => ({
    id: project.id,
    title: project.title,
    technologies: project.technologies.join(", "),
    team: "Rubidsoft Team"
  }));
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Our Works</h1>
        <p className="text-slate-600 mb-8">Explore our portfolio of successful projects and digital solutions.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project, index) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works; 