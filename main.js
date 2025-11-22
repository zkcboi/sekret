import './style.css'
import lottie from 'lottie-web'
import proposalAnimationData from './assets/kuan.json'
import celebrationAnimationData from './assets/balshi.json'
import sadAnimationData from './assets/shibal.json'

let yesButtonScale = 1;
let noButtonClicks = 0;
let videoPlaying = false;

document.querySelector('#app').innerHTML = `
  <div id="proposal-screen" class="flex items-center justify-center min-h-screen from-pink-200 from-pink-400 bg-gradient-to-br">
    <div class="text-center p-8 max-w-2xl">
      <div id="lottie-animation" class="w-70 h-60 mx-auto mb-0"></div>
      <h1 class="text-5xl font-bold text-gray-800 mb-3">hi, I like you!</h1>
      <div class="flex gap-6 justify-center items-end mb-4">
        <button id="yes-btn" class="btn-scale bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">
          I like you too! :)
        </button>
        <button id="no-btn" class="btn-scale bg-red-500 hover:bg-red-600 text-white font-normal py-4 px-6 rounded-full shadow-lg">
          Sorry I don't like you 
        </button>
      </div>
      <div class="text-gray-500 text-base italic">
        (Just press the red button if you dont like me, I promise it's okay hehe)
      </div>
    </div>
  </div>

  <div id="celebration-screen" class="hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200">
    <div class="text-center p-8 max-w-2xl">
      <div id="celebration-animation" class="w-100 h-80 mx-auto mb-8"></div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4"> YAAAYYY!</h1>
      <p class="text-2xl text-gray-700 mb-6"> OMG!! Does this mean we're together na ba mwehehe?</p>
      <button id="joke-no-btn" class="btn-scale bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        REAL Rejection Boton :(
      </button>
      <div class="text-gray-500 text-base italic">
        (Press this if you really really don't like me ://)
      </div>
    </div>
  </div>

  <div id="sad-screen" class="hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
    <div class="text-center p-8 max-w-2xl">
      <div id="sad-animation" class="w-96 h-96 mx-auto mb-8"></div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Awtsss... :(((</h1>
      <p class="text-lg text-gray-700 mb-6"> btawww, just wanted to say na I realy like you and I have a crush on u. Enjoy ur day and amping permi hehe </p>
      <button id="play-video-btn" class="btn-scale bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        Play this 
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
  
    lottie.loadAnimation({
      container: document.getElementById('celebration-animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: celebrationAnimationData
    });
  });

noBtn.addEventListener('click', () => {
  noButtonClicks++;
  yesButtonScale += 0.3;

  yesBtn.style.transform = `scale(${yesButtonScale})`;
  yesBtn.style.padding = `${1 + (noButtonClicks * 0.2)}rem ${2 + (noButtonClicks * 0.4)}rem`;

  if (noButtonClicks >= 5) {
    noBtn.style.display = 'none';
  }
});

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



