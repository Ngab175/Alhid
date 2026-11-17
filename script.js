const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const openWorld = $("#openWorld");
const envelope = $("#envelope");
openWorld.addEventListener("click", () => {
  envelope.classList.add("open");
  $(".hero").classList.add("unlocked");
  openWorld.textContent = "Your little world is open ♡";
  $("#message").scrollIntoView({ behavior: "smooth", block: "start" });
});

// Mood checker
const moodMessages = {
  happy: "Yay! Simpan sedikit kebahagiaan hari ini untuk dikenang. Kamu pantas mendapat banyak hari seperti ini! 🌷",
  tired: "Istirahat dulu, ya. Kamu nggak harus menyelesaikan semuanya sekaligus. Take it easy. ☁️",
  sad: "It's okay not to be okay. Semoga hal kecil hari ini bisa membuatmu merasa lebih baik. Sending a virtual hug! ♡",
  chaos: "Tarik napas pelan-pelan. Satu per satu saja, kamu nggak harus memikirkan semuanya sekarang. 🍃"
};
$$(".mood-card").forEach(card => {
  card.addEventListener("click", () => {
    $$(".mood-card").forEach(item => item.classList.remove("selected"));
    card.classList.add("selected");
    $("#moodResponse").textContent = moodMessages[card.dataset.mood];
  });
});

// Plant flowers
const flowerMessages = [
  "Bunga pertama untuk hari yang lebih cerah 🌼",
  "Semoga hal baik tumbuh di sekitarmu 🌷",
  "Satu bunga, satu alasan untuk tersenyum 🌸",
  "You deserve lovely things! 🌻",
  "Garden complete! Jangan lupa bahagia, ya ♡"
];
let planted = 0;
$$(".flower-pot").forEach((pot, index) => {
  pot.addEventListener("click", () => {
    if (pot.classList.contains("planted")) return;
    pot.classList.add("planted");
    pot.querySelector(".flower").textContent = ["🌼", "🌷", "🌸", "🌻", "🌺"][index];
    planted++;
    $("#gardenMessage").textContent = flowerMessages[planted - 1];
    if (planted === 5) showToast("Yay! Your garden is blooming! ♡");
  });
});

// Catch the hearts game
let score = 0;
let gameRunning = false;
let moveTimer;
const field = $("#gameField");
const target = $("#heartTarget");
const intro = $("#gameIntro");
function moveHeart() {
  const maxX = Math.max(0, field.clientWidth - 55);
  const maxY = Math.max(0, field.clientHeight - 55);
  target.style.left = `${Math.random() * maxX}px`;
  target.style.top = `${Math.random() * maxY}px`;
}
function finishGame() {
  gameRunning = false;
  clearInterval(moveTimer);
  field.classList.remove("playing");
  intro.style.display = "flex";
  intro.innerHTML = `<span>🏆</span><p>You did it! 10 hearts collected!</p><button class="primary-btn small" id="playAgain" type="button">Play again ♡</button>`;
  $("#playAgain").addEventListener("click", resetGame);
  $("#gameStatus").textContent = "Completed!";
  showToast("Mission accomplished! You collected all the hearts.");
}
function resetGame() {
  score = 0;
  gameRunning = false;
  clearInterval(moveTimer);
  $("#heartScore").textContent = "0";
  $("#gameStatus").textContent = "Ready?";
  field.classList.remove("playing");
  intro.style.display = "flex";
  intro.innerHTML = `<span>💗</span><p>Siap mengumpulkan hati?</p><button class="primary-btn small" id="startGame" type="button">Let's play!</button>`;
  $("#startGame").addEventListener("click", startGame);
}
function startGame() {
  score = 0;
  gameRunning = true;
  $("#heartScore").textContent = score;
  $("#gameStatus").textContent = "Catch them!";
  intro.style.display = "none";
  field.classList.add("playing");
  moveHeart();
  clearInterval(moveTimer);
  moveTimer = setInterval(moveHeart, 950);
}
$("#startGame").addEventListener("click", startGame);
$("#resetGame").addEventListener("click", resetGame);
target.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  $("#heartScore").textContent = score;
  moveHeart();
  if (score >= 10) finishGame();
});

// Compliments
const compliments = [
  "You make ordinary days feel a little brighter. ♡",
  "Jangan lupa, kamu punya cara sendiri untuk membuat suasana jadi menyenangkan.",
  "Friendly reminder: kamu keren, bahkan saat kamu merasa biasa saja.",
  "Semoga hari ini memperlakukanmu sebaik kamu memperlakukan orang lain. 🌷",
  "Kalau senyum itu tugas, sepertinya kamu sudah ahli!",
  "The world is lucky to have a person like you in it."
];
let lastCompliment = 0;
$("#newCompliment").addEventListener("click", () => {
  let next = Math.floor(Math.random() * compliments.length);
  if (compliments.length > 1 && next === lastCompliment) next = (next + 1) % compliments.length;
  lastCompliment = next;
  const text = $("#complimentText");
  text.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300 });
  text.textContent = compliments[next];
});

// Gift reveal
$("#openGift").addEventListener("click", () => {
  $("#giftBox").textContent = "🎉";
  $("#finalMessage").hidden = false;
  $("#openGift").textContent = "Surprise opened ♡";
  $("#openGift").disabled = true;
  $("#finalMessage").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("#backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Optional music. Browser audio starts only after user interaction.
let audioContext;
let musicOn = false;
let musicTimer;
function playTone() {
  if (!audioContext || !musicOn) return;
  const notes = [523.25, 659.25, 783.99, 659.25];
  let index = 0;
  musicTimer = setInterval(() => {
    if (!musicOn) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = notes[index++ % notes.length];
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.32);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.34);
  }, 420);
}
$("#musicToggle").addEventListener("click", async () => {
  const button = $("#musicToggle");
  if (!musicOn) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) { showToast("Browser ini belum mendukung audio."); return; }
    audioContext = audioContext || new AudioCtx();
    if (audioContext.state === "suspended") await audioContext.resume();
    musicOn = true;
    button.innerHTML = "♫ <span>Music on</span>";
    button.setAttribute("aria-pressed", "true");
    playTone();
  } else {
    musicOn = false;
    clearInterval(musicTimer);
    button.innerHTML = "♫ <span>Music off</span>";
    button.setAttribute("aria-pressed", "false");
  }
});

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
