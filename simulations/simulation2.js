import {Vector2} from "/scripts/Vector2.js";
import {G} from "/scripts/Constants.js";

const simulation = document.getElementById("simulation2");

simulation.width = simulation.clientWidth;
simulation.height = simulation.clientHeight;

const resetButton = document.getElementById("simulation2_reset");

const ctx = simulation.getContext("2d");

ctx.fillStyle = "black";

let particle1OriginalPosition = new Vector2(simulation.clientWidth/6, simulation.clientHeight/2);
let particle2OriginalPosition = new Vector2(5 * simulation.clientWidth/6, simulation.clientHeight/2);

let particle1OriginalVelocity = Vector2.ZERO;
let particle2OriginalVelocity = Vector2.ZERO;

let particle1Radius = simulation.clientHeight/10;
let particle2Radius = simulation.clientHeight/10;

let particle1Mass = 500;
let particle2Mass = 500;


let particle1Offset = new Vector2(0, -6);
let particle2Offset = new Vector2(0, 6);


function resize2DCanvas() {
  const dpr = window.devicePixelRatio || 1;
  
  // Read the actual CSS size on screen (in CSS pixels)
  const rect = simulation.getBoundingClientRect();

  // Multiply the internal drawing buffer by screen pixel density
  simulation.width = rect.width * dpr;
  simulation.height = rect.height * dpr;

  // Reset transform and scale so drawing coordinates match CSS pixels
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}


resize2DCanvas();
window.addEventListener('resize', resize2DCanvas);

const arrowScale = 1/10000;

class Particle {
    constructor(initialPosition, radius, mass, velocity, ctx, color, arrowColor, arrowOffset=Vector2.ZERO) {
        this.position = initialPosition;
        this.radius = radius;
        this.mass = mass;
        this.ctx = ctx;
        this.color = color;
        this.arrowColor = arrowColor;
        this.velocity = velocity;
        this.acceleration = Vector2.ZERO;
        this.stopped = false;
        this.arrowOffset = arrowOffset
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    drawArrow(vector) {
        let angle = Math.atan2(vector.y, vector.x);
        let headLength = 30; // vertical length of arrow head
        let arrowAngle = Math.PI/7;

        let from = new Vector2(this.position.x + this.arrowOffset.x, this.position.y + this.arrowOffset.y);
        let to = new Vector2(this.position.x + this.arrowOffset.x + vector.x, this.position.y + this.arrowOffset.y + vector.y);

        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x - headLength * Math.cos(angle)/2 , to.y - headLength * Math.sin(angle)/2);
        this.ctx.lineWidth = 7;
        this.ctx.strokeStyle = this.arrowColor;
        this.ctx.stroke();

        // Draw arrow behind end of line
        this.ctx.beginPath();
        this.ctx.moveTo(to.x, to.y);
        this.ctx.lineTo(to.x - headLength * Math.cos(angle - arrowAngle), to.y - headLength * Math.sin(angle - arrowAngle));
        this.ctx.lineTo(to.x - headLength * Math.cos(angle + arrowAngle), to.y - headLength * Math.sin(angle + arrowAngle));
        this.ctx.lineTo(to.x, to.y);
        this.ctx.fillStyle = this.arrowColor;
        this.ctx.fill();
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

const particle1 = new Particle(particle1OriginalPosition.copy(), particle1Radius, particle1Mass, particle1OriginalVelocity.copy(), ctx, 'rgba(251, 115, 115, 1)', 'rgba(180, 72, 72, 1)', particle1Offset.copy());
const particle2 = new Particle(particle2OriginalPosition.copy(), particle2Radius, particle2Mass, particle2OriginalVelocity.copy(), ctx, 'rgba(80, 185, 255, 1)', 'rgba(50, 123, 171, 1)', particle2Offset.copy());

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
    ctx.clearRect(0, 0, simulation.clientWidth, simulation.clientHeight);
    const dt = Math.min((now - previousTime)/1000, maximum_time_between_frames);
    previousTime = now;
    particle1.setAcceleration(particle2);
    particle2.setAcceleration(particle1);

    particle1.update(dt);
    particle2.update(dt);

    handleCollision(particle1, particle2);
    
    particle1.draw();
    particle2.draw();
    particle1.drawArrow(particle1.acceleration.scaled(particle1.mass * arrowScale));
    particle2.drawArrow(particle2.acceleration.scaled(particle2.mass * arrowScale));
    requestAnimationFrame(physicsProcess);
}
requestAnimationFrame(physicsProcess);

