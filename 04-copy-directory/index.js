const fs = require('fs');
const path = require('path');

// const { stdin, stdout } = require('process');
const dirSrc = path.join(__dirname,"files");
const dirDst = path.join(__dirname,"files-copy");

copyDir(dirSrc,dirDst);

function copyDir(src,dst) {

    fs.mkdir(dst, { recursive: true }, error => {
        if (error) {
          throw error;
        }
        fs.readdir(src, { withFileTypes: true }, (err, files) => {
            if (err)
           console.log(err);
          else {
             console.log(err,files); 
          }
    });
      });   
}


