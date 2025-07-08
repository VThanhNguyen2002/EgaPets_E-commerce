// Jest setup file
require('module-alias/register');

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DB_SERVER = 'test-server';
process.env.DB_DATABASE = 'test-db';
process.env.DB_USER = 'test-user';
process.env.DB_PASSWORD = 'test-password';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
process.env.CLOUDINARY_API_KEY = 'test-key';
process.env.CLOUDINARY_API_SECRET = 'test-secret';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};