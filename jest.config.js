const nextJest = require("next/jest");
const wrapJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const jestConfig = {
  collectCoverageFrom: ["{app,components}/**/*.{js,ts}"],
  coverageThreshold: {
    global: {
      lines: 0,
      statements: 0,
      functions: 0,
      branches: 0,
    },
  },
};

module.exports = wrapJestConfig(jestConfig);
