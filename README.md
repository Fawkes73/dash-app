<div align="center">

# 📊 YouTube Channel Dashboard

A **YouTube channel dashboard** for a football live-stream channel, built with **Next.js**, **shadcn/ui**, and **Recharts** — channel analytics, a live match stream, a video library, and viewer comments.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Recharts](https://img.shields.io/badge/Recharts-charts-FF6384)](https://recharts.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](#-license)

</div>

---

## 📸 Preview

<table>
<tr>
<td align="center" width="50%"><b>Light</b><br><img src="./public/preview-image1.png" width="100%" alt="Channel Overview light mode" /></td>
<td align="center" width="50%"><b>Dark</b><br><img src="./public/preview-image2.png" width="100%" alt="Channel Overview dark mode" /></td>
</tr>
</table>

<p align="center"><b>Live Stream</b><br><img src="./public/preview-image3-livestream.png" width="70%" alt="Live stream view" /></p>

## ✨ Features

- 📈 **Channel Overview** — subscribers, total views, live viewer count, watch time, and videos published, plus a views-by-category chart — several stats are computed live from the actual video/comment data, not hardcoded
- 🔴 **Live Stream** — YouTube embed slot (falls back to a broadcast-style placeholder, not a random video) with live score, match stats, and an event feed, plus a viewer count in Indian lakh formatting
- 🎬 **Videos** — a paginated channel video library with category badges and view/duration metadata
- 💬 **Comments** — YouTube-style viewer comments with likes and relative timestamps
- 🌗 **Full light/dark theme** — the whole site switches, including the header and sidebar, with a dedicated always-dark token for video/thumbnail surfaces so they never turn white in light mode

## 🛠 Installation & Setup

```bash
git clone https://github.com/Fawkes73/dash-app.git
cd dash-app
npm install
npm run dev
```

Visit **http://localhost:3000**.

## 📂 Project Structure

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Entry point → renders the dashboard shell |
| `src/app/pages/dashboard` | Dashboard shell: header + sidebar + active section |
| `src/app/Components/Dashboardcard` | Channel Overview: stats + views-by-category chart |
| `src/app/Components/LiveStream` | Live stream panel: score, stats, event feed |
| `src/app/Components/Videos` / `Comments` | Video library and viewer comments |
| `src/components/ui/` | shadcn/ui primitives |
| `data/` | Mock video and comment datasets the API routes serve |

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) (App Router) – React framework for production
- [shadcn/ui](https://ui.shadcn.com/) – Locally-owned, stylized components
- [Recharts](https://recharts.org/) – Interactive charting
- [Tailwind CSS v4](https://tailwindcss.com/) – Utility-first, CSS-first config
- [Material UI](https://mui.com/) – Used for the header app bar, themed to match the Tailwind palette

## 🤝 Contributing

Feel free to fork this repository, submit issues, or send pull requests! 🎯

## 📄 License

This project is open source under the [MIT License](./LICENSE).

If you liked this project, give it a ⭐!
