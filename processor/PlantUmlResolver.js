const fs = require("fs");
const md5 = require("md5");
const nodePlantUml = require("node-plantuml");

const plantUmlDir = "./src/img/plantuml";
if (!fs.existsSync(plantUmlDir)) {
  fs.mkdirSync(plantUmlDir);
}

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
const resolvePlantUml = (markdown) =>
  // todo:
  // const plantUmlScripts = markdown.replace(...)
  markdown.replace(/```plantuml\s*([\s\S]*?)```/gim, (match, text, offset) => {
    console.log(text);

    const imageName = `${md5(text)}.png`;
    const imagePath = `${plantUmlDir}/${imageName}`;

    if (!fs.existsSync(imagePath)) {
      const generated = nodePlantUml.generate(text);
      generated.out.pipe(fs.createWriteStream(imagePath));
      console.log(`Save as: ${imagePath}`);
    } else {
      console.log(`File already exists: ${imagePath}`);
    }

    return `<img src="./img/plantuml/${imageName}" alt="uml_diagram" />`;
  });

module.exports = resolvePlantUml;
