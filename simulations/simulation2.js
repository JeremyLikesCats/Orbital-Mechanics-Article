import {Vector2} from "/scripts/Vector2.js";
import {G} from "/scripts/Constants.js";

const simulation = document.getElementById("simulation2");

const resetButton = document.getElementById("simulation2_reset");

const ctx = simulation.getContext("2d");

ctx.fillStyle = "black";

const particle1OriginalPosition = new Vector2(50, 75);
const particle2OriginalPosition = new Vector2(250, 75);

class Particle {
    constructor(initialPosition, radius, mass, velocity, ctx) {
        this.position = initialPosition;
        this.radius = radius;
        this.mass = mass;
        this.ctx = ctx;
        this.velocity = velocity;
        this.acceleration = Vector2.ZERO;
        this.stopped = false;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    update(dt) {

        if (this.stopped == false) {
            this.velocity.x += this.acceleration.x * dt
            this.velocity.y += this.acceleration.y * dt
            this.position.x += this.velocity.x * dt
            this.position.y += this.velocity.y * dt
        }
        
    }

    setAcceleration(particle2) {
        // a = GM_2/r^2
        let squaredDistance = this.position.squaredDistanceBetween(particle2.position);
        this.acceleration.set(new Vector2(particle2.position.x - this.position.x, particle2.position.y - this.position.y), G * particle2.mass / squaredDistance);
    }
}

const particle1 = new Particle(particle1OriginalPosition.copy(), 20, 500, Vector2.ZERO, ctx);
const particle2 = new Particle(particle2OriginalPosition.copy(), 20, 500, Vector2.ZERO, ctx);

function handleCollision(particle1, particle2) {
    if (particle1.position.squaredDistanceBetween(particle2.position) <= (particle1.radius + particle2.radius) ** 2) {
        particle1.stopped = true
        particle2.stopped = true
        let difference_vector = new Vector2(particle2.position.x - particle1.position.x, particle2.position.y - particle1.position.y);
        let difference_magnitude = difference_vector.getMagnitude();
        let correction_magnitude = (particle2.radius + particle1.radius - difference_magnitude);
        let correction_vector = Vector2.normalize(difference_vector, correction_magnitude);
        particle1.position.x -= correction_vector.x * correction_magnitude / 2;
        particle1.position.y -= correction_vector.y * correction_magnitude / 2;
        particle2.position.x += correction_vector.x * correction_magnitude / 2;
        particle2.position.y += correction_vector.y * correction_magnitude / 2;
        particle1.velocity.x = 0
        particle1.velocity.y = 0
        particle2.velocity.x = 0
        particle2.velocity.y = 0
    }
}

// Button controls
resetButton.addEventListener("click", () => {
    particle1.stopped = false;
    particle2.stopped = false;

    particle1.position = particle1OriginalPosition.copy();
    particle2.position = particle2OriginalPosition.copy(); 
})


// Physics loop
let previousTime = performance.now()

const maximum_time_between_frames = 0.05

function physicsProcess(now) {
    ctx.clearRect(0, 0, simulation.width, simulation.height);
    const dt = Math.min((now - previousTime)/1000, maximum_time_between_frames);
    previousTime = now;
    particle1.setAcceleration(particle2);
    particle2.setAcceleration(particle1);

    particle1.update(dt);
    particle2.update(dt);

    handleCollision(particle1, particle2);
    
    particle1.draw();
    particle2.draw();
    requestAnimationFrame(physicsProcess);
}
requestAnimationFrame(physicsProcess);

