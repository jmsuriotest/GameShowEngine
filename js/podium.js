function createPodium(){
const ranking = [...gameState.players].sort((a, b) => b.score - a.score);
    const top3 = ranking.slice(0, 3);
    let html = `
                <div class="place second">
                    🥈
                    <h3>${top3[1] ? top3[1].name : "-"}</h3>
                    <p>${top3[1] ? top3[1].score : 0} pts</p>
                </div>

                <div class="place first">
                    🥇
                    <h2>${top3[0] ? top3[0].name : "-"}</h2>
                    <h3>${top3[0] ? top3[0].score : 0} pts</h3>
                </div>

                <div class="place third">
                    🥉
                    <h3>${top3[2] ? top3[2].name : "-"}</h3>
                    <p>${top3[2] ? top3[2].score : 0} pts</p>
                </div>
    `;

    ui.podium.innerHTML = html;
}
function animatePodium(){
    const cards = document.querySelectorAll(".place");
    cards.forEach((card,index)=>{
        setTimeout(()=>{
            card.classList.add("show");
        },index*250);
    });
}
function showWinnerScreen(){
    ui.gameOverOverlay.classList.remove("hidden");
    winnerTitle.textContent =
    `🏆 ${PackManager.currentPack.title} Complete!`;
    setTimeout(()=>{
        createPodium();
        ui.gameOverOverlay.classList.add("hidden");
        ui.winnerScreen.classList.remove("hidden");
           animatePodium();
           Confetti.start();
        Sound.play("winner");
    },CONFIG.GAME_OVER_DELAY);
}