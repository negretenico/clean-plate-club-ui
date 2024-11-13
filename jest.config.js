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
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$": "<rootDir>/__mocks__/fileMocks.js",
 },
}