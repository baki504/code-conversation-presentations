const fs = require("fs");
const md5 = require("md5");
const nodePlantUml = require("node-plantuml");

const MARKDOWN_DIR = "src";
const OUTPUT_DIR_FROM_PROJECT_ROOT = `${MARKDOWN_DIR}/img/plantuml`;
const OUTPUT_DIR_FROM_MARKDOWN = "img/plantuml";

/**
 * Returns markdown name without the extension by searching for markdown file which has same string.
 * @param {string} markdown - The markdown string.
 * @returns {string} - The markdownBaseName or null.
 */
const getMarkdownName = (markdown) => {
  const markdownBaseName = fs
    .readdirSync(MARKDOWN_DIR)
    .filter((fileName) => fileName.match(/\.md$/))
    .filter(
      (markdownName) =>
        markdown ===
        fs.readFileSync(`${MARKDOWN_DIR}/${markdownName}`).toString()
    )
    .toString();

  return markdownBaseName ? markdownBaseName.replace(".md", "") : null;
};

/**
 * Returns file names which name is starts with target pattern.
 * @param {string} directory - The directory includes some files.
 * @param {string} pattern - The target file name pattern.
 * @returns {string[]} - The file names.
 */
const getFileNames = (directory, pattern) =>
  fs.readdirSync(directory).filter((pngName) => pngName.startsWith(pattern));

/**
 * Remove old png(s) which is not included new png(s) in output directory.
 * @param {string[]} oldPngNames - The old PNG names.
 * @param {string[]} newPngNames - The new PNG names.
 * @param {string} outputDirectory - The PNG output Directory.
 */
const removePng = (oldPngNames, newPngNames, outputDirectory) =>
  oldPngNames
    .filter((pngName) => !newPngNames.includes(pngName))
    .forEach((unlinkedPngName) => {
      fs.unlinkSync(`${outputDirectory}/${unlinkedPngName}`);
      console.log(`Removed a file. [${unlinkedPngName}]`);
    });

/**
 * Generate PNG image from PlantUML-scripts
 * and returns markdown which resolved that script as HTML <img> tag.
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
 * When markdown name is "sample_presentation.md", resolve script as img tag:
 *  <img src="./img/plantuml/sample_presentation_4c8be04e57cb238d2350a59933e4cc0f.png" alt="plantuml_diagram" />
 *
 * @param {string} markdown - The markdown string.
 * @returns {string} - The markdown string with PlantUML-scripts resolved by img tag
 */
const resolvePlantUml = (markdown) => {
  console.log("Starts PlantUmlResolver process.");

  if (!fs.existsSync(OUTPUT_DIR_FROM_PROJECT_ROOT)) {
    fs.mkdirSync(OUTPUT_DIR_FROM_PROJECT_ROOT);
    console.log(`Created new PlantUML dir. [${OUTPUT_DIR_FROM_PROJECT_ROOT}]`);
  }

  const markdownName = getMarkdownName(markdown);
  const oldPngNames = getFileNames(OUTPUT_DIR_FROM_PROJECT_ROOT, markdownName);
  const newPngNames = [];

  const resolvedMarkdown = markdown.replace(
    /```plantuml\s*([\s\S]*?)```/gim,
    (match, plantumlScript) => {
      console.log(`Target script: \n${plantumlScript}`);
      const pngName = `${markdownName}_${md5(plantumlScript)}.png`;
      const plantumlPngPath = `${OUTPUT_DIR_FROM_PROJECT_ROOT}/${pngName}`;

      if (!fs.existsSync(plantumlPngPath)) {
        const umlDiagram = nodePlantUml.generate(plantumlScript);
        umlDiagram.out.pipe(fs.createWriteStream(plantumlPngPath));
        console.log(`Saved UML diagram as PNG. [${plantumlPngPath}]`);
      } else {
        console.log(`UML diagram already exists. [${plantumlPngPath}]`);
      }

      newPngNames.push(pngName);
      return `<img src="${OUTPUT_DIR_FROM_MARKDOWN}/${pngName}" alt="uml_diagram" />`;
    }
  );

  removePng(oldPngNames, newPngNames, OUTPUT_DIR_FROM_PROJECT_ROOT);

  console.log("Ends PlantUmlResolver process.");
  return resolvedMarkdown;
};

module.exports = resolvePlantUml;
