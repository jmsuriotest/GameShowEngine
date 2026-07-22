const Sound = {

    enabled: true,

    sounds: {
        click: new Audio("assets/sounds/click.mp3"),
        reveal: new Audio("assets/sounds/reveal.mp3"),
        winner: new Audio("assets/sounds/winner.mp3"),
        error: new Audio("assets/sounds/error.mp3"),
        gameover: new Audio("assets/sounds/gameover.mp3"),
        score: new Audio("assets/sounds/score.mp3")
    },
    play(name) {
        if (!this.enabled) return;
        const sound = this.sounds[name];
        if (!sound) {
            console.warn("Missing sound:", name);
            return;
        }
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    },
    stop(name) {
        const sound = this.sounds[name];
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    },
    stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    },
    setEnabled(enabled) {
        this.enabled = enabled;
    }
};