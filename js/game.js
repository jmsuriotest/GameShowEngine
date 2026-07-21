function startGame(){
    gameState.players = [];
    for (let i = 0; i < ui.playerCount.value; i++) {
        gameState.players.push({
            name: document.getElementById("n"+i).value,
            score: 0
        });
    }
    ui.setupScreen.style.display="none";
    ui.gameScreen.style.display="block";
    ui.gameHeader.style.display = "block";
    ui.playerCountLabel.textContent =
        `Players: ${gameState.players.length}`;
    render();
    drawscore();
}

function nextQuestion() {
    if(gameState.currentQuestion>=gameState.order.length-1){
        showWinnerScreen();
        return;
    }
    gameState.currentQuestion++
    render();
//    if (gameState.currentQuestion < gameState.order.length - 1) {
//        gameState.currentQuestion++;
//        render();
//    } else {
//        showWinnerScreen();
//        return;
//    }
}

function previousQuestion(){
     if(gameState.currentQuestion>0){
     gameState.currentQuestion--;render();
     }
 }

function revealAnswer(){
    ui.answerImage.src = ui.answerImage.dataset.nextSrc;
    ui.answerText.textContent = ui.answerText.dataset.nextAnswer;

    ui.revealPanel.classList.add("show");
        //ui.revealPanel.classList.remove("hidden");
//        ui.revealPanel.classList.add("show");
}

function shuffleQuestions() {
    for (
        let i = gameState.order.length - 1;
        i > 0;
        i--
    ) {
        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [
            gameState.order[i],
            gameState.order[j]
        ] = [
            gameState.order[j],
            gameState.order[i]
        ];

    }

}


function getCurrentQuestion() {

    return gameState.questions[
        gameState.order[
            gameState.currentQuestion
        ]
    ];

}
function render(){

    ui.revealPanel.classList.remove("show");
    const question = getCurrentQuestion();

    ui.guessImage.src = question.guess;

    // Clear answer while hidden
    ui.answerImage.src = "";
    ui.answerText.textContent = "";

    // Store the real answer for later
    ui.answerImage.dataset.nextSrc = question.answerImage;
    ui.answerText.dataset.nextAnswer = question.answer;


    ui.questionNumber.textContent =
                `Question ${
                    gameState.currentQuestion + 1
                }/${gameState.questions.length}`;

    ui.progressBar.style.width = ((gameState.currentQuestion + 1) / gameState.questions.length * 100) + "%";

}

function draw(){

    html += `
    <div class="player-card">
        <div class="player-name">
            ${p.name}
        </div>
        <div class="player-score">
            ${p.score}
        </div>
        <div class="player-buttons">
            <button onclick="mod(${i},5)">+5</button>

            <button onclick="mod(${i},-5)">-5</button>
        </div>
    </div>
    `;
    ui.scoreContainer.innerHTML =html;
}
function mk(){
    let s="";
    for(let i=0;i<ui.playerCount.value;i++)s+=`P${i+1}:<input id=n${i} value="Player ${i+1}"><br>`;
    ui.playerList.innerHTML=s;
}

function initializeGame() {

    gameState.questions = questions;

    gameState.order = [...questions.keys()];

    gameState.currentQuestion = 0;

    shuffleQuestions();

}