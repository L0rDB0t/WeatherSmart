# 🌦️ WeatherSmart

![Docker](https://img.shields.io/docker/pulls/l0rdb0t/weathersmart?style=flat-square)
![GitHub Actions](https://github.com/L0rDB0t/weathersmart/actions/workflows/docker-image.yml/badge.svg)
![MIT License](https://img.shields.io/github/license/L0rDB0t/weathersmart?style=flat-square)

**WeatherSmart** es una aplicación web del clima en tiempo real que ofrece recomendaciones inteligentes según las condiciones actuales. Desarrollada con JavaScript, la API de OpenWeather, y empaquetada con Docker para fácil despliegue.

---

## 🚀 Características

- 🔍 Búsqueda de clima por ciudad
- 🌡️ Temperatura en grados Celsius
- 💡 Recomendaciones según el clima (ej: paraguas si llueve)
- 🖼️ Fondo dinámico según el clima actual
- 🛰️ Funciona offline con Service Worker
- 🐳 Desplegable fácilmente con Docker + Nginx

---

## 🖼️ Vista previa

![demo](https://raw.githubusercontent.com/L0rDB0t/weathersmart/main/demo.gif)  
<sub>*Puedes colocar aquí un gif o imagen del sitio funcionando*</sub>

---

## 🧪 Tecnologías usadas

- [JavaScript (Vanilla)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [OpenWeather API](https://openweathermap.org/api)
- [Docker](https://www.docker.com/)
- [Nginx (como servidor)](https://www.nginx.com/)
- HTML5 + CSS3

---

## 📦 Instalación local con Docker

```bash
# Clona el repositorio
git clone https://github.com/L0rDB0t/weathersmart.git
cd weathersmart

# Construye la imagen Docker
docker build -t weathersmart .

# Corre la app
docker run -d -p 8080:80 weathersmart
