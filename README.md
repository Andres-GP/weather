# 🌤️ Weather App

A modern and interactive **weather forecast app** powered by the [OpenWeather API](https://openweathermap.org/api).  
Built with **Next.js**, **Tailwind**, **Radix UI**, and **Recharts** for a rich, animated data experience.

---

## 🚀 Live Demo

👉 [View Live App](https://weather-app-bay-seven-21.vercel.app/)

---

## ✨ Features

- 🔍 **City search** with instant weather data.
- 🌡️ **Detailed weather info** (temp, humidity, wind, etc.).
- 📊 **Data visualization** with Recharts.
- 🌙 **Dark & light modes** with next-themes.
- ⚡ **Form validation** using Zod + React Hook Form.
- 💬 **Notifications** powered by Sonner.
- 🎨 **Animated UI** with Tailwind Animate.

---

## 🧰 Tech Stack

| Category          | Technology                        |
| ----------------- | --------------------------------- |
| **Framework**     | Next.js 15                        |
| **Language**      | TypeScript                        |
| **UI Components** | Radix UI, Geist UI, TailwindCSS   |
| **Forms**         | React Hook Form + Zod             |
| **Charts**        | Recharts                          |
| **Animations**    | Tailwind Animate + tw-animate-css |
| **Themes**        | next-themes                       |
| **Icons**         | lucide-react                      |
| **Testing**       | Jest + React Testing Library      |
| **Deployment**    | Vercel                            |

---

## ⚙️ CI/CD & Automation

This project includes a full GitHub Actions workflow for continuous integration, testing, and deployment:

- **Continuous Integration (CI)**

  - Runs on `push` or `pull_request` events to `master`.
  - Lints code with **ESLint**.
  - Builds the project.
  - Runs **unit and integration tests** using **Jest**.

- **Continuous Deployment (CD)**

  - Automatic deployment to **Vercel** after CI succeeds.
  - Manual approval required for production deployment.
  - Discord notifications for successful production deployments.
  - [CI/CD Discord channel here!](https://discord.com/channels/1433886988158763124/1433886988980719819)

- **Performance & Quality Checks**

  - Weekly **Lighthouse audits** scheduled with GitHub Actions.
  - Dependabot keeps **npm dependencies** and **GitHub Actions** up-to-date weekly.

- **Reusable Workflows**
  - CI tasks are modularized in a **reusable workflow** for maintainability and consistency.
