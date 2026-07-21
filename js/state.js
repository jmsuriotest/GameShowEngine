// =========================
// Shared Game State
// =========================

const gameState = {
    players: [],
    questions: [],
    order: [],
    currentQuestion: 0,
    revealed: false

};

// =========================
// Cached DOM Elements
// =========================

const ui = {
    playerCountLabel: document.getElementById("playerCount"),
    playerList: document.getElementById("plist"),
    gameHeader: document.getElementById("gameHeader"),
    playerCount: document.getElementById("pcount"),
    setupScreen: document.getElementById("setup"),
    gameScreen: document.getElementById("game"),
    questionNumber: document.getElementById("questionText"),
    progressBar: document.getElementById("progressBar"),
    guessImage: document.getElementById("g"),
    answerImage: document.getElementById("aimg"),
    answerText: document.getElementById("ans"),
    revealPanel: document.getElementById("reveal"),
    scoreContainer: document.getElementById("scores"),
    winnerScreen: document.getElementById("winnerScreen"),
    podium: document.getElementById("podium")

};