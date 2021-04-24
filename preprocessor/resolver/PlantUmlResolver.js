const fs = require("fs");
const md5 = require("md5");
const nodePlantUml = require("node-plantuml");
const OUTPUT_DIR_FROM_PROJECT_ROOT = "src/img/plantuml";
const OUTPUT_DIR_FROM_MARKDOWN = "img/plantuml";

/**
 * Generate PNG image from PlantUML-scripts
 * and resolve that script in markdown as HTML <img> tag.
 * This PNG image name is named automatically with md5 hash of target script.
 * If old output directory exists before process start, remove and re-create a new one.
 *
 * e.g.
 * PlantUML-script:
 *  ```plantuml
 *  @startuml
 *  Bob1 -> Alice : hello
 *  @enduml
 *  ```
 *
 * resolved as img tag:
 *  <img src="./img/plantuml/4c8be04e57cb238d2350a59933e4cc0f.png" alt="uml_diagram" />
 *
 * @param {string} markdown
 * @returns {string} markdown with PlantUML-scripts resolved by img tag
 */
const resolvePlantUml = (markdown) => {
  console.log("!!!Starts PlantUmlResolver process.");

  if (!fs.existsSync(OUTPUT_DIR_FROM_PROJECT_ROOT)) {
    fs.mkdirSync(OUTPUT_DIR_FROM_PROJECT_ROOT);
    console.log(`Created new plantuml dir. [${OUTPUT_DIR_FROM_PROJECT_ROOT}]`);
  }

  const newImageNames = [];

  const resolvedMakdown = markdown.replace(
    /```plantuml\s*([\s\S]*?)```/gim,
    (match, text) => {
      console.log(`Target script: \n${text}`);
      const imageName = `${md5(text)}.png`;
      const plantumlImagePath = `${OUTPUT_DIR_FROM_PROJECT_ROOT}/${imageName}`;
      if (!fs.existsSync(plantumlImagePath)) {
        const umlDiagram = nodePlantUml.generate(text);
        umlDiagram.out.pipe(fs.createWriteStream(plantumlImagePath));
        console.log(`Saved UML diagram as PNG. [${plantumlImagePath}]`);
      } else {
        console.log(`Skiped UML diagram as PNG. [${plantumlImagePath}]`);
      }

      newImageNames.push(imageName);
      return `<img src="${OUTPUT_DIR_FROM_MARKDOWN}/${imageName}" alt="uml_diagram" />`;
    }
  );

  const oldImageNames = fs.readdirSync(OUTPUT_DIR_FROM_PROJECT_ROOT);
  console.log(oldImageNames);
  oldImageNames
    .filter((imageName) => !newImageNames.includes(imageName))
    .forEach((unlinkedImageName) => {
      fs.unlinkSync(`${OUTPUT_DIR_FROM_PROJECT_ROOT}/${unlinkedImageName}`);
      console.log(`Removed a file. [${unlinkedImageName}]`);
    });

  console.log("Ends PlantUmlResolver process.");
  return resolvedMakdown;
};

module.exports = resolvePlantUml;
