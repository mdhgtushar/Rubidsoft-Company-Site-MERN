const nodemailer = require('nodemailer');
const config = require('../config/app.config');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465, // true for 465, false for other ports
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  });
};

// Email templates
const emailTemplates = {
  // Welcome email
  welcome: (user) => ({
    subject: 'Welcome to Rubidsoft!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Rubidsoft!</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with Rubidsoft. We're excited to have you on board!</p>
        <p>You can now access your account and explore our services.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" 
           style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Login to Your Account
        </a>
        <p>Best regards,<br>The Rubidsoft Team</p>
      </div>
    `
  }),

  // Password reset
  passwordReset: (user, resetToken) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello ${user.name},</p>
        <p>You requested a password reset for your Rubidsoft account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}" 
           style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Rubidsoft Team</p>
      </div>
    `
  }),

  // Order confirmation
  orderConfirmation: (order) => ({
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmation</h2>
        <p>Hello ${order.customer.name},</p>
        <p>Thank you for your order! We've received your request and will begin working on it soon.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Order Details:</h3>
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          <p><strong>Service:</strong> ${order.serviceDetails?.title || 'Custom Service'}</p>
          <p><strong>Package:</strong> ${order.package}</p>
          <p><strong>Total Amount:</strong> $${order.pricing.totalPrice}</p>
          <p><strong>Status:</strong> ${order.status}</p>
        </div>
        
        <p>We'll keep you updated on the progress of your project.</p>
        <p>Best regards,<br>The Rubidsoft Team</p>
      </div>
    `
  }),

  // Contact form notification
  contactNotification: (contact) => ({
    subject: `New Contact Form Submission - ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          <p><strong>Company:</strong> ${contact.company || 'N/A'}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 10px; border-radius: 3px;">${contact.message}</p>
        </div>
        
        <p>Please respond to this inquiry as soon as possible.</p>
      </div>
    `
  }),

  // Task assignment
  taskAssignment: (task, user) => ({
    subject: `New Task Assigned - ${task.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Task Assigned</h2>
        <p>Hello ${user.name},</p>
        <p>A new task has been assigned to you.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Task Details:</h3>
          <p><strong>Title:</strong> ${task.title}</p>
          <p><strong>Description:</strong> ${task.description}</p>
          <p><strong>Priority:</strong> ${task.priority}</p>
          <p><strong>Due Date:</strong> ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
          <p><strong>Estimated Hours:</strong> ${task.estimatedHours || 'Not set'}</p>
        </div>
        
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/tasks" 
           style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View Task
        </a>
      </div>
    `
  }),

  // Blog comment notification
  commentNotification: (blog, comment) => ({
    subject: `New Comment on Blog Post - ${blog.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Blog Comment</h2>
        <p>A new comment has been posted on your blog post.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Comment Details:</h3>
          <p><strong>Blog Post:</strong> ${blog.title}</p>
          <p><strong>Commenter:</strong> ${comment.name}</p>
          <p><strong>Email:</strong> ${comment.email}</p>
          <p><strong>Comment:</strong></p>
          <p style="background-color: white; padding: 10px; border-radius: 3px;">${comment.comment}</p>
        </div>
        
        <p>Please review and approve/reject this comment.</p>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data = {}) => {
  try {
    const transporter = createTransporter();
    
    // Get template
    const emailTemplate = typeof template === 'string' ? emailTemplates[template](data) : template;
    
    const mailOptions = {
      from: config.email.from,
      to: to,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send bulk email
const sendBulkEmail = async (recipients, template, data = {}) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = typeof template === 'string' ? emailTemplates[template](data) : template;
    
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: config.email.from,
          to: recipient,
          subject: emailTemplate.subject,
          html: emailTemplate.html
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({ recipient, success: true, messageId: info.messageId });
      } catch (error) {
        results.push({ recipient, success: false, error: error.message });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error sending bulk email:', error);
    return { success: false, error: error.message };
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  emailTemplates,
  verifyEmailConfig
}; 