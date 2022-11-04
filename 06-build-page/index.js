const fs = require('fs/promises');
const path = require('path');

const dirDst = path.join(__dirname, "project-dist");

(async () => {
  try {
    await fs.rm(path.join(__dirname, "project-dist"), { recursive: true, maxRetries: 2, retryDelay: 100 });
    await fs.mkdir(path.join(__dirname, "project-dist"),);

    let template = await fs.readFile(path.join(__dirname, "template.html"), "utf-8");
    let components = [];
    const htmlFiles = await fs.readdir(path.join(__dirname, "components"), { withFileTypes: true },);

    for (file of htmlFiles) {
      const name = path.parse(file.name).name;
      if (file.isFile() && path.parse(file.name).ext === ".html") {
        components.push([name, await fs.readFile(path.join(__dirname, "components", file.name), "utf-8")]);
      }
    }

    components.forEach(htmlComponent => {
      let regExp = new RegExp(`{{${htmlComponent[0]}}}`, 'g');
      template = template.replace(regExp, htmlComponent[1]);
    })

    await fs.writeFile(path.join(dirDst, "index.html"), template);
    console.log("Create html file completed successfully (index.html)")

    mergeCss(path.join(__dirname, "styles"), dirDst);
    copyAssets(path.join(__dirname, "assets"), path.join(__dirname, "project-dist", "assets"));
  } catch (error) {
    console.log(`Error: ${error}`);
  }
  console.log(`All done!`);
}
)();

async function mergeCss(src, dst) {
  try {
    const files = await fs.readdir(src, { withFileTypes: true },);
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === ".css") {
        const data = await fs.readFile(path.join(src, file.name,));
        await fs.appendFile(path.join(dst, "style.css"), data);
      }
    }
    console.log(`File creation completed successfully (styles.css)`);
  } catch (error) {
    console.log(`Error: ${error}. Can not create css.file`);
  }
};

async function copyAssets(src, dst) {
  try {
    const files = await fs.readdir(src, { withFileTypes: true },);
    await fs.mkdir(dst);
    for (let file of files) {
      if (file.isDirectory()) {
        await copyAssets(path.join(src, file.name), path.join(dst, file.name))
      } else {
        await fs.copyFile(path.join(src, file.name), path.join(dst, file.name));
      }
    }

  } catch {
    console.log(`Error: ${error}. Can not sync directory.`);
  }
  // console.log(`Copy folder completed successfully ${dst}`)
};