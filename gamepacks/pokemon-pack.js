const POKEMON_PACK = {
    id: "pokemon",
    title: "👾 Guess The Pokemon",
    version: "1.0",
    author: "Mike",
    description:
        "Guess the pokemon.",
    imageFolder: "images/logos",
    revealSound: "correct",
    questionType: "image",
    questions: [
        {
            "guess": "assets/logos/guess/apple.png",
            "answerImage": "assets/logos/answer/apple.png",
            "answer": "Apple"
          }
    ]
};
PackManager.register(POKEMON_PACK);