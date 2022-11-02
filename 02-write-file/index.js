const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const filePath = path.join(__dirname,"text.txt");
const writebleStream = fs.createWriteStream(filePath,'utf8' );


stdout.write("Hello! Enter text:\n"+
"Press 'Ctrl+C' or enter 'exit' for exit\n");

stdin.on("data", (data)=>{
if (data.toString().trim() === 'exit') process.exit();    
    writebleStream.write(data);  
});

process.on('exit', () => stdout.write('\nHave a nice day!\n(exit)\n'));
process.on('SIGINT', () => {
    stdout.write('\nHave a nice day!\n(Ctrl+C)\n'); 
    process.exit()
});