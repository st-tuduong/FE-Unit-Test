module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  duleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@app(.*)$': '<rootDir>/src/app$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@config(.*)$': '<rootDir>/src/config$1',
    '^@shared(.*)$': '<rootDir>/src/app/shared$1',
    '^@core(.*)$': '<rootDir>/src/app/core$1'
  },
};
