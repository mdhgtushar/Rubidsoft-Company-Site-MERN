import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectService } from "../../services/apiService";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

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
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Projects</h1>
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
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Projects</h1>
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
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Web Development Projects</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our completed work and see how we've helped businesses achieve their digital goals. 
            Each project showcases our expertise and commitment to quality web development.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-slate-100">
            {getCategories().map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
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
              className="bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-3xl"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">Client: {project.client}</p>
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
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedProject.title}</h2>
                    <p className="text-blue-600 font-medium">Client: {selectedProject.client}</p>
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
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Project Overview</h3>
                    <p className="text-slate-600 mb-4">{selectedProject.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Timeline:</span>
                        <span className="text-sm font-semibold text-slate-800">{selectedProject.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Budget:</span>
                        <span className="text-sm font-semibold text-slate-800">${selectedProject.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Category:</span>
                        <span className="text-sm font-semibold text-slate-800">{selectedProject.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedProject.features && selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Similar Services */}
                {selectedProject.similarServices && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Similar Services</h3>
                    <p className="text-slate-600 mb-3">
                      Need something similar? We can help you with related web development services:
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
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-center shadow-lg"
                  >
                    Order Similar Project
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 text-center"
                  >
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Web Development Project?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
            Let's discuss your requirements and create a custom web solution that fits your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              to="/order-form"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 