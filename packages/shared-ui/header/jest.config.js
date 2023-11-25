const base = require("../../jest.config.base");
const packageJson = require("./package");

module.exports = {
  ...base,
  rootDir: "./../../",
  name: packageJson.name,
  displayName: packageJson.name,
};