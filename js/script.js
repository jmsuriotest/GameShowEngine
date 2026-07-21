window.addEventListener("DOMContentLoaded", () => {

    gameState.questions = questions;

    gameState.order = [...questions.keys()];
    initializeGame
    shuffleQuestions();

    render();

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