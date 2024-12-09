const { dir } = require("console");
const fs = require("fs");

function generateSongArray(dir) {
  const files = fs.readdirSync(dir);
  const songs = files
    .filter((file) => !file.endsWith(".json"))
    .map((file) => {
      const [title] = url.replace(/_/g, " ").split(".");
      return { title, url: file };
    });
  return songs;
}

function updateFileNames(dir) {
  // Read the contents of the current directory synchronously
  const files = fs.readdirSync(dir);
  files
    .filter((file) => !file.endsWith(".json"))
    .forEach((file) => {
      if (file.includes(" ")) {
        const newFile = file.replace(/ /g, "_");
        fs.renameSync(`./${dir}/${file}`, `./${dir}/${newFile}`);
      }
    });
}

if (require.main === module) {
  console.log("Running");
  const [dirToUpdate] = process.argv.slice(2);
  updateFileNames(dirToUpdate);
  const songList = generateSongArray(dirToUpdate);
  fs.writeFileSync(
    `./${dirToUpdate}/song-list.json`,
    JSON.stringify(songList, null, 2)
  );
  console.log(JSON.stringify(songList, null, 2));
}
