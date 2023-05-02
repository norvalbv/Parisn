import type { Config } from 'jest';

export default (): Config => {
  return {
    clearMocks: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
      '!<rootDir>/src/**/*.d.ts',
      '!<rootDir>/src/cypress/**',
      '!<rootDir>/src/routes/**',
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      axios: '<rootDir>/node_modules/axios/dist/axios.min.js',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transformIgnorePatterns: ['/node_modules/(?!@aws-amplify|@aws-crypto|@aws-sdk|aws-amplify)'],
    watchPathIgnorePatterns: ['<rootDir>/src/cypress/'],
    moduleDirectories: ['node_modules', 'src'],
  };
};
