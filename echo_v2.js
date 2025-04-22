
function setEchoState(state) {
  const echo = document.getElementById('echo');
  echo.classList.remove('idle', 'active', 'special');
  echo.classList.add(state);
}

function triggerGlitch() {
  const echo = document.getElementById('echo');
  echo.classList.add('special');
  setTimeout(() => echo.classList.remove('special'), 1000);
}

// Echo interaction test logic
window.addEventListener('DOMContentLoaded', () => {
  const echo = document.getElementById('echo');
  if (!echo) return;

  echo.addEventListener('click', () => {
    console.log('Tapped!');
    echo.style.filter = 'brightness(1.5)';
    setTimeout(() => echo.style.filter = '', 300);
  });

  setTimeout(() => {
    console.log('Proximity auto-test triggered');
    echo.style.filter = 'hue-rotate(120deg)';
    setTimeout(() => echo.style.filter = '', 500);
  }, 5000);
});

window.setEchoState = setEchoState;
window.triggerGlitch = triggerGlitch;
