
window.addEventListener('DOMContentLoaded', () => {
  const echo = document.getElementById('echo');
  if (!echo) return;

  echo.addEventListener('click', () => {
    console.log('Tapped: color pulse');
    echo.setAttribute('exposure', '1.8');
    setTimeout(() => echo.setAttribute('exposure', '1.2'), 300);
  });

  // Simulated proximity trigger after 5 seconds
  setTimeout(() => {
    console.log('Auto-proximity hue shift');
    echo.setAttribute('shadow-intensity', '2.0');
    setTimeout(() => echo.setAttribute('shadow-intensity', '1.0'), 500);
  }, 5000);
});
