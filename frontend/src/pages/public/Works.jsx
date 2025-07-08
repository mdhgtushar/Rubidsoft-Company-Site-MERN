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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Works</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our portfolio of successful web development projects and digital solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project, index) => (
            <Project key={project.id} project={project} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Web Development Project?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
            Let's discuss your requirements and create a custom web solution that fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Get Free Consultation
            </a>
            <a
              href="/order-form"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works; 