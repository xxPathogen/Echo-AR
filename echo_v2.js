
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
// Optional: expose via global
window.setEchoState = setEchoState;
window.triggerGlitch = triggerGlitch;
