const fs = require('fs');
const path = require('path');

const dirSrc = path.join(__dirname, "files");
const dirDst = path.join(__dirname, "files-copy");

copyDir(dirSrc, dirDst);

function copyDir(src, dst) {
  fs.rm(dst, { recursive: true, maxRetries: 3, retryDelay: 100 }, () => {
    fs.mkdir(dst, { recursive: true }, error => {
      if (error) throw error;
      fs.readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) console.log(err)
        else {
          files.forEach(file => {
            if (file.isFile()) {
              fs.copyFile(path.join(src, file.name), path.join(dst, file.name), (error) => {
                if (error) throw error;
                console.log(`File: ${file.name} successfully copied`);
              });
            }
          });
        }
      });
    });
  });
}
