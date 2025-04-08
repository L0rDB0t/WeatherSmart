const apiKey = "f6a98382f87aaa3b9c6213efa5579ffd";

function applyDarkMode(timezone) {
  // Verifica si el usuario activó o desactivó manualmente el modo oscuro
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    return; // No sobrescribas el estado manual
  } else if (darkMode === "disabled") {
    document.body.classList.remove("dark-mode");
    return; // No sobrescribas el estado manual
  }

  // Aplica el modo oscuro automáticamente según la hora local de la ciudad
  const currentTime = new Date();
  const localTime = new Date(currentTime.getTime() + timezone * 1000); // Convierte el timezone a milisegundos
  const hours = localTime.getUTCHours();

  if (hours >= 18 || hours < 6) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Por favor, ingresa una ciudad.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Limpia el contenido anterior
  resultDiv.classList.remove("show"); // Reinicia la animación eliminando la clase

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      resultDiv.innerHTML = `<p>🌍 Ciudad no encontrada. Intenta de nuevo.</p>`;
      resultDiv.classList.add("show");
      return;
    }

    const weather = data.weather[0].main.toLowerCase();
    const temp = data.main.temp;
    const icon = data.weather[0].icon;
    const advice = getAdvice(weather, temp);
    const cityName = data.name;

    // Aplica el modo oscuro según el timezone
    applyDarkMode(data.timezone);

    resultDiv.innerHTML = `
      <h2>${cityName}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}" />
      <p>${weather} — ${temp}°C</p>
      <p><strong>${advice}</strong></p>
    `;
    resultDiv.classList.add("show");
  } catch (err) {
    resultDiv.innerHTML = `<p>⛔ Error al conectar con la API.</p>`;
    resultDiv.classList.add("show");
    console.error(err);
  }
}

function getAdvice(weather, temp) {
  if (weather.includes("rain")) return "Lleva paraguas ☔";
  if (weather.includes("clear") && temp > 25) return "Ideal para salir y disfrutar el sol";
  if (weather.includes("snow")) return "Está nevando, abrígate bien ❄️";
  if (temp < 10) return "Hace frío, lleva abrigo 🧥";
  return "Buen día para salir 🌤️";
}

function setDynamicBackground(weather) {
  const backgrounds = {
    clear: "clear.jpg",
    rain: "rain.jpg",
    clouds: "clouds.jpg",
    snow: "snow.jpg",
    thunderstorm: "thunder.jpg",
    default: "default.jpg"
  };

  const bg = backgrounds[weather] || backgrounds["default"];
  document.body.style.backgroundImage = `url('img/${bg}')`;
}

function toggleSource() {
  const sourceInfo = document.getElementById("sourceInfo");
  if (sourceInfo.style.display === "none" || sourceInfo.style.display === "") {
    sourceInfo.style.display = "block"; // Muestra la información
  } else {
    sourceInfo.style.display = "none"; // Oculta la información
  }
}

// Crear el botón de modo oscuro dinámicamente y agregarlo al DOM
function addDarkModeButton() {
  const darkModeButton = document.createElement("button");
  darkModeButton.id = "toggleDarkMode";
  darkModeButton.textContent = "Modo Oscuro";
  darkModeButton.style.marginTop = "1rem";
  darkModeButton.style.padding = "0.5rem 1rem";
  darkModeButton.style.background = "#0078d7";
  darkModeButton.style.color = "white";
  darkModeButton.style.border = "none";
  darkModeButton.style.borderRadius = "0.5rem";
  darkModeButton.style.cursor = "pointer";
  darkModeButton.style.fontSize = "0.9rem";
  darkModeButton.style.transition = "background 0.3s ease";

  // Cambiar el estilo al pasar el mouse
  darkModeButton.addEventListener("mouseover", () => {
    darkModeButton.style.background = "#005bb5";
  });
  darkModeButton.addEventListener("mouseout", () => {
    darkModeButton.style.background = "#0078d7";
  });

  // Agregar funcionalidad al botón
  darkModeButton.addEventListener("click", toggleDarkMode);

  // Insertar el botón en el DOM, debajo del botón "Buscar"
  const app = document.querySelector(".app");
  if (app) {
    app.appendChild(darkModeButton);
  } else {
    console.error("El contenedor '.app' no se encontró en el DOM.");
  }
}

// Aplicar el modo oscuro guardado
function applySavedDarkMode() {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
  }
}

// Alternar el modo oscuro y guardar el estado
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Llamar a las funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  applySavedDarkMode(); // Aplica el modo oscuro guardado
  addDarkModeButton(); // Agrega el botón de modo oscuro
});