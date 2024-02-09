"use strict";

// Seleccionar elementos del DOM
const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// Definir el número máximo de imágenes y contador de clics en "No"
const MAX_IMAGES = 5;
let noCount = 0;

// Manejar clic en el botón "Sí"
yesButton.addEventListener("click", () => {
  handleYesClick();
});

// Manejar clic en el botón "No"
noButton.addEventListener("click", () => {
  handleNoClick();
});

// Función para manejar el clic en el botón "Sí"
function handleYesClick() {
  titleElement.innerHTML = "DESMOLE CORTE MI REINA 😘!";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

// Función para manejar el clic en el botón "No"
function handleNoClick() {
  if (noCount < MAX_IMAGES) {
    noCount++;
    const message = generateMessage(noCount);
    updateNoButtonText(message);
    changeImage(noCount);
    resizeYesButton();

    if (message === "¡Voy a llorar...!") {
      makeButtonCry();
    } else {
      resetButtonPosition();
    }
  }
}

// Función para generar un mensaje basado en el número de clics en "No"
function generateMessage(noCount) {
  const messages = [
    "No",
    "¿Estás segura?",
    "Por favor :(",
    "¡No me hagas esto!",
    "Me estás rompiendo el corazón",
    "¡Voy a llorar...!",
  ];

  return messages[Math.min(noCount, messages.length - 1)];
}


function changeImage(imageIndex) {
  if (imageIndex === "yes") {
    catImg.src = `img/cat-yes.gif`; // Para la imagen "sí", utilizar un GIF
    playMusic(); // Reproducir música cuando se muestra la última imagen
  } else {
    catImg.src = `img/cat-${imageIndex}.jpg`; // Para otras imágenes, utilizar JPG
  }
}

// Función para actualizar el texto del botón "No" con un mensaje personalizado
function updateNoButtonText(message) {
  noButton.innerHTML = message;
}

// Función para redimensionar el botón "Sí"
function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

// Función para reproducir música
function playMusic() {
  const audio = new Audio('img/Por Ti.mp3');
  audio.play();
}

// Función para hacer que el botón "No" llore
function makeButtonCry() {
  // Obtener dimensiones de la ventana y del botón "No"
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  // Generar una posición aleatoria dentro de la ventana
  const randomX = Math.random() * (windowWidth - buttonWidth);
  const randomY = Math.random() * (windowHeight - buttonHeight);

  // Establecer la posición del botón "No" como la posición aleatoria
  noButton.style.position = "absolute";
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;

  // Añadir clase de animación al botón
  noButton.classList.add("cry-animation");
}

// Añadir evento para el movimiento del botón "No" al pasar el cursor sobre él
noButton.addEventListener("mouseenter", () => {
  if (noButton.innerHTML === "¡Voy a llorar...!") {
    makeButtonCry();
  }
});

// Función para restablecer la posición del botón "No"
function resetButtonPosition() {
  noButton.style.position = "static";
}

