// ---- Simple client-side password gate (casual protection) ----
// Default password is "pikachu123".  SHA-256 (hex):
const PASSWORD_HASH_HEX = "6684f295e425b294e837372f4fb29160e2bb8c0c07c5d42057cc6b28fd676d05";

async function sha256Hex(str){
  const data = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(digest);
  return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('');
}

const form = document.getElementById('lockForm');
const input = document.getElementById('pwd');
const msg = document.getElementById('msg');
const content = document.getElementById('secretContent');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';
  try{
    const hash = await sha256Hex(input.value);
    if(hash === PASSWORD_HASH_HEX){
      content.classList.remove('hidden');   // reveal content
      form.parentElement.style.display = 'none';
    } else {
      msg.textContent = 'Incorrect password.';
    }
  }catch(err){
    msg.textContent = 'Error: your browser may not support Web Crypto.';
  }
});
