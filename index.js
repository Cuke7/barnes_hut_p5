let planets = []
let tree;
let canvaWidth = 1000
let canvaHeight = 800
let nBody = 50

function setup() {
    // P5 configuration
    createCanvas(canvaWidth, canvaHeight);
    background(0)
    rectMode(CORNERS)

    // Create the body/planets
    for (let i = 0; i < nBody; i++) {
        planets.push(new Planet(i))
    }

    // Draw function is called 30 times per second
    frameRate(30)
}

function draw() {
    background(0)

    // Create a new tree where the 4 corners are the 4 corners of the canvas
    tree = new Node(createVector(0, 0), createVector(canvaWidth, 0), createVector(canvaWidth, canvaHeight), createVector(0, canvaHeight), 0)

    // Add each body/planet to the tree
    for (const planet of planets) {
        tree.addBody(planet)
    }
    tree.draw()
}