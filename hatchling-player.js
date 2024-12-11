// Update to import .js file from github and store song list in html data tag?
window.manageAudioPlayer = (teacherName, songList) => {
  const containerLabel = `#${teacherName}-player`;
  const _player = document.querySelector(`${containerLabel} #player`);
  const _playerSource = document.querySelector(
    `${containerLabel} #player-source`
  );
  const _playlist = document.querySelector(`${containerLabel} #playlist`);
  const _stop = document.querySelector(`${containerLabel} #stop`);
  const _label = document.querySelector(`${containerLabel} #now-playing`);
  const _next = document.querySelector(`${containerLabel} #next`);
  const _prev = document.querySelector(`${containerLabel} #previous`);
  const BASE_SONG_URL = `https://rdhenderson.github.io/hatchling-songs/teachers/${teacherName}`;

  songList.forEach((song) =>
    addSongToPlaylist(song.title, `${BASE_SONG_URL}/${song.url}`)
  );
  // Set default song src for player
  _playerSource.src = `${BASE_SONG_URL}/${songList[0].url}`;
  // preload the first song
  _player.load();
  // event listeners
  _stop.addEventListener("click", function () {
    console.log("Clicked stop");
    if (_player.paused) {
      _player.play();
    } else {
      _player.pause();
    }
  });

  _player.addEventListener("ended", playNext);
  _playlist.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "LI") {
      playlistItemClick(e.target);
    }
  });
  _next.addEventListener("click", playNext);
  _prev.addEventListener("click", playPrevious);

  // functions
  function addSongToPlaylist(title, source) {
    const li = document.createElement("li");
    li.classList.add("playListItem");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-download";
    const link = document.createElement("a");
    link.href = source;
    link.download = source.split("/").pop();
    link.appendChild(icon);
    li.innerText = `${title}`;
    li.setAttribute("data-src", source); // added line
    _playlist.appendChild(li);
  }
  function playlistItemClick(clickedElement) {
    const selected = _playlist.querySelector(".selected");
    if (selected) {
      selected.classList.remove("selected");
    }
    clickedElement.classList.add("selected");

    _player.src = clickedElement.getAttribute("data-src");
    _label.innerHTML = `Now Playing: ${clickedElement.innerHTML}`;
    _player.play();
  }

  function playNext() {
    var selected = _playlist.querySelector("li.selected");
    if (selected) {
      if (selected.nextElementSibling) {
        playlistItemClick(selected.nextElementSibling);
      } else if (selected.firstElementSibling) {
        playlistItemClick(selected.firstElementSibling);
      }
    }
  }
  function playPrevious() {
    var selected = _playlist.querySelector("li.selected");
    if (selected && selected.previousElementSibling) {
      playlistItemClick(selected.previousElementSibling);
    }
  }
};
