window.addEventListener("DOMContentLoaded", () => {
    ThemeManager.populateSelect();
    if (!ThemeManager.loadSaved()) {
        ThemeManager.apply("default");
    }
    PackManager.populateSelect();
    if (!PackManager.loadSaved()) {
        const pack = PackManager.get(ui.packSelect.value);
        PackManager.load(pack);
        PackManager.updateInfo();
    }
    const sound =
        Storage.get("sound",true);
    gameState.settings.soundEnabled = sound;
    ui.muteBtn.textContent =
            gameState.settings.soundEnabled
                ? "🔊 Sound"
                : "🔇 Muted";
    initializeGame();
    updateDashboard();
    updateQuickControls();

    ui.revealBtn.disabled = true;
    ui.prevBtn.disabled = true;
    ui.nextBtn.disabled = true;
    Object.values(Sound.sounds).forEach(sound => sound.load());
    document
        .getElementById("fullscreenBtn")
        .addEventListener("click", toggleFullscreen);
});

document
    .getElementById("setupForm")
    .addEventListener("submit", e => {
        e.preventDefault();
        startGame();
    });

document
    .getElementById("createPlayersBtn")
    .addEventListener("click", mk);

ui.nextBtn.addEventListener(
    "click", () => {
    nextQuestion();
    updateDashboard();
});
ui.revealBtn.addEventListener(
    "click", () => {
    revealAnswer();
    updateDashboard();
});
ui.prevBtn.addEventListener(
    "click", () => {
    previousQuestion();
    updateDashboard();
});
ui.settingsBtn.addEventListener(
    "click", () => {
    openSettings();
    updateDashboard();
});
ui.settings.closeBtn.addEventListener(
    "click", () => {
    closeSettings();
    updateDashboard();
});
ui.settings.saveBtn.addEventListener(
    "click", () => {
    saveSettings();
    updateDashboard();
});
ui.packSelect.addEventListener("change", () => {
    const pack = PackManager.get(ui.packSelect.value);
    PackManager.load(pack);
    PackManager.updateInfo();
    updateDashboard();
});
Confetti.init();
ui.themeSelect.addEventListener(
    "change", () => {
    const theme = ThemeManager.apply(ui.themeSelect.value);
    updateDashboard();
});
ui.pauseBtn.addEventListener(
    "click",
    togglePause
);
ui.muteBtn.addEventListener(
      "click",
      toggleMute
);
ui.skipBtn.addEventListener(
    "click",
    nextQuestion
);
ui.shuffleBtn.addEventListener(
    "click",
    shuffleRemainingQuestions
);