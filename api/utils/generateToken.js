const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

const generateToken = (userId, role = 'user') => {
  return jwt.sign(
    { 
      id: userId,
      role: role,
      iat: Math.floor(Date.now() / 1000)
    },
    config.jwt.secret,
    { 
      expiresIn: config.jwt.expiresIn 
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Invalid token format');
  }
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};
