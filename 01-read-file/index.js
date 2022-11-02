const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const filePath = path.join(__dirname,"text.txt");
stdout.write("Полный путь для файла:"+"\n");
stdout.write(filePath+"\n");

let readableStream = fs.createReadStream( filePath,'utf8' );

readableStream.on("data", function(chunk){
    console.log(chunk);
});
