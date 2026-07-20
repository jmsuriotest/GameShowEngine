const questions = [
  {
    "guess": "guess/google.png",
    "answerImage": "answer/google.png",
    "answer": "Google"
  },
  {
    "guess": "guess/apple.png",
    "answerImage": "answer/apple.png",
    "answer": "Apple"
  },
  {
    "guess": "guess/mcdonalds.png",
    "answerImage": "answer/mcdonalds.png",
    "answer": "McDonald\'s"
  },
  {
    "guess": "guess/nike.png",
    "answerImage": "answer/nike.png",
    "answer": "Nike"
  },
  {
    "guess": "guess/adidas.png",
    "answerImage": "answer/adidas.png",
    "answer": "Adidas"
  },
  {
    "guess": "guess/amazon.png",
    "answerImage": "answer/amazon.png",
    "answer": "Amazon"
  },
  {
    "guess": "guess/facebook.webp",
    "answerImage": "answer/facebook.webp",
    "answer": "Facebook"
  },
  {
    "guess": "guess/instagram.png",
    "answerImage": "answer/instagram.png",
    "answer": "Instagram"
  },
  {
    "guess": "guess/netflix.png",
    "answerImage": "answer/netflix.png",
    "answer": "Netflix"
  },
  {
    "guess": "guess/youtube.png",
    "answerImage": "answer/youtube.png",
    "answer": "YouTube"
  },
  {
    "guess": "guess/spotify.png",
    "answerImage": "answer/spotify.png",
    "answer": "Spotify"
  },
  {
    "guess": "guess/samsung.webp",
    "answerImage": "answer/samsung.webp",
    "answer": "Samsung"
  },
  {
    "guess": "guess/playstation.png",
    "answerImage": "answer/playstation.png",
    "answer": "PlayStation"
  },
  {
    "guess": "guess/xbox.png",
    "answerImage": "answer/xbox.png",
    "answer": "Xbox"
  },
  {
    "guess": "guess/cocacola.png",
    "answerImage": "answer/cocacola.png",
    "answer": "Coca-"
  },
  {
    "guess": "guess/pepsi.png",
    "answerImage": "answer/pepsi.png",
    "answer": "Pepsi"
  },
  {
    "guess": "guess/starbucks.webp",
    "answerImage": "answer/starbucks.webp",
    "answer": "Starbucks"
  },
  {
    "guess": "guess/kfc.png",
    "answerImage": "answer/kfc.png",
    "answer": "KFC"
  },
  {
    "guess": "guess/burgerking.png",
    "answerImage": "answer/burgerking.png",
    "answer": "Burger King"
  },
  {
    "guess": "guess/toyota.png",
    "answerImage": "answer/toyota.png",
    "answer": "Toyota"
  },
  {
    "guess": "guess/honda.png",
    "answerImage": "answer/honda.png",
    "answer": "Honda"
  },
  {
    "guess": "guess/bmw.png",
    "answerImage": "answer/bmw.png",
    "answer": "BMW"
  },
  {
    "guess": "guess/mercedes.png",
    "answerImage": "answer/mercedes.png",
    "answer": "Mercedes-Benz"
  },
  {
    "guess": "guess/ferrari.png",
    "answerImage": "answer/ferrari.png",
    "answer": "Ferrari"
  },
  {
    "guess": "guess/lamborghini.png",
    "answerImage": "answer/lamborghini.png",
    "answer": "Lamborghini"
  },
  {
    "guess": "guess/tiktok.png",
    "answerImage": "answer/tiktok.png",
    "answer": "TikTok"
  },
  {
    "guess": "guess/discord.jpg",
    "answerImage": "answer/discord.jpg",
    "answer": "Discord"
  },
  {
    "guess": "guess/redbull.png",
    "answerImage": "answer/redbull.png",
    "answer": "Red Bull"
  },
  {
    "guess": "guess/pringles.png",
    "answerImage": "answer/pringles.png",
    "answer": "Pringles"
  },
  {
    "guess": "guess/shell.png",
    "answerImage": "answer/shell.png",
    "answer": "Shell"
  }
]

//let qs=[],order=[],idx=0,players=[{name:'Player 1',score:0}];


//fetch('questions.json').then(r=>r.json()).then(d=>{qs=d;order=[...qs.keys()];for(let i=order.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}render();});

let qs = questions,idx=0,players=[{name:'Player 1',score:0}];

let order = [...qs.keys()];

for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [order[i], order[j]] =
        [order[j], order[i]];
}

render();

function cur(){return qs[order[idx]]}
function render(){let c=cur();q.textContent=`Question ${idx+1}/${qs.length}`;g.src=c.guess;document.getElementById('reveal').style.display='none';aimg.src=c.answerImage;ans.textContent=c.answer;draw();
fill.style.width=((idx+1)/qs.length*100)+'%';}
function reveal(){document.getElementById('reveal').style.display='inline';}
//function next(){if(idx<order.length-1){idx++;render();}}
function next() {
    if (idx < order.length - 1) {
        idx++;
        render();
    } else {
        showGameOver();
    }
}
function showGameOver() {

    // Highest score first
    const ranking = [...players].sort((a, b) => b.score - a.score);

    const top3 = ranking.slice(0, 3);

    let html = `
        <div class="winner-screen">

            <h1>🏆 GAME OVER 🏆</h1>

            <h2>Top Players</h2>

            <div class="podium">

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

            </div>

            <button onclick="location.reload()">
                Play Again
            </button>

        </div>
    `;

    document.body.innerHTML = html;

}
function prev(){if(idx>0){idx--;render();}}
function draw(){scores.innerHTML=players.map((p,i)=>`${p.name}: ${p.score} <button onclick="players[${i}].score++;draw()">+1</button><button onclick="players[${i}].score--;draw()">-1</button>`).join('<br>');}

