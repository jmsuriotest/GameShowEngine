function openSettings() {
    loadSettings();
    ui.settings.modal.classList.remove("hidden");
}

function closeSettings() {
    ui.settings.modal.classList.add("hidden");
}

function loadSettings() {
    ui.settings.shuffleQuestions.checked =
        gameState.settings.shuffleQuestions;
    ui.settings.revealAnimation.checked =
        gameState.settings.revealAnimation;
    ui.settings.showProgressBar.checked =
        gameState.settings.showProgressBar;
    ui.settings.pointsPerCorrect.value =
        gameState.settings.pointsPerCorrect;
    ui.settings.soundEnabled.checked =
        gameState.settings.soundEnabled;
}

function saveSettings() {
    gameState.settings.shuffleQuestions =
        ui.settings.shuffleQuestions.checked;
    gameState.settings.revealAnimation =
        ui.settings.revealAnimation.checked;
    gameState.settings.showProgressBar =
        ui.settings.showProgressBar.checked;
    gameState.settings.pointsPerCorrect =
        Number(ui.settings.pointsPerCorrect.value);
    gameState.settings.soundEnabled =
        ui.settings.soundEnabled.checked;
    applySettings();
    closeSettings();
}
function updateProgressVisibility() {
    if (gameState.settings.showProgressBar) {
        ui.gameHeader.classList.remove("hidden");
    } else {
        ui.gameHeader.classList.add("hidden");
    }
}
function updateScoreButtons() {
    drawScore();
}
function updateRevealAnimation() {

    // Reserved for Version 1.3.5

}
function updateShuffleMode() {

    // Reserved for Version 1.3.5

}
function applySettings() {
    updateProgressVisibility();
    updateScoreButtons();
    updateRevealAnimation();
    updateShuffleMode();
    Sound.setEnabled(
        gameState.settings.soundEnabled
    );
}
function refreshUI() {
    drawScore();
    render();
    updateProgressVisibility();
}