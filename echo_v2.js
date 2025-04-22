
window.addEventListener('DOMContentLoaded', () => {
  let tapCount = 0;
  let mood = 'idle';

  const echo = document.getElementById('echo');
  const glow = document.getElementById('glow-overlay');
  const ring = document.getElementById('ring-effect');

  if (!echo || !glow || !ring) {
    console.warn('Missing orb or overlays');
    return;
  }

  const moodColor = {
    idle: 'rgba(0,255,0,0.3)',
    active: 'rgba(255,255,0,0.3)',
    emotional: 'rgba(255,0,255,0.3)',
    special: 'rgba(255,0,0,0.4)'
  };

  function updateMood(newMood) {
    console.log('Mood:', newMood);
    mood = newMood;
    localStorage.setItem('echoMood', newMood);
    glow.style.background = `radial-gradient(circle at center, ${moodColor[newMood]}, transparent 70%)`;
    ring.style.borderColor = moodColor[newMood].replace('0.3', '1').replace('0.4', '1');
  }

  const saved = localStorage.getItem('echoMood');
  if (saved && moodColor[saved]) {
    updateMood(saved);
  }

  echo.addEventListener('click', () => {
    tapCount++;
    console.log('Tap count:', tapCount);
    glow.style.opacity = 1;
    ring.classList.remove('active');
    void ring.offsetWidth;
    ring.classList.add('active');
    setTimeout(() => glow.style.opacity = 0, 300);

    if (tapCount === 1) updateMood('active');
    if (tapCount === 5) updateMood('emotional');
    if (tapCount === 10) {
      updateMood('special');
      tapCount = 0;
    }
  });

  // Auto-test
  setTimeout(() => {
    console.log('Auto-trigger: proximity');
    glow.style.opacity = 1;
    ring.classList.remove('active'); void ring.offsetWidth;
    ring.classList.add('active');
    setTimeout(() => glow.style.opacity = 0, 500);
  }, 5000);
});
