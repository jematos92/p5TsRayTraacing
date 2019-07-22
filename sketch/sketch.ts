var boundaries: Boundary[];
var particle: Particle;
var sceneW = 400;
var sceneH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
function setup() {
    let canvas = createCanvas(this.sceneW * 2, this.sceneH);
    canvas.parent('canvascontainer');
    this.boundaries = [];
    // Setup Walls
    for (let i = 0; i < 3; i++) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        this.boundaries.push(new Boundary(x1, y1, x2, y2));
    }
    // Setup boundaries walls.
    boundaries.push(new Boundary(0, 0, sceneW, 0));
    boundaries.push(new Boundary(0, 0, 0, sceneH));
    boundaries.push(new Boundary(sceneW, sceneH, sceneW, 0));
    boundaries.push(new Boundary(sceneW, sceneH, 0, sceneH));
    particle = new Particle();
}

function draw() {

    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.05);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-1);
    }


    background(0)
    particle.show();
    let distances = particle.cast(this.boundaries);
    var resolution_x = sceneW / distances.length;

    push();
    translate(sceneW, 0);
    for (let index = 0; index < distances.length; index++) {
        const distance = distances[index];
        const distancesq = distance * distance;
        const sceneWsq = sceneW * sceneW;
        let brightness = map(distancesq, 0, sceneWsq, 255, 0)
        let height = map(distance, 0, sceneW, sceneH, 0)

        noStroke();

        fill(brightness);
        rectMode(CENTER)
        rect(index * resolution_x + resolution_x / 2, sceneH / 2, resolution_x + 1, height)

    }
    pop();
    // particle.lookAt(mouseX, mouseY)
    for (var boundary of boundaries) {
        boundary.show();
    }
}
