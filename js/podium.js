function showWinnerScreen() {
    ui.winnerScreen.classList.remove("hidden");
    ui.winnerScreen.style.display = "flex";
    // Highest score first
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