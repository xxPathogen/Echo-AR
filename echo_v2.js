
window.addEventListener('DOMContentLoaded', () => {
  const echo = document.getElementById('echo');
  const glow = document.getElementById('glow-overlay');
  const ring = document.getElementById('ring-effect');

  if (!echo) return;

  echo.addEventListener('click', () => {
    console.log('Tapped!');
    glow.style.opacity = 1;
    ring.classList.remove('active'); // reset
    void ring.offsetWidth; // force reflow
    ring.classList.add('active');
    setTimeout(() => (glow.style.opacity = 0), 300);
  });

  setTimeout(() => {
    console.log('Auto-trigger proximity flash');
    glow.style.opacity = 1;
    ring.classList.remove('active'); void ring.offsetWidth;
    ring.classList.add('active');
    setTimeout(() => (glow.style.opacity = 0), 500);
  }, 5000);
});
