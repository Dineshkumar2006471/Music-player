const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

let currentSongIndex = 0;
let isPlaying = false;

// Load song
function loadSong(element) {
  const src = element.getAttribute("data-src");
  const title = element.getAttribute("data-title");
  const artist = element.getAttribute("data-artist");

  audio.src = src;
  songTitle.textContent = title;
  songArtist.textContent = artist;
}

// Play or Pause
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update Progress
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
});

// Seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume Control
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Playlist
playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    loadSong(e.target);
    playSong();
  }
});

// Next / Prev
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
  loadSong(playlist.children[currentSongIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + playlist.children.length) % playlist.children.length;
  loadSong(playlist.children[currentSongIndex]);
  playSong();
});

// Auto Play Next Song
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load first song by default
loadSong(playlist.children[currentSongIndex]);
