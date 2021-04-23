const resolvePlantuml = require("./processor/PlantUmlResolver");

module.exports = (markdown, options) =>
  new Promise((resolve, reject) => resolve(resolvePlantuml(markdown)));
