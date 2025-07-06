import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectService } from "../../services/apiService";
import { Loader2, AlertCircle } from "lucide-react";

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await projectService.getAllProjects({ published: true, limit: 50 });
      setProjects(response.data.data.projects || []);
    } catch (err) {
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = () => {
    const categories = [...new Set(projects.map(project => project.category))];
    return ["all", ...categories.filter(Boolean)];
  };

  const filteredProjects = filterCategory === "all"
    ? projects
    : projects.filter(project => project.category === filterCategory);

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Previous Projects</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our completed work and see how we've helped businesses achieve their digital goals.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-4xl text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Previous Projects</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our completed work and see how we've helped businesses achieve their digital goals.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchProjects}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Previous Projects</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our completed work and see how we've helped businesses achieve their digital goals. 
            Each project showcases our expertise and commitment to quality.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-slate-100 rounded-lg p-1">
            {getCategories().map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filterCategory === category
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-sm text-slate-500 mb-3">Client: {project.client}</p>
                <p className="text-slate-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    <span className="font-semibold">{project.timeline}</span> • <span>${project.budget}</span>
                  </div>
                  <button 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
                    <p className="text-slate-600">Client: {selectedProject.client}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Project Overview</h3>
                    <p className="text-slate-600 mb-4">{selectedProject.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Timeline:</span>
                        <span className="text-sm font-semibold text-slate-900">{selectedProject.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Budget:</span>
                        <span className="text-sm font-semibold text-slate-900">${selectedProject.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Category:</span>
                        <span className="text-sm font-semibold text-slate-900">{selectedProject.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedProject.features && selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Similar Services */}
                {selectedProject.similarServices && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Similar Services</h3>
                    <p className="text-slate-600 mb-3">
                      Need something similar? We can help you with related services:
                    </p>
                    <div className="flex space-x-2">
                      {selectedProject.similarServices.map((service, index) => (
                        <Link
                          key={index}
                          to={`/services/${service}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          {index < selectedProject.similarServices.length - 1 && ', '}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex space-x-4">
                  <Link
                    to={`/projects/${selectedProject.slug}/order`}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                  >
                    Order Similar Project
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                  >
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 