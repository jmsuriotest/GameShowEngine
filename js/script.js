window.addEventListener("DOMContentLoaded", () => {
//    PackManager.load(LOGO_PACK);
//    //gameState.questions = questions;
//    gameState.order = [...gameState.questions.keys()];
//    initializeGame
//    if (gameState.settings.shuffleQuestions) {
//        shuffleQuestions();
//    } else {
//        gameState.order = [...gameState.questions.keys()];
//    }
//    render();
    PackManager.populateSelect();

    PackManager.updateInfo();
    Object.values(Sound.sounds).forEach(sound=>{
        sound.load();
    });
});


window.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    document
        .getElementById("fullscreenBtn")
        .addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
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
    "click",
    nextQuestion
);
ui.revealBtn.addEventListener(
    "click",
    revealAnswer
);
ui.prevBtn.addEventListener(
    "click",
    previousQuestion
);
ui.settingsBtn.addEventListener(
    "click",
    openSettings
);
ui.settings.closeBtn.addEventListener(
    "click",
    closeSettings
);
ui.settings.saveBtn.addEventListener(
    "click",
    saveSettings
);
ui.packSelect.addEventListener(
    "change",
    ()=>{
        PackManager.updateInfo();
    }
);
Confetti.init();