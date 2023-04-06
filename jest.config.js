module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  preset: "ts-jest",
  
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '.+\\.css$': '<rootDir>/__mocks__/styleMocks.js',
    "^.+\\.svg$": "<rootDir>/svgTransform.js"
 },
}