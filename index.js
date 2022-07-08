let planets = []
let tree;
let canvaWidth = 1000
let canvaHeight = 800
let nBody = 4

function setup() {
    // P5 configuration
    createCanvas(canvaWidth, canvaHeight);
    background(0)
    rectMode(CORNERS)

    // planet.push()

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
    for (const planet of planets) {
        tree.calcForces(planet)
        planet.draw()
    }
    tree.draw()
}

function mousePressed() {
    planets.push(new Planet(mouseX, mouseY, planets.length))
}