module.exports = {
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./setupTests.js'],
  setupFilesAfterEnv: ['./setupTests.js',"@testing-library/jest-dom/extend-expect"],
}
