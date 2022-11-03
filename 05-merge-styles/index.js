const fs = require('fs/promises');
const path = require('path');

const dirSrc = path.join(__dirname, "styles");
const dirDst = path.join(__dirname, "project-dist"); //bundle.css

mergeCss(dirSrc, dirDst);

async function mergeCss(src, dst) {
  try {
    const files = await fs.readdir(src, { withFileTypes: true },);
    for (const file of files) {
      if (file.isFile()) {
        if (path.extname(file.name) === ".css") {
          const data = await fs.readFile(path.join(src, file.name,));
          await fs.appendFile(path.join(dst, "bundle.css"), data);
        }
      }
    }
    console.log(`File creation completed successfully (bundle.css)`);
  } catch (error) {
    console.log(`Error: ${error}. Can not sync dirert.`);
  }
};