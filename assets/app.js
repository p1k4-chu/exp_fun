// current year
document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle (respects saved preference)
const themeToggle = document.getElementById('themeToggle');
const key = 'prefers-dark';
const root = document.documentElement;

const setDark = (on) => {
  if(on){
    root.style.setProperty('--bg', '#0b0d12');
    root.style.setProperty('--bg-soft', '#10131a');
    root.style.setProperty('--text', '#e7ecf3');
    root.style.setProperty('--muted', '#a8b0bf');
    document.body.classList.add('dark');
  } else {
    // light palette
    root.style.setProperty('--bg', '#f7f8fb');
    root.style.setProperty('--bg-soft', '#ffffff');
    root.style.setProperty('--text', '#0b1220');
    root.style.setProperty('--muted', '#5a657a');
    document.body.classList.remove('dark');
  }
  localStorage.setItem(key, on ? '1' : '0');
};

const stored = localStorage.getItem(key);
if(stored === null){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setDark(prefersDark);
}else{
  setDark(stored === '1');
}

themeToggle.addEventListener('click', () => setDark(!document.body.classList.contains('dark')));
