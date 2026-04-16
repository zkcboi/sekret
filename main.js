import './style.css'
import lottie from 'lottie-web'
import proposalAnimationData from './assets/kuan.json'
import celebrationAnimationData from './assets/balshi.json'
import sadAnimationData from './assets/shibal.json'

let yesButtonScale = 1;
let noButtonClicks = 0;
let videoPlaying = false;

document.querySelector('#app').innerHTML = `
  <div id="proposal-screen" class="flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <div class="text-6xl mb-8 animate-bounce" style="animation-duration: 2s;">💗</div>
      <h1 class="text-5xl font-regular text-gray-800 mb-6 tracking-wide">hello, stranger<span class="dot dot-1">.</span><span class="dot dot-2">.</span><span class="dot dot-3">.</span></h1>
      <p class="text-lg text-gray-600 mb-12 font-light">If u like figuring things out, u might like what's next. ;)</p>
      <button id="yes-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
        → ENTER
      </button>
    </div>
  </div>

  <div id="celebration-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <div id="riddle-content" class="mb-8">
        <p class="text-lg text-gray-700 mb-8 font-light leading-relaxed">
          <span class="block mb-3">I take time to form.</span>
          <span class="block mb-3">Pressure shapes me.</span>
          <span class="block">I stay quiet… but I last.</span>
        </p>
        <h2 class="text-2xl text-gray-800 mb-8 font-regular">What am I?</h2>
        <div id="hint-area" class="hidden mb-6 text-gray-600 italic text-base">
          HINT: "It's hard, but i think i fell harder for u..."
        </div>
        <div class="flex flex-col gap-4 items-center">
          <input id="answer-input" type="text" placeholder="Your answer..." class="px-6 py-3 border border-gray-400 rounded-lg text-center text-gray-800 focus:outline-none focus:border-gray-800 font-light" />
          <button id="submit-answer" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-8 rounded-lg shadow-lg transition-all duration-300">
            → SUBMIT
          </button>
        </div>
      </div>
      <div id="success-content" class="hidden">
        <p class="text-2xl text-gray-800 mb-8 font-light">Good. You're paying attention. 😊</p>
        <button id="continue-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
          → CONTINUE
        </button>
      </div>
    </div>
  </div>

  <div id="sad-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <div id="cipher-content" class="mb-8">
        <p class="text-lg text-gray-700 mb-8 font-light leading-relaxed">
          <span class="block mb-4">Not everything is obvious.</span>
          <span class="block mb-4">Try shifting each letter <span class="font-regular">back by 1:</span></span>
        </p>
        <div class="bg-gray-100 rounded-lg p-6 mb-8">
          <p class="text-xl text-gray-800 font-mono tracking-wider">j bepsf uif xbz zpv fyjtu</p>
        </div>
        <div class="flex flex-col gap-4 items-center">
          <input id="cipher-input" type="text" placeholder="Your answer..." class="px-6 py-3 border border-gray-400 rounded-lg text-center text-gray-800 focus:outline-none focus:border-gray-800 font-light w-full" />
          <button id="cipher-submit" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-8 rounded-lg shadow-lg transition-all duration-300">
            → SUBMIT
          </button>
        </div>
      </div>
      <div id="cipher-success" class="hidden">
        <p class="text-2xl text-gray-800 mb-8 font-regular"> you're almost there. 🫶</p>
        <button id="cipher-continue" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
          → CONTINUE
        </button>
      </div>
    </div>
  </div>

  <div id="reflection-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <p class="text-lg text-gray-700 mb-12 font-light leading-relaxed">
        <span class="block mb-4">You don't know me.</span>
        <span class="block mb-4">But you’ve seen me more times than you realize.</span>
        <span class="block mb-8"></span>
        <span class="block mb-4">Maybe in passing.</span>
        <span class="block mb-4">Maybe in the same place, different moments.</span>
        <span class="block mb-8"></span>
        <span class="block mb-4">You were busy…</span>
        <span class="block mb-4">I was just noticing.</span>
      </p>
      <button id="reflection-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
        → Keep going
      </button>
    </div>
  </div>

  <div id="acrostic-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <p class="text-lg text-gray-800 mb-8 font-light">Maybe this will help you figure it out:</p>
      <div class="bg-gray-100 rounded-lg p-8 mb-8 text-left max-w-md mx-auto">
        <p class="text-lg text-gray-800 font-regular leading-relaxed mb-3">
          <span class="block font-semibold">in this Confined space of my Heart, i Often Cherish the Odd Little Aspects of Togetherness we Enjoy.</span>
        </p>
      </div>
      <button id="acrostic-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
        → I think I know
      </button>
    </div>
  </div>

  <div id="final-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <div id="final-input-area">
        <p class="text-2xl text-gray-800 mb-12 font-light leading-relaxed">
          If you think you've figured it out…<br/>
          type the word.
        </p>
        <div id="final-hint-area" class="hidden mb-6 text-gray-600 italic text-base">
          HINT: "I melt but I'm not ice"
        </div>
        <div class="flex flex-col gap-4 items-center">
          <input id="final-input" type="text" placeholder="..." class="px-6 py-3 border border-gray-400 rounded-lg text-center text-gray-800 focus:outline-none focus:border-gray-800 font-light w-full max-w-sm" />
          <button id="final-submit" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
            → SUBMIT
          </button>
        </div>
      </div>
      <div id="final-giveup-area" class="hidden">
        <p class="text-2xl text-gray-800 mb-8 font-light leading-relaxed">
          dang it! u really can't figure it out? okay just contact this number <span class="font-semibold">09669024030</span> and i'll reveal it to u :)
        </p>
        <button id="final-return" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
          ← Return & Try Again
        </button>
      </div>
    </div>
  </div>

  <div id="familiar-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <p class="text-2xl text-gray-800 mb-12 font-light leading-relaxed">
        Familiar? 🍫
      </p>
      <button id="familiar-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
        → Continue
      </button>
    </div>
  </div>

  <div id="email-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <div id="email-container" class="cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <div id="email-box" class="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-800">
          <div class="text-4xl mb-4">✉️</div>
          <p class="text-xl text-gray-800 font-light">click me</p>
        </div>
      </div>
    </div>

    <div id="email-popup" class="hidden fixed inset-0 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="bg-white rounded-lg shadow-2xl p-8 mx-4" style="animation: slideIn 0.5s ease-out; width: 90vw; max-width: 500px;">
        <div class="text-right mb-4">
          <button id="popup-close" class="text-gray-600 hover:text-gray-800 text-2xl">×</button>
        </div>
        <div id="popup-message" class="text-lg text-gray-800 font-light leading-relaxed text-justify mb-6" style="max-height: 40vh; overflow-y: auto; -webkit-overflow-scrolling: touch; padding-right: 8px;">
          <span class="block mb-4">Belated happy birthday, Bruce 🥺🎉 I know super late na gyud kay four weeks na ang nilabay and I’m really sorry wala ko naka-greet ato. The truth is, naulaw lang gyud ko and I didn’t really know how to approach you or unsa akong mahatag. I guess… I’ve just been quietly admiring you from afar this whole time.</span>

<span class="block mb-4">We don’t really know each other that much yet, so I made this small website for you as my way of making it up. Simple ra siya, pero gi-effortan gyud nako because I wanted to do something special, even in my own quiet way.</span>

<span class="block mb-4">You can think of me as your secret admirer, or just someone who genuinely appreciates you. Wala koy gi-expect in return, and I don’t want to pressure you. Pero if there’s even a small chance, ganahan gyud ko makaila pa nimo more—slowly and sincerely.</span>

<span class="block mb-4">And if not, okay ra gyud kaayo. I’ll still be happy admiring you from afar, and grateful ko that I got the chance to appreciate someone like you 🤍</span>
        </div>
        <button id="popup-continue" class="w-full btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
          → Continue
        </button>
      </div>
      <style>
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    </div>
  </div>

  <div id="figure-out-screen" class="hidden flex items-center justify-center min-h-screen" style="background-color: #E5E5EA;">
    <div class="text-center p-8 max-w-2xl">
      <p class="text-lg text-gray-800 mb-12 font-light leading-relaxed">
        If you figured it out kinsa ni nga person, feel free to message me directly sa social media. 🫶
      </p>
      <button id="figureout-btn" class="btn-scale bg-gray-800 hover:bg-gray-900 text-white font-light py-3 px-12 rounded-lg shadow-lg transition-all duration-300">
        ← Go back to the beginning
      </button>
    </div>
  </div>

  <div id="video-screen" class="hidden flex items-center justify-center min-h-screen bg-black">
    <div class="w-full h-full">
      <video id="video-player" class="w-full h-full object-cover" controls playsinline webkit-playsinline preload="metadata">
        <source src="/assets/ugh.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
`

const proposalAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: proposalAnimationData 
  });

  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const jokeNoBtn = document.getElementById('joke-no-btn');
  const playVideoBtn = document.getElementById('play-video-btn');
  const proposalScreen = document.getElementById('proposal-screen');
  const celebrationScreen = document.getElementById('celebration-screen');
  const sadScreen = document.getElementById('sad-screen');
  const videoScreen = document.getElementById('video-screen');
  const videoPlayer = document.getElementById('video-player');
  
  yesBtn.addEventListener('click', () => {
    proposalScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');
  });

if (noBtn) {
  noBtn.addEventListener('click', () => {
    noButtonClicks++;
    yesButtonScale += 0.3;

    yesBtn.style.transform = `scale(${yesButtonScale})`;
    yesBtn.style.padding = `${1 + (noButtonClicks * 0.2)}rem ${2 + (noButtonClicks * 0.4)}rem`;

    if (noButtonClicks >= 5) {
      noBtn.style.display = 'none';
    }
  });
}

if (jokeNoBtn) {
  jokeNoBtn.addEventListener('click', () => {
    celebrationScreen.classList.add('hidden');
    sadScreen.classList.remove('hidden');

    lottie.loadAnimation({
      container: document.getElementById('sad-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: sadAnimationData 
    });
  });
}

const submitAnswerBtn = document.getElementById('submit-answer');
const answerInput = document.getElementById('answer-input');
const riddleContent = document.getElementById('riddle-content');
const successContent = document.getElementById('success-content');
const continueBtn = document.getElementById('continue-btn');
const hintArea = document.getElementById('hint-area');
let failedAttempts = 0;

submitAnswerBtn.addEventListener('click', () => {
  const userAnswer = answerInput.value.toLowerCase().trim();
  
  if (userAnswer === 'stone' || userAnswer === 'rock') {
    riddleContent.classList.add('hidden');
    successContent.classList.remove('hidden');
  } else {
    failedAttempts++;
    answerInput.value = '';
    answerInput.placeholder = 'Not quite... try again';
    
    if (failedAttempts === 1) {
      hintArea.classList.remove('hidden');
    }
  }
});

answerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitAnswerBtn.click();
  }
});

continueBtn.addEventListener('click', () => {
  // Move to next page
  celebrationScreen.classList.add('hidden');
  sadScreen.classList.remove('hidden');
});

const cipherInput = document.getElementById('cipher-input');
const cipherSubmit = document.getElementById('cipher-submit');
const cipherContent = document.getElementById('cipher-content');
const cipherSuccess = document.getElementById('cipher-success');
const cipherContinue = document.getElementById('cipher-continue');

cipherSubmit.addEventListener('click', () => {
  const userAnswer = cipherInput.value.toLowerCase().trim();
  
  if (userAnswer === 'i adore the way you exist') {
    cipherContent.classList.add('hidden');
    cipherSuccess.classList.remove('hidden');
  } else {
    cipherInput.value = '';
    cipherInput.placeholder = 'Not quite... try again';
  }
});

cipherInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    cipherSubmit.click();
  }
});

cipherContinue.addEventListener('click', () => {
  sadScreen.classList.add('hidden');
  const reflectionScreen = document.getElementById('reflection-screen');
  reflectionScreen.classList.remove('hidden');
});

const reflectionBtn = document.getElementById('reflection-btn');
const reflectionScreen = document.getElementById('reflection-screen');
const acrosticScreen = document.getElementById('acrostic-screen');

reflectionBtn.addEventListener('click', () => {
  reflectionScreen.classList.add('hidden');
  acrosticScreen.classList.remove('hidden');
});

const acrosticBtn = document.getElementById('acrostic-btn');
acrosticBtn.addEventListener('click', () => {
  acrosticScreen.classList.add('hidden');
  const finalScreen = document.getElementById('final-screen');
  finalScreen.classList.remove('hidden');
});

const finalInput = document.getElementById('final-input');
const finalSubmit = document.getElementById('final-submit');
const finalInputArea = document.getElementById('final-input-area');
const finalGiveupArea = document.getElementById('final-giveup-area');
const finalReturn = document.getElementById('final-return');
const finalHintArea = document.getElementById('final-hint-area');
let finalAttempts = 0;

finalSubmit.addEventListener('click', () => {
  const userAnswer = finalInput.value.toLowerCase().trim();
  
  if (userAnswer === 'chocolate') {
    const finalScreen = document.getElementById('final-screen');
    const familiarScreen = document.getElementById('familiar-screen');
    finalScreen.classList.add('hidden');
    familiarScreen.classList.remove('hidden');
  } else {
    finalAttempts++;
    finalInput.value = '';
    finalInput.placeholder = 'Not quite... try again';
    
    if (finalAttempts === 2) {
      finalHintArea.classList.remove('hidden');
    }
  }
});

finalInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    finalSubmit.click();
  }
});

finalReturn.addEventListener('click', () => {
  finalAttempts = 0;
  finalInput.value = '';
  finalInput.placeholder = '...';
  finalInputArea.classList.remove('hidden');
  finalGiveupArea.classList.add('hidden');
});

const familiarBtn = document.getElementById('familiar-btn');
familiarBtn.addEventListener('click', () => {
  const familiarScreen = document.getElementById('familiar-screen');
  const emailScreen = document.getElementById('email-screen');
  familiarScreen.classList.add('hidden');
  emailScreen.classList.remove('hidden');
});

const emailContainer = document.getElementById('email-container');
const emailPopup = document.getElementById('email-popup');
const popupClose = document.getElementById('popup-close');
const popupContinue = document.getElementById('popup-continue');

emailContainer.addEventListener('click', () => {
  emailPopup.classList.remove('hidden');
});

popupClose.addEventListener('click', () => {
  emailPopup.classList.add('hidden');
});

popupContinue.addEventListener('click', () => {
  emailPopup.classList.add('hidden');
  const emailScreen = document.getElementById('email-screen');
  const figureoutScreen = document.getElementById('figure-out-screen');
  emailScreen.classList.add('hidden');
  figureoutScreen.classList.remove('hidden');
});

const figureoutBtn = document.getElementById('figureout-btn');
figureoutBtn.addEventListener('click', () => {
  const figureoutScreen = document.getElementById('figure-out-screen');
  figureoutScreen.classList.add('hidden');
  proposalScreen.classList.remove('hidden');
});

playVideoBtn.addEventListener('click', () => {
  if (!videoPlaying) {
    videoPlaying = true;
    
    // Change button text
    playVideoBtn.textContent = '🎬 Loading... 🎬';
    playVideoBtn.disabled = true;
    playVideoBtn.style.cursor = 'not-allowed';
    playVideoBtn.style.opacity = '0.6';
    
    // Show video screen
    sadScreen.classList.add('hidden');
    videoScreen.classList.remove('hidden');
    
    // Play video with error handling for mobile
    videoPlayer.play().catch(error => {
      console.log('Autoplay prevented:', error);
      // If autoplay fails, just show the video with controls
      videoPlayer.controls = true;
    });
  }
});



