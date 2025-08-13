// middleware/validators.js
import { body } from 'express-validator';

// Simple email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simple password validation function
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// User registration validation
export const registerValidator = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// User login validation
export const loginValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

// Score submission validation
export const scoreValidator = [
  body('score')
    .notEmpty().withMessage('Score is required')
    .isNumeric().withMessage('Score must be a number')
    .custom(value => value >= 0).withMessage('Score must be positive'),
];
