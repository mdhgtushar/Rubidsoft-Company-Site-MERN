import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectService } from "../../services/apiService";
import { Loader2, AlertCircle, CheckCircle, Clock } from "lucide-react";

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
      <div className="bg-gray-50 min-h-screen pt-20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our completed work and see how we've helped enterprises achieve their digital transformation goals.
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
      <div className="bg-gray-50 min-h-screen pt-20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise Development Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our completed work and see how we've helped enterprises achieve their digital transformation goals.
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchProjects}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl overflow-hidden mb-16 mx-4 shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Explore our completed enterprise development projects and see how we've helped 
            businesses achieve their digital transformation goals.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    filterCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All Projects" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mb-16 mx-4">
        <div className="px-6">
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 shadow-lg cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-2xl">🚀</span>
                        </div>
                        <p className="text-sm">Project Preview</p>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      {project.duration && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.duration}
                        </span>
                      )}
                      {project.budget && (
                        <span className="flex items-center">
                          <span className="mr-1">💰</span>
                          {project.budget}
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-600">No projects match the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl mx-4 shadow-lg">
        <div className="px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Inspired by our work? Let's discuss how we can help you create 
            something amazing for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Project
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Project Image */}
                <div>
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    {selectedProject.image ? (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-2xl">🚀</span>
                        </div>
                        <p className="text-sm">Project Preview</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedProject.category}
                    </span>
                  </div>

                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={index} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.duration && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Duration</div>
                        <div className="font-medium text-gray-900">{selectedProject.duration}</div>
                      </div>
                    )}
                    {selectedProject.budget && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Budget</div>
                        <div className="font-medium text-gray-900">{selectedProject.budget}</div>
                      </div>
                    )}
                  </div>

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    <Link
                      to="/contact"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      Start Similar Project
                    </Link>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects; 