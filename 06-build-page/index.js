const fs = require('fs');
const path = require('path');

const dirSrc = path.join(__dirname,"styles");
const dirDst = path.join(__dirname,"project-dist"); //bundle.css

(async ()=>{
await syncDir (dirSrc,dirDst);

}
)();



async function syncDir (src,dst) {
try {
   await fs.rm(dst, { recursive: true },);
   await fs.mkdir(dst, { recursive: true },);
   const files = await fs.readdir(src, { withFileTypes: true },);
   files.forEach(file => {
    if(file.isFile()){
        if(path.extname(file)===".css"){

        }

    }

   });


} catch (error) {
    console.log(`Error: ${error}. Can not sync dirert.`);
}
};