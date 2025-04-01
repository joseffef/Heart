const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const heartPoints = [];

function createHeartShape() {
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        heartPoints.push({ x: x * 20 + canvas.width / 2, y: -y * 20 + canvas.height / 2 });
    }
}

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.length = Math.random() * 10 + 5; // Line length
    this.angle = Math.random() * Math.PI * 2; // Random angle
    this.target = heartPoints[Math.floor(Math.random() * heartPoints.length)];
}

Particle.prototype.update = function () {
    this.x += (this.target.x - this.x) * 0.02 + this.vx;
    this.y += (this.target.y - this.y) * 0.02 + this.vy;
    this.angle += 0.1; // Rotating effect

    // Change target randomly for continuous movement
    if (Math.random() < 0.01) {
        this.target = heartPoints[Math.floor(Math.random() * heartPoints.length)];
    }
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 0, 128, ${this.opacity})`;
    ctx.lineWidth = 1.5;
    
    // Calculate line end position using angle
    let x2 = this.x + Math.cos(this.angle) * this.length;
    let y2 = this.y + Math.sin(this.angle) * this.length;

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function init() {
    createHeartShape();
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
    animate();
}

init();
