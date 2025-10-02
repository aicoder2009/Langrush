# Linguarush 🌍

A fast-paced language identification game where players race to identify languages from text samples. Test your linguistic knowledge across 25+ languages with multiple game modes, real-time timing, and shareable results.

## 🎮 Game Modes

### 🏃 Sprint
- Identify 10 languages as fast as possible
- No mistakes allowed
- Race against your personal best time

### ⏰ Time Attack
- 60 seconds on the clock
- Identify as many languages as you can
- Every correct answer counts

### ♾️ Endless
- Keep going until you make 3 mistakes
- How high can you score?
- Progressively challenging

### 💎 Perfect Run
- 20 languages, zero mistakes allowed
- The ultimate challenge for language experts
- One wrong answer ends the game

### 🧘 Zen Mode
- Relaxed practice mode
- 15 languages to identify
- No time pressure, no lives system

## ✨ Features

- **25+ Languages**: From common languages like Spanish and French to challenging ones like Korean, Arabic, and Hindi
- **Difficulty Levels**: Easy, Medium, and Hard language sets
- **Smart Autocomplete**: Type-ahead suggestions with keyboard navigation
- **Real-time Timer**: Millisecond precision timing
- **User Authentication**: Optional login or guest mode
- **Leaderboards**: Track your personal bests and compete globally
- **Shareable Results**: Copy and share your achievements
- **Responsive Design**: Play on desktop, tablet, or mobile
- **Modern UI**: Clean, colorful design with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aicoder2009/Linguarush.git
cd Linguarush/language-speedrun

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Unbounded (Google Fonts)
- **State Management**: React Hooks
- **Storage**: LocalStorage for scores and user data

## 📂 Project Structure

```
language-speedrun/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main app component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── HomePage.tsx       # Mode selection screen
│   ├── GameScreen.tsx     # Main gameplay
│   ├── ResultsScreen.tsx  # Game results display
│   ├── AuthScreen.tsx     # Authentication
│   ├── GuestModePrompt.tsx
│   ├── DifficultySelection.tsx
│   ├── AnswerInput.tsx    # Input with autocomplete
│   ├── AutocompleteDropdown.tsx
│   ├── Timer.tsx
│   ├── ProgressBar.tsx
│   ├── LivesIndicator.tsx
│   └── QuestionDisplay.tsx
├── services/              # Business logic
│   ├── languageDatabase.ts
│   ├── scoreManager.ts
│   ├── leaderboard.ts
│   ├── auth.ts
│   ├── roundTimeTracker.ts
│   └── resultsFormatter.ts
├── hooks/                 # Custom React hooks
│   ├── useGameState.ts
│   ├── useTimer.ts
│   └── useLocalStorage.ts
├── data/                  # Static data
│   └── languages.ts       # 25+ language definitions
└── utils/                 # Utility functions
    ├── validation.ts
    └── autocomplete.ts
```

## 🌐 Languages Included

The game features 25+ languages spanning different writing systems and difficulty levels:

- **Latin Scripts**: Spanish, French, Italian, Portuguese, German, Dutch, Polish, Romanian
- **Cyrillic**: Russian
- **Asian Scripts**: Chinese, Japanese, Korean, Thai, Vietnamese
- **Middle Eastern**: Arabic, Hebrew, Turkish, Persian
- **Indian Subcontinent**: Hindi, Tamil, Bengali
- **Nordic**: Swedish, Norwegian, Finnish
- **And more!**

## 🎯 How to Play

1. **Choose a game mode** from the home screen
2. **Select difficulty level** (optional)
3. **Read the text sample** displayed on screen
4. **Type the language name** - autocomplete will help!
5. **Press Enter** to submit your answer
6. **Keep going** until the game ends
7. **Share your results** with friends!

### Keyboard Shortcuts

- `Enter` - Submit answer
- `Tab` - Accept autocomplete suggestion
- `↑/↓` - Navigate autocomplete suggestions
- `Esc` - Close autocomplete

## 📊 Scoring System

- **Sprint Mode**: Fastest time wins
- **Time Attack**: Most correct answers in 60 seconds
- **Endless**: Highest streak before 3 mistakes
- **Perfect Run**: Complete all 20 without mistakes
- **Zen Mode**: Practice without pressure

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Wordle and other word games
- Language samples sourced from common phrases and greetings
- Built with modern web technologies

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Live Demo**: [Coming Soon]

**Made with ❤️ and TypeScript**
