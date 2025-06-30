# Deployment Guide - Rubidsoft Company Site

<div align="center">

# 📚 Documentation Navigation

| [🏠 Home](./README.md) | [👤 User Guide](./user_guide.md) | [🛠️ Developer Guide](./developer_guide.md) | [🔌 API Docs](./api_documentation.md) | [🚀 Deployment](./deployment.md) | [🤝 Contributing](./contributing.md) |
|:---:|:---:|:---:|:---:|:---:|:---:|

</div>

---

Complete deployment guide for the Rubidsoft Company Site MERN stack application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Frontend Deployment](#frontend-deployment)
5. [Backend Deployment](#backend-deployment)
6. [Database Setup](#database-setup)
7. [Domain Configuration](#domain-configuration)
8. [SSL Certificate](#ssl-certificate)
9. [Monitoring](#monitoring)
10. [Backup Strategy](#backup-strategy)

## 🌐 Overview

This guide covers deploying the Rubidsoft Company Site to production environments. The application consists of:

- **Frontend**: React.js application
- **Backend**: Express.js API server
- **Database**: MongoDB database
- **Domain**: Custom domain with SSL

## 📋 Prerequisites

### Required Services
- **Hosting Provider**: Vercel, Netlify, or similar for frontend
- **Server Provider**: DigitalOcean, AWS, or similar for backend
- **Database Provider**: MongoDB Atlas or self-hosted MongoDB
- **Domain Provider**: Domain registration service
- **SSL Provider**: Let's Encrypt or hosting provider SSL

### Technical Requirements
- Node.js v14 or higher
- MongoDB v4.4 or higher
- Git for version control
- SSH access to server
- Domain management access

## ⚙️ Environment Setup

### Production Environment Variables

**Frontend Environment (.env.production)**
```
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
```

**Backend Environment (.env.production)**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rubidsoft_prod
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=30d
CORS_ORIGIN=https://your-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Security Considerations
- Use strong, unique passwords
- Generate secure JWT secrets
- Enable HTTPS everywhere
- Configure proper CORS origins
- Set up firewall rules

## 🎨 Frontend Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Configure build settings for React app

2. **Build Configuration**
   ```
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Environment Variables**
   - Add production environment variables
   - Configure API URL and other settings

4. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Configure DNS records as instructed

### Netlify Deployment

1. **Repository Connection**
   - Connect GitHub repository to Netlify
   - Configure build settings

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **Environment Variables**
   - Add production environment variables
   - Configure API endpoints

### Manual Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Upload build folder to web server
   - Configure web server (Apache/Nginx)

3. **Server Configuration**
   - Set up static file serving
   - Configure URL rewriting for React Router

## 🔧 Backend Deployment

### DigitalOcean Droplet Deployment

1. **Server Setup**
   - Create Ubuntu 20.04 droplet
   - Configure SSH access
   - Update system packages

2. **Node.js Installation**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/rubidsoft-company-site.git
   cd rubidsoft-company-site/api
   
   # Install dependencies
   npm install --production
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with production values
   
   # Start application
   npm start
   ```

4. **Process Management**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start application with PM2
   pm2 start index.js --name "rubidsoft-api"
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

### AWS EC2 Deployment

1. **Instance Setup**
   - Launch EC2 instance (Ubuntu recommended)
   - Configure security groups
   - Set up SSH access

2. **Application Deployment**
   - Follow similar steps as DigitalOcean
   - Configure AWS-specific settings

3. **Load Balancer Setup**
   - Configure Application Load Balancer
   - Set up health checks
   - Configure SSL certificates

### Docker Deployment

1. **Dockerfile Creation**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     api:
       build: ./api
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
       depends_on:
         - mongodb
     
     mongodb:
       image: mongo:5.0
       ports:
         - "27017:27017"
       volumes:
         - mongodb_data:/data/db
   
   volumes:
     mongodb_data:
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Cluster Creation**
   - Create MongoDB Atlas account
   - Set up new cluster
   - Configure network access

2. **Database Configuration**
   - Create database user
   - Set up IP whitelist
   - Get connection string

3. **Connection Setup**
   - Update environment variables
   - Test database connection
   - Set up database indexes

### Self-Hosted MongoDB

1. **Server Installation**
   ```bash
   # Install MongoDB
   sudo apt-get install mongodb
   
   # Start MongoDB service
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

2. **Security Configuration**
   - Create database user
   - Configure authentication
   - Set up firewall rules

3. **Backup Configuration**
   - Set up automated backups
   - Configure backup storage
   - Test backup restoration

## 🌍 Domain Configuration

### DNS Configuration

1. **A Records**
   ```
   @ -> Your server IP address
   api -> Your server IP address
   ```

2. **CNAME Records**
   ```
   www -> your-domain.com
   ```

3. **MX Records** (if using custom email)
   ```
   @ -> mail.your-domain.com
   ```

### Subdomain Setup

1. **API Subdomain**
   - Configure api.your-domain.com
   - Point to backend server
   - Set up SSL certificate

2. **CDN Configuration**
   - Set up CDN for static assets
   - Configure cache headers
   - Optimize delivery

## 🔒 SSL Certificate

### Let's Encrypt Setup

1. **Certbot Installation**
   ```bash
   sudo apt-get install certbot
   ```

2. **Certificate Generation**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   sudo certbot --nginx -d api.your-domain.com
   ```

3. **Auto-Renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Hosting Provider SSL

1. **Vercel/Netlify SSL**
   - Automatic SSL with custom domains
   - No additional configuration needed

2. **Cloudflare SSL**
   - Set up Cloudflare DNS
   - Enable SSL/TLS encryption
   - Configure security settings

## 📊 Monitoring

### Application Monitoring

1. **PM2 Monitoring**
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Health Checks**
   - Set up health check endpoints
   - Configure monitoring alerts
   - Track application metrics

3. **Error Tracking**
   - Implement error logging
   - Set up error notification
   - Monitor application performance

### Server Monitoring

1. **System Resources**
   - Monitor CPU usage
   - Track memory consumption
   - Monitor disk space

2. **Network Monitoring**
   - Track bandwidth usage
   - Monitor connection status
   - Set up uptime monitoring

## 💾 Backup Strategy

### Database Backups

1. **Automated Backups**
   ```bash
   # MongoDB backup script
   mongodump --uri="mongodb://username:password@host:port/database" --out=/backup/$(date +%Y%m%d)
   ```

2. **Backup Storage**
   - Local backup storage
   - Cloud backup storage
   - Regular backup testing

3. **Recovery Procedures**
   - Document recovery steps
   - Test backup restoration
   - Maintain backup logs

### Application Backups

1. **Code Backups**
   - Version control with Git
   - Regular repository backups
   - Multiple remote repositories

2. **Configuration Backups**
   - Backup environment files
   - Document configuration changes
   - Version control configuration

## 🚀 Post-Deployment

### Testing Checklist

1. **Functionality Testing**
   - Test all user features
   - Verify API endpoints
   - Check database connections

2. **Performance Testing**
   - Load testing
   - Response time monitoring
   - Resource usage analysis

3. **Security Testing**
   - SSL certificate verification
   - Security header checks
   - Vulnerability scanning

### Maintenance Tasks

1. **Regular Updates**
   - Update dependencies
   - Security patches
   - Performance optimizations

2. **Monitoring**
   - Check application logs
   - Monitor error rates
   - Track user metrics

3. **Backup Verification**
   - Test backup procedures
   - Verify backup integrity
   - Update backup schedules

---

## 📞 Support

For deployment assistance:
- **Email**: devops@rubidsoft.com
- **Documentation**: Check this guide first
- **Issues**: Report via GitHub issues

---

*Last updated: June 2024* 