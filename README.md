# Shoebody Bop

A React application with YouTube integration featuring the Shoebody Bop Summoner.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kjayuson/shoebodybop.git
cd shoebodybop
```

2. Install dependencies for the main project:
```bash
npm install
```

3. Install dependencies for the Shoebody Bop Summoner app:
```bash
cd shoebody-bop-summoner
npm install
```

## Running the Application

### Option 1: Run the Shoebody Bop Summoner app

Navigate to the shoebody-bop-summoner directory and start the development server:

```bash
cd shoebody-bop-summoner
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Option 2: Run the main app

From the root directory:

```bash
npm start
```

## Available Scripts

In the `shoebody-bop-summoner` directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
shoebodybop/
├── App.tsx              # Main TypeScript React component
├── package.json         # Root dependencies
├── shoebody-bop-summoner/
│   ├── public/          # Public assets
│   ├── src/             # Source files
│   │   ├── App.js       # Main app component
│   │   ├── App.css      # Styling
│   │   └── index.js     # Entry point
│   └── package.json     # App dependencies
└── README.md
```

## Technologies Used

- React 19
- React YouTube
- Canvas Confetti
- Create React App

## License

This project is private.
