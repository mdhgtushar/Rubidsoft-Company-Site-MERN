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
      description: "We stay ahead of technology trends to deliver cutting-edge enterprise solutions",
      icon: "🚀",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Quality",
      description: "Every project meets the highest standards of excellence and performance",
      icon: "⭐",
      color: "from-green-600 to-green-700"
    },
    {
      title: "Reliability",
      description: "Consistent delivery and dependable support for our enterprise clients",
      icon: "🛡️",
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "Collaboration",
      description: "Working closely with clients to achieve shared success in development",
      icon: "🤝",
      color: "from-red-600 to-red-700"
    }
  ];

  const achievements = [
    { number: "200+", label: "Enterprise Solutions", icon: "🏢" },
    { number: "50+", label: "Corporate Clients", icon: "💼" },
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "24/7", label: "Enterprise Support", icon: "🛟" }
  ];

  const technologies = [
    { name: "React.js", icon: "⚛️", color: "from-blue-600 to-blue-700" },
    { name: "Node.js", icon: "🖥️", color: "from-green-600 to-green-700" },
    { name: "MongoDB", icon: "🗄️", color: "from-purple-600 to-purple-700" },
    { name: "AWS", icon: "☁️", color: "from-red-600 to-red-700" },
    { name: "TypeScript", icon: "📘", color: "from-indigo-600 to-indigo-700" },
    { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-600 to-cyan-700" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            About Rubidsoft
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
            We are a team of passionate developers, designers, and strategists dedicated to 
            transforming businesses through innovative enterprise development solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To empower businesses with cutting-edge digital solutions that drive growth, 
                efficiency, and competitive advantage in the modern marketplace.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe that every business deserves access to world-class technology 
                that can transform their operations and accelerate their success.
              </p>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Vision
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To be the leading provider of enterprise-grade web development solutions, 
                known for innovation, reliability, and exceptional client success.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                We envision a future where technology seamlessly integrates with business 
                processes to create unprecedented opportunities for growth and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and relationships with clients
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="text-center group"
              >
                <div className={`w-20 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals passionate about delivering exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 shadow-lg group"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                    <span className="text-4xl">{member.image}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg">
                    {member.role}
                  </p>
                </div>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed text-center">
                  {member.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.technologies.map((tech, idx) => (
                    <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven track record of delivering exceptional results for enterprise clients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl">{achievement.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
                  {achievement.number}
                </div>
                <div className="text-gray-700 font-medium text-lg">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies We Master
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge tools and frameworks for building robust enterprise solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-3xl">{tech.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Let's discuss how our enterprise development solutions can help you achieve 
            your business goals and drive digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Get Started Today
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 