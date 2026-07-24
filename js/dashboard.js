function updateDashboard() {
    ui.dashboardPack.textContent =
        PackManager.currentPack?.title ?? "-";
    ui.dashboardTheme.textContent =
        ThemeManager.themes[ThemeManager.currentTheme]?.name ?? "-";
    ui.dashboardPlayers.textContent =
        gameState.players.length;
    ui.dashboardQuestion.textContent =
        `${gameState.currentQuestion + 1} / ${gameState.order.length}`;
    ui.dashboardReveal.textContent = gameState.revealed
    ? "🟢 Revealed" : "🔴 Hidden";
    const leader =
        [...gameState.players]
        .sort((a,b)=>b.score-a.score)[0];
    ui.dashboardLeader.textContent =
        leader
        ? `${leader.name} (${leader.score})`
        : "-";
    const progress = gameState.order.length
        ? Math.round(((gameState.currentQuestion+1)/gameState.order.length)*100):0;
    let icon="🟢";
    if(progress>=75)
        icon="🏁";
    else if(progress>=50)
        icon="🟡";
    ui.dashboardProgress.textContent=
    `${icon} ${progress}%`;
    ui.dashboardSound.textContent =
        gameState.settings.soundEnabled
        ? "ON"
        : "OFF";
    if(gameState.paused){
        ui.dashboardTime.textContent =
            "⏸ Paused";
    }
    else{
        ui.dashboardTime.textContent =
            getElapsedTime();
    }
}

function getElapsedTime() {

    if (!gameState.startTime)
        return "00:00";
    let elapsed =
        Date.now()
        - gameState.startTime
        - gameState.pausedDuration;
    // Freeze the timer while paused
    if (gameState.paused && gameState.pauseStarted) {
        elapsed -=
            Date.now() - gameState.pauseStarted;
    }
    const seconds =
        Math.floor(elapsed / 1000);
    const mins =
        String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs =
        String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
}