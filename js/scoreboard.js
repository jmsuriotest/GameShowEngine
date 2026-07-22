function drawScore() {
    const highestScore = gameState.players.length
        ? Math.max(...gameState.players.map(player => player.score))
        : 0;
    const points = gameState.settings.pointsPerCorrect;
    let html = "";
    gameState.players.forEach((player, index) => {
        const leaderClass =
            player.score === highestScore
                ? "leader"
                : "";
        html += `
        <div class="player-row ${leaderClass}" id="player-row-${index}">

            <span class="player-name">
                ${player.name}
            </span>

            <div class="player-score">
                <span id="score-${index}">
                    ${player.score}
                </span>
            </div>

            <div class="player-buttons">

                <button onclick="mod(${index}, ${points})">
                    +${points}
                </button>

                <button onclick="mod(${index}, ${-points})">
                    ${-points}
                </button>
            </div>

        </div>
        `;
    });
    ui.scoreContainer.innerHTML = html;
}

function mod(index, amount){
    if(amount>0) {
        Sound.play("score");
    } else {
        Sound.play("error");
    }
    const score = document.getElementById(`score-${index}`);
    score.classList.add("score-change");
    setTimeout(() => {
        score.classList.remove("score-change");
    },250);
    gameState.players[index].score += amount;
    updatePlayerScore(index);
    updateLeaderHighlight();
    showScoreAnimation(index, amount);
}
function updatePlayerScore(index) {
    const score = document.getElementById(`score-${index}`);
    if (!score) return;
    score.textContent = gameState.players[index].score;
}
function updateLeaderHighlight(){
    const highest = Math.max(
        ...gameState.players.map(player => player.score)
    );
    gameState.players.forEach((player,index)=>{
        const card = document.getElementById(`player-row-${index}`);
        if(!card) return;
        card.classList.toggle(
            "leader",
            player.score === highest
        );
    });
}
function showScoreAnimation(index, points) {
    const scoreElement = document.getElementById(`score-${index}`);
    if (!scoreElement) return;
    const popup = document.createElement("span");
    popup.className =
        points > 0
            ? "score-popup positive"
            : "score-popup negative";
    popup.textContent =
        points > 0
            ? `+${points}`
            : points;
    scoreElement.parentElement.appendChild(popup);
    popup.addEventListener("animationend", () => {
        popup.remove();
    });
}