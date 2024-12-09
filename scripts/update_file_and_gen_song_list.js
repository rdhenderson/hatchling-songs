const fs = require("fs");

function generateSongArray(directory) {
  const files = fs.readdirSync(`./teachers/${directory}`);
  const songs = files
    .filter((file) => !file.endsWith(".json"))
    .map((file) => {
      const [title] = file.replace(/_/g, " ").split(".");
      return { title, url: file };
    });
  return songs;
}

function updateFileNames(directory) {
  // Read the contents of the current directory synchronously
  const files = fs.readdirSync(`./teachers/${directory}`);
  files
    .filter((file) => !file.endsWith(".json"))
    .forEach((file) => {
      if (file.includes(" ")) {
        const newFile = file.replace(/ /g, "_");
        fs.renameSync(
          `./teachers/${directory}/${file}`,
          `./teachers/${directory}/${newFile}`
        );
      }
    });
}

if (require.main === module) {
  console.log("Running");
  const [dirToUpdate] = process.argv.slice(2);
  updateFileNames(dirToUpdate);
  const songList = generateSongArray(dirToUpdate);
  fs.writeFileSync(
    `./teachers/${dirToUpdate}/song-list.json`,
    JSON.stringify(songList, null, 2)
  );
  console.log(JSON.stringify(songList, null, 2));
}
