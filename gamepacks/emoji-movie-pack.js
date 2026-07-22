const EMOJI_MOVIE_PACK = {
    id: "emoji movie",
    title: "🎭 Guess The Movie",
    version: "1.0",
    author: "Mike",
    description:
        "Guess the movie from emojis.",
    imageFolder: "images/logos",
    revealSound: "correct",
    questionType: "image",
    questions: [
        {
            "guess": "assets/logos/guess/google.png",
            "answerImage": "assets/logos/answer/google.png",
            "answer": "Google"
          }
    ]
};
PackManager.register(EMOJI_MOVIE_PACK);