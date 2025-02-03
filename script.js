// Elementos del DOM
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const btnBack = document.getElementById('btnBack');
const container = document.querySelector('.container');
const message = document.querySelector('.message');

// Crear un objeto de Audio para la música de fondo
const backgroundMusic = new Audio('background-music.mp3'); // Reemplaza con la ruta de tu música
backgroundMusic.loop = true; // Hacer que la música se repita
backgroundMusic.volume = 0.5; // Controlar el volumen (0.0 a 1.0)

// Función para iniciar la música al hacer clic en cualquier parte de la página
function startMusic() {
  // Iniciar la música de fondo cuando el usuario haga clic
  backgroundMusic.play();
  // Eliminar el botón de inicio para evitar que se siga mostrando
  document.getElementById('startMusicBtn').style.display = 'none';
}

// Crear un botón invisible para hacer clic y permitir la reproducción automática
const startMusicBtn = document.createElement('button');
startMusicBtn.id = 'startMusicBtn';
startMusicBtn.style.position = 'absolute';
startMusicBtn.style.top = '0';
startMusicBtn.style.left = '0';
startMusicBtn.style.width = '100%';
startMusicBtn.style.height = '100%';
startMusicBtn.style.opacity = '0'; // Hacerlo invisible
document.body.appendChild(startMusicBtn);

// Agregar un evento de clic al botón invisible para iniciar la música
startMusicBtn.addEventListener('click', startMusic);

// Función para mover el botón "No" dentro del contenedor sin invadir el texto
btnNo.addEventListener('mouseover', () => {
  const containerRect = container.getBoundingClientRect();
  const messageRect = message.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();

  let randomX, randomY;
  do {
    randomX =
      Math.random() * (containerRect.width - btnRect.width) + containerRect.left;
    randomY =
      Math.random() * (containerRect.height - btnRect.height) + containerRect.top;
  } while (
    randomX + btnRect.width > messageRect.left &&
    randomX < messageRect.right &&
    randomY + btnRect.height > messageRect.top &&
    randomY < messageRect.bottom
  );

  btnNo.style.position = 'absolute';
  btnNo.style.left = `${randomX - containerRect.left}px`;
  btnNo.style.top = `${randomY - containerRect.top}px`;
});

// Función para mostrar la segunda pantalla
btnYes.addEventListener('click', () => {
  const sound = new Audio('click-sound.mp3');
  sound.play();
  
  // Iniciar la música de fondo si no se ha hecho ya
  if (backgroundMusic.paused) {
    backgroundMusic.play();
  }

  screen1.classList.add('hidden');
  screen2.classList.remove('hidden');
});

// Función para volver a la primera pantalla
btnBack.addEventListener('click', () => {
  const sound = new Audio('click-sound.mp3');
  sound.play();
  screen2.classList.add('hidden');
  screen1.classList.remove('hidden');
});

// Función para cuando dice "No"
btnNo.addEventListener('click', () => {
  const sound = new Audio('click-sound.mp3');
  sound.play();
  alert("¡Sigue intentándolo! 😊");
});

// Control de volumen
const volumeControl = document.createElement('input');
volumeControl.type = 'range';
volumeControl.min = 0;
volumeControl.max = 1;
volumeControl.step = 0.1;
volumeControl.value = backgroundMusic.volume;
volumeControl.style.position = 'absolute';
volumeControl.style.top = '20px';
volumeControl.style.right = '20px';
document.body.appendChild(volumeControl);

// Cambiar el volumen de la música con el control
volumeControl.addEventListener('input', (e) => {
  backgroundMusic.volume = e.target.value;
});
