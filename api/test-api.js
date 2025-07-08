const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test API connection
async function testAPI() {
  try {
    console.log('🔍 Testing API connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test public endpoints
    console.log('\n📊 Testing public endpoints...');
    
    try {
      const projectsResponse = await axios.get(`${API_BASE_URL}/projects`);
      console.log('✅ Projects endpoint:', projectsResponse.data.data?.length || 0, 'projects found');
    } catch (error) {
      console.log('❌ Projects endpoint error:', error.response?.data?.message || error.message);
    }
    
    try {
      const servicesResponse = await axios.get(`${API_BASE_URL}/services`);
      console.log('✅ Services endpoint:', servicesResponse.data.data?.length || 0, 'services found');
    } catch (error) {
      console.log('❌ Services endpoint error:', error.response?.data?.message || error.message);
    }
    
    try {
      const blogResponse = await axios.get(`${API_BASE_URL}/blog`);
      console.log('✅ Blog endpoint:', blogResponse.data.data?.length || 0, 'posts found');
    } catch (error) {
      console.log('❌ Blog endpoint error:', error.response?.data?.message || error.message);
    }
    
    console.log('\n🎉 API connection test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Create an admin user account');
    console.log('2. Login to get authentication token');
    console.log('3. Use the token to access admin endpoints');
    console.log('4. Create sample data for testing');
    
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the API server is running on port 5000');
    console.log('2. Check if MongoDB is connected');
    console.log('3. Verify environment variables are set correctly');
  }
}

// Create sample data (requires authentication)
async function createSampleData(token) {
  if (!token) {
    console.log('❌ Authentication token required for creating sample data');
    return;
  }
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
  try {
    console.log('\n📝 Creating sample data...');
    
    // Create sample services
    const sampleServices = [
      {
        title: "Web Development",
        shortDescription: "Custom website development with modern technologies",
        description: "Full-stack web development using React, Node.js, and MongoDB",
        category: "web-development",
        icon: "🌐",
        image: "https://via.placeholder.com/400x300",
        features: [
          { title: "Responsive Design", description: "Mobile-first approach", icon: "📱" },
          { title: "SEO Optimization", description: "Search engine friendly", icon: "🔍" },
          { title: "Performance", description: "Fast loading times", icon: "⚡" }
        ],
        pricing: {
          basic: { name: "Basic", price: 999, features: ["5 pages", "Contact form", "Basic SEO"] },
          professional: { name: "Professional", price: 1999, features: ["10 pages", "CMS", "Advanced SEO"], popular: true },
          enterprise: { name: "Enterprise", price: 3999, features: ["Unlimited pages", "Custom features", "Priority support"] }
        },
        isActive: true,
        isFeatured: true,
        order: 1
      },
      {
        title: "Mobile App Development",
        shortDescription: "Native and cross-platform mobile applications",
        description: "iOS and Android app development using React Native and Flutter",
        category: "mobile-development",
        icon: "📱",
        image: "https://via.placeholder.com/400x300",
        features: [
          { title: "Cross-platform", description: "iOS and Android", icon: "🔄" },
          { title: "Native Performance", description: "Optimized for speed", icon: "⚡" },
          { title: "App Store Ready", description: "Publishing support", icon: "📦" }
        ],
        pricing: {
          basic: { name: "Basic", price: 2999, features: ["Core features", "Basic UI", "Testing"] },
          professional: { name: "Professional", price: 4999, features: ["Advanced features", "Custom UI", "Analytics"], popular: true },
          enterprise: { name: "Enterprise", price: 8999, features: ["Full features", "Premium UI", "Maintenance"] }
        },
        isActive: true,
        isFeatured: true,
        order: 2
      }
    ];
    
    for (const service of sampleServices) {
      try {
        await axios.post(`${API_BASE_URL}/services`, service, { headers });
        console.log(`✅ Created service: ${service.title}`);
      } catch (error) {
        console.log(`❌ Failed to create service ${service.title}:`, error.response?.data?.message || error.message);
      }
    }
    
    // Create sample blog posts
    const samplePosts = [
      {
        title: "Getting Started with MERN Stack Development",
        excerpt: "Learn the basics of MERN stack development and build your first full-stack application",
        content: "MERN stack is a popular JavaScript framework for building web applications. It consists of MongoDB, Express.js, React, and Node.js...",
        featuredImage: "https://via.placeholder.com/800x400",
        category: "web-development",
        tags: ["MERN", "JavaScript", "React", "Node.js"],
        status: "published",
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: "MERN Stack Development Guide",
          metaDescription: "Complete guide to MERN stack development",
          keywords: ["MERN", "web development", "JavaScript"]
        }
      },
      {
        title: "Best Practices for UI/UX Design in 2024",
        excerpt: "Discover the latest trends and best practices in UI/UX design",
        content: "User experience design has evolved significantly over the years. In 2024, we're seeing new trends emerge...",
        featuredImage: "https://via.placeholder.com/800x400",
        category: "ui-ux-design",
        tags: ["UI/UX", "Design", "Trends", "2024"],
        status: "published",
        isFeatured: true,
        isPublished: true,
        seo: {
          metaTitle: "UI/UX Design Best Practices 2024",
          metaDescription: "Latest trends in UI/UX design",
          keywords: ["UI/UX", "design", "trends"]
        }
      }
    ];
    
    for (const post of samplePosts) {
      try {
        await axios.post(`${API_BASE_URL}/blog`, post, { headers });
        console.log(`✅ Created blog post: ${post.title}`);
      } catch (error) {
        console.log(`❌ Failed to create blog post ${post.title}:`, error.response?.data?.message || error.message);
      }
    }
    
    console.log('\n🎉 Sample data creation completed!');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  }
}

// Main execution
if (require.main === module) {
  testAPI();
  
  // Uncomment the line below and provide a valid token to create sample data
  // createSampleData('your-auth-token-here');
}

module.exports = { testAPI, createSampleData }; 