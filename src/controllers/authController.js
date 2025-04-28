const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

// For demo purposes, a hardcoded support user. In production, use a proper user DB.
const supportUser = {
  email: process.env.SUPPORT_EMAIL || 'support@example.com',
  passwordHash: process.env.SUPPORT_PASSWORD_HASH || '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // bcrypt hash of password
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (email !== supportUser.email) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, supportUser.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};
