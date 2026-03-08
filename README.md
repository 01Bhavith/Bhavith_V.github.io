# Bhavith V | Portfolio


## 🔗 Live Demo
https://bhavith-v.vercel.app/

---

## 🚀 Features

* **Terminal Boot Sequence:** A cinematic, simulated terminal preloader that authenticates the user upon first visit.
* **Matrix Rain Canvas:** A highly performant, HTML5 `<canvas>` based binary rain animation that dynamically fades in as the user scrolls.
* **3D Tilt Physics:** Custom Vanilla JavaScript calculates mouse position to apply 3D perspective tilts and dynamic glowing shadows to project and skill cards.
* **Intelligent Session Storage:** The terminal boot sequence only runs on the *first* visit per session. Refreshing or using the browser's back button instantly bypasses the preloader and restores the user's exact scroll position.
* **Glassmorphism UI:** Advanced backdrop-filters and translucent borders built with Tailwind CSS.
* **Strict Security Headers:** Configured via `vercel.json` to enforce HSTS, prevent clickjacking (X-Frame-Options), and mitigate XSS attacks.

---

## 🛠️ Technical Arsenal

* **Frontend:** HTML5, Tailwind CSS (via CDN)
* **Scripting:** Vanilla JavaScript (ES6+), HTML5 Canvas API
* **Deployment:** Vercel (Static Hosting)
* **Icons:** FontAwesome 6

---

## 📂 Project Structure

```text
├── css/
│   └── style.css       # Custom animations, 3D physics, and matrix canvas styling
├── js/
│   └── script.js       # Preloader logic, Canvas loop, Scroll Observer, and Tilt math
├── index.html          # Main single-page application and Tailwind markup
├── Resume.pdf          # Downloadable resume document
├── vercel.json         # Deployment configuration and HTTP security headers
├── .gitignore          # Git exclusion rules
└── README.md           # Project documentation