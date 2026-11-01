import {Vector2} from "/scripts/Vector2.js";
import {G} from "/scripts/Constants.js";

const simulation = document.getElementById("simulation3");

simulation.width = simulation.clientWidth;
simulation.height = simulation.clientHeight;

const distanceSlider = document.getElementById("simulation3_slider");

const ctx = simulation.getContext("2d");

ctx.fillStyle = "black";

let particle1OriginalPosition = new Vector2(125, 75);
let particle2OriginalPosition = new Vector2(175, 75);

let particle1OriginalVelocity = Vector2.ZERO;
let particle2OriginalVelocity = Vector2.ZERO;

let particle1Radius = 20;
let particle2Radius = 20;

let particle1Mass = 500;
let particle2Mass = 500;

let particle1Offset = Vector2.ZERO;
let particle2Offset = new Vector2(0, 5);

const arrowScale = 1/30000;

class Particle {
    constructor(initialPosition, radius, mass, velocity, ctx, arrowOffset=Vector2.ZERO) {
        this.position = initialPosition;
        this.radius = radius;
        this.mass = mass;
        this.ctx = ctx;
        this.velocity = velocity;
        this.acceleration = Vector2.ZERO;
        this.stopped = false;
        this.arrowOffset = arrowOffset
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.drawArrow(this.acceleration.scaled(this.mass * arrowScale));

    }

    drawArrow(vector) {
        let angle = Math.atan2(vector.y, vector.x);
        let headLength = 8; // vertical length of arrow head
        let arrowAngle = Math.PI/7;

        let from = new Vector2(this.position.x + this.arrowOffset.x, this.position.y + this.arrowOffset.y);
        let to = new Vector2(this.position.x + this.arrowOffset.x + vector.x, this.position.y + this.arrowOffset.y + vector.y);

        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x , to.y);
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Draw arrow behind end of line
        this.ctx.beginPath();
        this.ctx.moveTo(to.x, to.y);
        this.ctx.lineTo(to.x - headLength * Math.cos(angle - arrowAngle), to.y - headLength * Math.sin(angle - arrowAngle));
        this.ctx.lineTo(to.x - headLength * Math.cos(angle + arrowAngle), to.y - headLength * Math.sin(angle + arrowAngle));
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();

        // Add label showing magnitude
        this.ctx.font = "bold 10px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(String(Math.round(vector.getMagnitude())) + "N", this.position.x + vector.x/3 * 2, to.y -10);

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

const particle1 = new Particle(particle1OriginalPosition.copy(), particle1Radius, particle1Mass, particle1OriginalVelocity.copy(), ctx, particle1Offset.copy());
const particle2 = new Particle(particle2OriginalPosition.copy(), particle2Radius, particle2Mass, particle2OriginalVelocity.copy(), ctx, particle2Offset.copy());

function reset() {
    particle1.stopped = false;
    particle2.stopped = false;

    particle1.position = particle1OriginalPosition.copy();
    particle2.position = particle2OriginalPosition.copy(); 
}


distanceSlider.addEventListener("input", (e) => {
    var newDistance = parseFloat(e.target.value)/2;
    particle1OriginalPosition = new Vector2(150 - newDistance,75);
    particle2OriginalPosition = new Vector2(150 + newDistance,75);
    reset()
})

// No physics in this one
let previousTime = performance.now()

const maximum_time_between_frames = 0.05

function physicsProcess(now) {
    ctx.clearRect(0, 0, simulation.width, simulation.height);
    const dt = Math.min((now - previousTime)/1000, maximum_time_between_frames);
    previousTime = now;
    particle1.setAcceleration(particle2);
    particle2.setAcceleration(particle1);
    particle1.draw();
    particle2.draw();
    requestAnimationFrame(physicsProcess);
}
requestAnimationFrame(physicsProcess);

