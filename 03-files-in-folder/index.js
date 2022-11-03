const fs = require('fs');
const path = require('path');

const { stdin, stdout } = require('process');
const dirPath = path.join(__dirname, "secret-folder");


fs.readdir(dirPath,
  { withFileTypes: true },
  (err, files) => {
    console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          let fileName = path.parse(file.name).name;
          let fileExt = path.parse(file.name).ext.slice(1);
          fs.stat(path.join(dirPath, file.name), (err, fileStats) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${fileName} - ${fileExt} -  ${(fileStats.size) / 1024}kb`);
            }
          });
        }
      })
    }
  })
