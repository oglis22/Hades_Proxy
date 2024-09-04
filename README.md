# Hades Proxy (Layer7/HTTP/s Proxy)

Hades is a lightweight Layer 7 reverse Proxy designed to effeciently route and manage HTTP/s traffic. It <a href="">featuers</a> customizable routing rules, load balancing, sub domain rotuing, XSS Filter, Rate limiting and more to optimize web application performence and security.

## 1. How to install

The easiest way to install Hades is to clone this repo and run follow commands

```
git clone https://github.com/oglis22/Hades_Proxy.git

WIN:

start install.bat
start start.bat

LINUX:

./install.sh && ./start.sh

DOCKER:

docker build -t hadex-proxy .
docker run -d --name hades-proxy hades-proxy

MANUEL:

npm i
npm run build
npm start

```

To run Hades you need <a href="https://nodejs.org/en">NodeJS</a>

## 2. Feautures

### Sub domain routing

- [x] sub domain routing
- [x] proxied/redirected

### Web Application Firewall

- [x] rate limiting
- [x] XSS Filters

### Generall

- [x] lightweight installable and usable proxy

![Screenshot 2024-09-04 200411](https://github.com/user-attachments/assets/1b5ba9e2-bf99-404a-8728-cc5ba26de1e9)
