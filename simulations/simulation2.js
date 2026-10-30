import {Vector2} from "/scripts/Vector2.js";
import {G} from "/scripts/Constants.js";

const simulation = document.getElementById("simulation2");

const ctx = simulation.getContext("2d");

ctx.fillStyle = "black";

class Particle {
    constructor(initialPosition, radius, mass, ctx) {
        this.position = initialPosition;
        this.radius = radius;
        this.mass = mass;
        this.ctx = ctx;
        this.velocity = Vector2(0, 0);
        this.acceleration = Vector2(0, 0);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    update(dt) {
        this.draw();
        this.velocity +=
        this.position = 
    }

    getAcceleration(particle2) {
        // a = GM_2/r^2
        this.acceleration = ... (TODO TMR)
    }
}

const particle1 = new Particle(new Vector2(100, 0), 100, ctx);
particle1.draw();

// Physics loop
let previousTime = performance.now()

const maximum_time_between_frames = 0.05

function physicsProcess(now) {
    const dt = Math.min((now - previousTime)/1000, maximum_time_between_frames);
    previousTime = now
    particle1.update(dt);
    clear();

    requestAnimationFrame(physicsProcess);
}
requestAnimationFrame(physicsProcess);