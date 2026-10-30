const simulation = document.getElementById("simulation2");

const ctx = simulation.getContext("2d");

ctx.fillStyle = "black";

class Particle {
    constructor(initialPosition, radius, ctx) {
        this.initialPosition = initialPosition;
        this.radius = radius;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.initialPosition.x, this.initialPosition.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}

particle1 = new Particle(new Vector2(-5, 0), 5, ctx);
particle1.draw();
