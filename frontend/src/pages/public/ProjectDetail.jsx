import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectById } from "../../data/projects";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate API call
    const fetchProject = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const projectData = getProjectById(projectId);
      if (projectData) {
        setProject(projectData);
      } else {
        // Project not found
        navigate('/projects');
      }
      setLoading(false);
    };

    fetchProject();
  }, [projectId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to="/projects" 
              className="text-blue-200 hover:text-white transition-colors duration-200"
            >
              ← Back to Projects
            </Link>
            <span className="text-blue-300">/</span>
            <span className="text-blue-200">{project.title}</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category}
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.status}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold">{project.timeline}</div>
                  <div className="text-blue-200 text-sm">Timeline</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{project.budget}</div>
                  <div className="text-blue-200 text-sm">Budget</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{project.team.length}</div>
                  <div className="text-blue-200 text-sm">Team Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{project.technologies.length}</div>
                  <div className="text-blue-200 text-sm">Technologies</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: "overview", label: "Overview", icon: "📋" },
            { id: "features", label: "Features", icon: "✨" },
            { id: "gallery", label: "Gallery", icon: "🖼️" },
            { id: "team", label: "Team", icon: "👥" },
            { id: "challenges", label: "Challenges & Solutions", icon: "🎯" },
            { id: "results", label: "Results", icon: "📊" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-blue-900 border-b-2 border-blue-900"
                  : "text-gray-600 hover:text-blue-900 hover:bg-gray-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.longDescription}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Client:</span>
                        <span className="font-semibold">{project.client}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-semibold">{project.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeline:</span>
                        <span className="font-semibold">{project.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-semibold">{project.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-semibold text-green-600">{project.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completion Date:</span>
                        <span className="font-semibold">{project.completionDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Links</h4>
                      <div className="space-y-2">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            <span>🌐</span>
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          >
                            <span>📦</span>
                            <span>GitHub Repository</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.gallery.map((image, index) => (
                  <div key={index} className="group cursor-pointer">
                    <img 
                      src={image} 
                      alt={`${project.title} - Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.team.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                      {member.avatar}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "challenges" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenges & Solutions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-red-500 mr-2">🎯</span>
                    Challenges Faced
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-green-500 mr-2">💡</span>
                    Solutions Implemented
                  </h3>
                  <div className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Results</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.results.map((result, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.split(' ')[0]}
                    </div>
                    <p className="text-gray-700 text-sm">
                      {result.split(' ').slice(1).join(' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in a Similar Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss your project requirements and create something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/projects/${project.id}/order`}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Order Similar Project
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 