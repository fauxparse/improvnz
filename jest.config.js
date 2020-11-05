module.exports = {
  roots: ['<rootDir>/app/javascript'],
  transform: {
    '\\.tsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/app/javascript/**/?(*.)test.{ts,tsx}'],
  moduleDirectories: ['node_modules', 'app/javascript'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
