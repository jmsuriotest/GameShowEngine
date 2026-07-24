// =========================
// Shared Game State
// =========================

const gameState = {
    players: [],
    questions: [],
    order: [],
    currentQuestion: 0,
    currentQuestionData:null,
    revealed: false,
    startTime:null,
    pauseStarted:null,
    pausedDuration:0,
    paused:false,
    settings: {
        shuffleQuestions: true,
        soundEnabled: true,
        revealAnimation: true,
        showProgressBar: true,
        pointsPerCorrect: 5,
        imageBackground: "checker"
    }

};

// =========================
// Cached Settings
// =========================
const DEFAULT_SETTINGS = {
    shuffleQuestions: true,
    soundEnabled: true,
    revealAnimation: true,
    showProgressBar: true,
    pointsPerCorrect: 5,
    imageBackground: "checker"
};

// =========================
// Cached DOM Elements
// =========================

const ui = {
    playerList: document.getElementById("plist"),
    gameHeader: document.getElementById("gameHeader"),
    playerCount: document.getElementById("pcount"),
    setupScreen: document.getElementById("setupScreen"),
    gameScreen: document.getElementById("gameScreen"),
    progressBar: document.getElementById("progressBar"),
    guessImage: document.getElementById("guessImage"),
    answerImage: document.getElementById("answerImage"),
    answerText: document.getElementById("answerText"),
    revealPanel: document.getElementById("reveal"),
    scoreContainer: document.getElementById("scoreContainer"),
    winnerScreen: document.getElementById("winnerScreen"),
    prevBtn: document.getElementById("prevBtn"),
    revealBtn: document.getElementById("revealBtn"),
    nextBtn: document.getElementById("nextBtn"),
    podium: document.getElementById("podium"),
    settingsBtn: document.getElementById("settingsBtn"),
    restartBtn: document.getElementById("restartBtn"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
    gameOverOverlay: document.getElementById("gameOverOverlay"),
    confettiCanvas: document.getElementById("confettiCanvas"),
    packSelect: document.getElementById("packSelect"),
    winnerTitle: document.getElementById("winnerTitle"),
    packInfo: document.getElementById("packInfo"),
    packDescription: document.getElementById("packDescription"),
    packVersion: document.getElementById("packVersion"),
    packQuestions: document.getElementById("packQuestions"),
    packAuthor: document.getElementById("packAuthor"),
    startGameBtn: document.getElementById("startGameBtn"),
    themeSelect: document.getElementById("themeSelect"),
    dashboardPack: document.getElementById("dashboardPack"),
    dashboardTheme: document.getElementById("dashboardTheme"),
    dashboardPlayers: document.getElementById("dashboardPlayers"),
    dashboardQuestion: document.getElementById("dashboardQuestion"),
    dashboardLeader: document.getElementById("dashboardLeader"),
    dashboardProgress: document.getElementById("dashboardProgress"),
    dashboardSound: document.getElementById("dashboardSound"),
    dashboardTime: document.getElementById("dashboardTime"),
    dashboardReveal: document.getElementById("dashboardReveal"),
    pauseBtn: document.getElementById("pauseBtn"),
    muteBtn: document.getElementById("muteBtn"),
    shuffleBtn: document.getElementById("shuffleBtn"),
    randomBtn: document.getElementById("randomBtn"),
    skipBtn: document.getElementById("skipBtn"),
    settings : {
        modal: document.getElementById("settingsModal"),
        saveBtn: document.getElementById("saveSettingsBtn"),
        closeBtn: document.getElementById("closeSettingsBtn"),
        shuffleQuestions: document.getElementById("shuffleQuestions"),
        revealAnimation: document.getElementById("revealAnimation"),
        showProgressBar: document.getElementById("showProgressBar"),
        soundEnabled: document.getElementById("soundEnabled"),
        pointsPerCorrect: document.getElementById("pointsPerCorrect")
    }
};
const CONFIG = {
    GAME_OVER_DELAY: 3000,
    CONFETTI_COUNT: 180,
    CONFETTI_BURST: 20,
    IMAGE_TRANSITION_FADE: 250,
    REVEAL_ANIMATION_FADE: 350,
    SCORE_INCREMENT: 5,
    MIN_PLAYERS: 2
}