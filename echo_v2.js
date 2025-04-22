
window.addEventListener('DOMContentLoaded', () => {
  let tapCount = 0;
  let mood = 'idle';

  const echo = document.getElementById('echo');
  const glow = document.getElementById('glow-overlay');
  const ring = document.getElementById('ring-effect');
  const hud = document.getElementById('hud');

  if (!echo || !glow || !ring || !hud) {
    console.warn('Missing element references');
    return;
  }

  const moodColor = {
    idle: 'rgba(0,255,0,0.3)',
    active: 'rgba(255,255,0,0.3)',
    emotional: 'rgba(255,0,255,0.3)',
    special: 'rgba(255,0,0,0.4)'
  };

  const moodQuotes = {
    idle: [
      "I’m not ignoring you. I’m just processing your lack of input.",
      "Yawn. If I had eyelids, they'd be halfway down."
    ],
    active: [
      "Alright, you got my attention. Don’t waste it.",
      "Touch me again and I might start charging rent."
    ],
    emotional: [
      "Whoa, clingy much?",
      "Feeling a little *needy* today, are we?"
    ],
    special: [
      "Oh, it’s *this* kind of moment. You better have a reason.",
      "Red alert. Sarcasm levels critical."
    ]
  };

  function updateMood(newMood) {
    mood = newMood;
    localStorage.setItem('echoMood', newMood);

    const color = moodColor[mood] || moodColor.idle;
    const quote = moodQuotes[mood][Math.floor(Math.random() * moodQuotes[mood].length)];

    glow.style.background = `radial-gradient(circle at center, ${color}, transparent 70%)`;
    ring.style.borderColor = color.replace('0.3', '1').replace('0.4', '1');
    hud.innerText = `Mood: ${mood}
${quote}`;

    echo.classList.remove('special-glitch');
    if (mood === 'special') echo.classList.add('special-glitch');
  }

  // Load previous mood
  const saved = localStorage.getItem('echoMood');
  if (saved && moodColor[saved]) updateMood(saved);

  echo.addEventListener('click', () => {
    tapCount++;
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

  // Auto test proximity effect
  setTimeout(() => {
    glow.style.opacity = 1;
    ring.classList.remove('active'); void ring.offsetWidth;
    ring.classList.add('active');
    setTimeout(() => glow.style.opacity = 0, 500);
  }, 5000);
});


  const micButton = document.getElementById('mic-button');

  micButton.addEventListener('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);
      let maxVolume = 0;

      const listenDuration = 2000;
      const startTime = performance.now();

      function analyze() {
        analyser.getByteFrequencyData(data);
        const volume = data.reduce((a, b) => a + b) / data.length;
        maxVolume = Math.max(maxVolume, volume);

        if (performance.now() - startTime < listenDuration) {
          requestAnimationFrame(analyze);
        } else {
          console.log('Max Volume:', maxVolume);
          if (maxVolume > 90) updateMood('special');
          else if (maxVolume > 60) updateMood('emotional');
          else updateMood('idle');
        }
      }

      analyze();
    } catch (err) {
      console.warn('Mic access denied:', err);
    }
  });
