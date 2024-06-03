const musicButton = document.getElementById('music-button');
const backgroundMusic = document.getElementById('background-music');

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().then(() => {
      musicButton.innerHTML = '🎵 Music';
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  } else {
    backgroundMusic.pause();
    musicButton.innerHTML = '🔇 Muted';
  }
}