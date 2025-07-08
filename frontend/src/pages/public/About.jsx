import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Lead Developer",
      image: "👨‍💼",
      description: "10+ years of experience in full-stack development and project management",
      technologies: ["React.js", "Node.js", "MongoDB", "AWS"]
    },
    {
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      image: "👩‍💻",
      description: "Expert in React, Vue.js, and modern frontend technologies",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      name: "Mike Chen",
      role: "Backend Architect",
      image: "👨‍🔧",
      description: "Specialized in Node.js, Python, and database architecture",
      technologies: ["Node.js", "Python", "PostgreSQL", "Docker"]
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      image: "👩‍🎨",
      description: "Creating beautiful and intuitive user experiences",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"]
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge web solutions",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quality",
      description: "Every web project meets the highest standards of excellence and performance",
      icon: "⭐",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Reliability",
      description: "Consistent delivery and dependable support for our web development clients",
      icon: "🛡️",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Collaboration",
      description: "Working closely with clients to achieve shared success in web development",
      icon: "🤝",
      color: "from-orange-500 to-red-500"
    }
  ];

  const achievements = [
    { number: "200+", label: "Websites Built", icon: "🌐" },
    { number: "50+", label: "Happy Clients", icon: "😊" },
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "24/7", label: "Support Available", icon: "🛟" }
  ];

  const technologies = [
    { name: "React.js", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
    { name: "Node.js", icon: "🖥️", color: "from-emerald-500 to-teal-500" },
    { name: "MongoDB", icon: "🗄️", color: "from-purple-500 to-pink-500" },
    { name: "AWS", icon: "☁️", color: "from-orange-500 to-red-500" },
    { name: "TypeScript", icon: "📘", color: "from-indigo-500 to-blue-500" },
    { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-500 to-blue-500" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 rounded-3xl overflow-hidden mb-12 mx-4 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl">
            About Rubidsoft
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            We are a team of passionate web developers, designers, and strategists dedicated to 
            transforming businesses through innovative web development solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 mb-12 mx-4">
        <div className="px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To provide innovative, secure, and scalable web development solutions that help businesses 
                grow and succeed in the digital age. We combine cutting-edge web technologies with 
                industry best practices to deliver exceptional results.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our commitment is to understand your unique business challenges and create 
                tailored web solutions that drive real growth and measurable success.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600 mb-6 text-lg">
                To be the leading web development partner for businesses seeking digital transformation, 
                known for our innovation, reliability, and commitment to client success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                  <span className="text-slate-700 font-medium">Global web development leadership</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                  <span className="text-slate-700 font-medium">Innovation in web technologies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4"></div>
                  <span className="text-slate-700 font-medium">Client success partnership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white rounded-3xl mb-12 mx-4 shadow-xl border border-slate-100">
        <div className="px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence in web development
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <div className="text-slate-600 font-medium text-sm">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 mb-12 mx-4">
        <div className="px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Technology Stack
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Modern technologies we use to build exceptional web applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-110 transition-all duration-300`}>
                  <span className="text-2xl">{tech.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 mb-12 mx-4">
        <div className="px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do in web development
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-all duration-300`}>
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl mx-4 shadow-xl">
        <div className="px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Web Development Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Meet the talented web development professionals behind our success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">{member.image}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4 text-sm">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 