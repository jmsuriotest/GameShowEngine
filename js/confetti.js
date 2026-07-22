const Confetti = {
    canvas:null,
    ctx:null,
    particles:[],
    running:false
};

Confetti.init=function(){
    this.canvas=ui.confettiCanvas;
    this.ctx=this.canvas.getContext("2d");
    this.resize();
    window.addEventListener(
        "resize",
        ()=>this.resize()
    );
}
Confetti.resize=function(){
    this.canvas.width=window.innerWidth;
    this.canvas.height=window.innerHeight;
}
Confetti.createParticle = function(){
    const fromLeft = Math.random() < 0.5;
    return{
        // Launch from left or right side
        x: fromLeft ? -20 : this.canvas.width + 20,
        // Launch from bottom
        y: this.canvas.height - 20,
        // Shoot toward the center
        vx: fromLeft
            ? 1 + Math.random() * 2
            : -(1 + Math.random() * 2),
        // Shoot upward
        vy: -(12 + Math.random() * 6),
        gravity:0.10,
        size:6+Math.random()*8,
        rotation:Math.random()*360,
        rotationSpeed:(Math.random()-0.5)*4,
        shape: Math.random() > 0.5 ? "rect" : "circle",
        color:[
            "#FFD700", // Gold
            "#C0C0C0", // Silver
            "#CD7F32", // Bronze
            "#FFFFFF", // White
            "#1E90FF"  // Accent blue
        ][Math.floor(Math.random()*5)]
    };
}
Confetti.start=function(){
    this.canvas.classList.remove("hidden");
    this.particles=[];
    for(let i=0;i<180;i++){
        this.particles.push(
            this.createParticle()
        );
    }
    this.running=true;
    this.animate();
}
Confetti.animate=function(){
    if(!this.running) return;
    this.ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );
    this.particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        if (p.shape === "rect") {

            this.ctx.fillRect(
                -p.size/2,
                -p.size/2,
                p.size,
                p.size
            );

        } else {

            this.ctx.beginPath();

            this.ctx.arc(
                0,
                0,
                p.size/2,
                0,
                Math.PI*2
            );

            this.ctx.fill();

        }
        this.ctx.save();
        this.ctx.translate(p.x,p.y);
        this.ctx.rotate(
            p.rotation*Math.PI/180
        );
        this.ctx.fillStyle=p.color;
        this.ctx.fillRect(
            -p.size/2,
            -p.size/2,
            p.size,
            p.size
        );
        this.ctx.restore();
    });
    this.particles = this.particles.filter(p => {
        return (
            p.y < this.canvas.height + 50 &&
            p.x > -100 &&
            p.x < this.canvas.width + 100
        );
    });
    if(this.particles.length){
        requestAnimationFrame(
            ()=>this.animate()
        );
    }else{
        this.stop();
    }
}
Confetti.stop=function(){
    this.running=false;
    this.canvas.classList.add("hidden");
}