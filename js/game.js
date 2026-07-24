function startGame(){
    Sound.play("click");
    const selectedPack = PackManager.get(
        ui.packSelect.value
    );
    if(!PackManager.load(selectedPack)){
        alert("Unable to load game.");
        return;
    }
    initializeGame();
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
    ui.revealBtn.disabled = false;
    ui.prevBtn.disabled = true;
    ui.nextBtn.disabled = false;
    render();
    applySettings();
    updateQuickControls();
    document.getElementById("gameTitle").textContent =
    PackManager.currentPack.title;
    gameState.startTime = Date.now();
    gameState.pausedDuration = 0;
    gameState.pauseStarted = null;
    gameState.paused = false;
    setInterval(updateDashboard,1000);
}
function nextQuestion() {
    if(gameState.paused){
        Sound.play("error");
        return;
    }
    gameState.revealed = false;
    if(gameState.currentQuestion>=gameState.order.length-1){
        ui.nextBtn.disabled = true;
        Sound.play("gameover");
        showWinnerScreen();
        return;
    }
    gameState.currentQuestion++
    Sound.play("click");
    if (gameState.settings.revealAnimation) {
        ui.revealPanel.classList.remove("show");
        setTimeout(() => {
            ui.revealPanel.classList.add("hidden");
        }, CONFIG.REVEAL_ANIMATION_FADE);
    } else {
        ui.revealPanel.classList.remove("show");
        ui.revealPanel.classList.add("hidden");
    }
    ui.revealBtn.disabled = false;
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
    if(gameState.paused){
        Sound.play("error");
        return;
    }
    Sound.play("click")
    if(gameState.currentQuestion>0){
        gameState.currentQuestion--;
        render();
        ui.revealBtn.disabled = false;
    }
 }

function revealAnswer(){
    if(gameState.paused){
        Sound.play("error");
        return;
    }
    Sound.play("reveal");
    gameState.revealed = true;
    ui.revealBtn.disabled = true;
    changeImage(ui.answerImage,ui.answerImage.dataset.nextSrc);
    ui.answerText.textContent = ui.answerText.dataset.nextAnswer;
    if (gameState.settings.revealAnimation) {
        ui.revealPanel.classList.remove("hidden");
        requestAnimationFrame(() => {
            ui.revealPanel.classList.add("show");
        });
    } else {
        ui.revealPanel.classList.add("show");
        ui.revealPanel.classList.remove("hidden");
    }
        //ui.revealPanel.classList.remove("hidden");
//        ui.revealPanel.classList.add("show");
}

function shuffleQuestions() {
    gameState.order = [...gameState.questions.keys()];
    for (let i = gameState.order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.order[i], gameState.order[j]] =
            [gameState.order[j], gameState.order[i]];
    }
}

function getCurrentQuestion() {

    return gameState.questions[
        gameState.order[
            gameState.currentQuestion
        ]
    ];

}
function changeImage(img,newSrc){
    img.classList.add("fade");
    setTimeout(()=>{
        img.src=newSrc;
        img.classList.remove("fade");
    },CONFIG.IMAGE_TRANSITION_FADE);
}
function render(){

    ui.revealPanel.classList.remove("show");
    ui.revealPanel.classList.add("hidden");
    const question = getCurrentQuestion();

    changeImage(ui.guessImage, PackManager.currentPack.imageFolder + question.guess);

    // Clear answer while hidden
    ui.answerImage.src = "";
    ui.answerText.textContent = "";

    // Store the real answer for later
    ui.answerImage.dataset.nextSrc =  PackManager.currentPack.imageFolder + question.answerImage;
    ui.answerText.dataset.nextAnswer = question.answer;
    if (gameState.currentQuestion === 0) {
        ui.prevBtn.disabled = true;
    } else {
        ui.prevBtn.disabled = false;
    }
    drawProgressBar();
}

function drawProgressBar() {
    if (gameState.settings.showProgressBar) {
        ui.gameHeader.classList.remove("hidden");
        ui.progressBar.style.width =
            ((gameState.currentQuestion + 1) /
            gameState.questions.length) * 100 + "%";
    } else {
        ui.gameHeader.classList.add("hidden");
    }
}

function mk(){
    let s="";
    for(let i=0;i<ui.playerCount.value;i++)s+=`P${i+1}:<input id=n${i} value="Player ${i+1}"><br>`;
    ui.playerList.innerHTML=s;
}
function initializeGame() {
    //gameState.questions = questions;
    gameState.order = [...gameState.questions.keys()];
    gameState.currentQuestion = 0;
    if (gameState.settings.shuffleQuestions) {
        shuffleQuestions();
    } else {
        gameState.order = [...gameState.questions.keys()];
    }
}
function togglePause(){
    gameState.paused = !gameState.paused;
    if(gameState.paused){
        gameState.pauseStarted = Date.now();
        ui.pauseBtn.classList.add("active");
    }
    else{
        gameState.pausedDuration += Date.now() - gameState.pauseStarted;
        gameState.pauseStarted = null;
        ui.pauseBtn.classList.remove("active");
    }
    ui.pauseBtn.textContent =
    gameState.paused ? "▶ Resume" : "⏸ Pause";
    updateDashboard();
}
function toggleMute(){
    gameState.settings.soundEnabled =
        !gameState.settings.soundEnabled;
    ui.muteBtn.textContent =
        gameState.settings.soundEnabled
            ? "🔊 Sound"
            : "🔇 Muted";
    updateDashboard();
    console.log("Sound Enabled:", gameState.settings.soundEnabled);
    Storage.set(
        "sound",
        gameState.settings.soundEnabled
    );
}
function shuffleRemainingQuestions() {
    const played =
        gameState.order.slice(
            0,
            gameState.currentQuestion + 1
        );
    const remaining =
        [...gameState.order.slice(
            gameState.currentQuestion + 1
        )];
    shuffle(remaining);
    gameState.order = [
        ...played,
        ...remaining
    ];
    updateDashboard();
    Sound.play("click");

}
function randomQuestion(){
    const remaining =
        gameState.order.slice(
            gameState.currentQuestion+1
        );
    if(!remaining.length)
        return;
    const next =
        remaining[
            Math.floor(
                Math.random()*remaining.length
            )
        ];
    gameState.currentQuestion =
        gameState.order.indexOf(next);
    render();
}
function updateQuickControls(){
    const disabled =
        ui.setupScreen.style.display !== "none";
    [
        ui.pauseBtn,
        ui.shuffleBtn,
        ui.skipBtn,
        ui.randomBtn
    ].forEach(btn=>{
        btn.disabled = disabled;
    });
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}