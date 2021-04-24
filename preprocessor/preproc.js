const resolvePlantuml = require("./resolver/PlantUmlResolver");

module.exports = (markdown, options) =>
  new Promise((resolve, reject) => resolve(resolvePlantuml(markdown, options)));
