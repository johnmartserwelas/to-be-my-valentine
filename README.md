# 💕 Valentine Love Story

A charming, story-driven single-page Valentine invitation website built with React and Vite.

## ✨ Features

- 💌 Interactive envelope opening animation
- ✨ Story-style message reveal with typing effect
- 💕 Soft pastel gradient background (peach, lavender, blush pink)
- 🎉 Floating hearts and sparkles animation
- 💖 "Yes" button grows while "No" shrinks and changes text
- 🎊 Full-screen celebration overlay on "Yes"
- 📱 Fully responsive design
- 🎵 Optional background music support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/valentine-love-story.git
cd valentine-love-story
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎨 Customization

### Change Partner's Name
Edit `src/App.jsx` and modify the `PARTNER_NAME` constant:
```javascript
const PARTNER_NAME = "Your Partner's Name";
```

### Edit Message Lines
Modify the `STORY_LINES` array in `src/App.jsx`:
```javascript
const STORY_LINES = [
  "Your custom message line 1",
  "Your custom message line 2",
  // Add more lines...
];
```

### Change Colors
Edit the CSS variables in `src/App.css`:
```css
:root {
  --primary-pink: #F8A5C2;
  --soft-lavender: #D4A5FF;
  --warm-peach: #FFCAB0;
  /* ... more colors */
}
```

### Change Music
Place your music file in the `public` folder and update the `MUSIC_FILE` constant in `src/App.jsx`:
```javascript
const MUSIC_FILE = "/your-music-file.mp3";
```

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

## 📝 License

MIT License - Feel free to use this for your loved ones! 💕

---

Made with 💖 for Valentine's Day
