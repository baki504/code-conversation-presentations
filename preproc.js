const resolvePlantUml = require("./resolver/PlantUmlResolver");

module.exports = (markdown, options) =>
  new Promise((resolve, reject) => resolve(resolvePlantUml(markdown)));
