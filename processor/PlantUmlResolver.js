const fs = require("fs");
const md5 = require("md5");
const nodePlantUml = require("node-plantuml");

const MARKDOWN_DIR = process.env.MARKDOWN_DIR;
const IMAGE_DIR = process.env.IMAGE_DIR;
const PLANTUML_DIR = process.env.PLANTUML_DIR;

/**
 * Generate PNG image from PlantUML-scripts
 * and resolve that script in markdown as HTML <img> tag.
 * This PNG image name is named automatically with md5 hash of target script.
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
  const plantUmlDir = `${MARKDOWN_DIR}/${IMAGE_DIR}/${PLANTUML_DIR}`;

  // if (fs.existsSync(plantUmlDir)) {
  //   fs.rmdirSync(plantUmlDir, { recursive: true });
  // }
  // fs.mkdirSync(plantUmlDir);

  markdown.replace(/```plantuml\s*([\s\S]*?)```/gim, (match, text) => {
    const imageName = `${md5(text)}.png`;
    const plantumlImagePath = `${plantUmlDir}/${imageName}`;

    if (!fs.existsSync(plantumlImagePath)) {
      const umlDiagram = nodePlantUml.generate(text);
      umlDiagram.out.pipe(fs.createWriteStream(plantumlImagePath));
      console.log(`Save as: ${plantumlImagePath}`);
    } else {
      // console.log(`File already exists: ${plantumlImagePath}`);
    }

    return `<img src="${IMAGE_DIR}/${PLANTUML_DIR}/${imageName}" alt="uml_diagram" />`;
  });
};

module.exports = resolvePlantUml;
