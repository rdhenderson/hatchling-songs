const fs = require("fs");
var [dir] = process.argv.slice(2);
// Read the contents of the current directory synchronously
console.log(dir);
const files = fs.readdirSync(dir);
files.forEach((file) => {
  if (file.includes(" ")) {
    const newFile = file.replace(/ /g, "_");
    fs.renameSync(`./${dir}/${file}`, `./${dir}/${newFile}`);
  }
});
