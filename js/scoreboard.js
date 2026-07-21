function drawscore() {
    const highestScore = gameState.players.length
        ? Math.max(...gameState.players.map(player => player.score))
        : 0;
    let html = "";
    gameState.players.forEach((player, index) => {
        const leaderClass =
            player.score === highestScore
                ? "leader"
                : "";
        html += `
        <div class="player-row ${leaderClass}">

            <span class="player-name">
                ${player.name}
            </span>

            <span class="player-score">
                ${player.score}
            </span>

            <div class="player-buttons">
                <button onclick="mod(${index},5)">+5</button>
                <button onclick="mod(${index},-5)">-5</button>
            </div>

        </div>
        `;
    });
    ui.scoreContainer.innerHTML = html;
}

function mod(index, amount){
    gameState.players[index].score += amount;
    drawscore();
}