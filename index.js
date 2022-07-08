let planets = []
let tree;
let canvaWidth = 1000
let canvaHeight = 800
let nBody = 400

function setup() {
    // P5 configuration
    createCanvas(canvaWidth, canvaHeight);
    background(0)
    rectMode(CORNERS)

    for (let i = 0; i < nBody; i++) {
        planets.push(new Planet(random(canvaWidth), random(canvaHeight), i))
    }

}

function draw() {
    background(0)
    // Create a new tree where the 4 corners of the root node are the 4 corners of the canvas
    tree = new Node(createVector(0, 0),
        createVector(canvaWidth, 0),
        createVector(canvaWidth, canvaHeight),
        createVector(0, canvaHeight),
        0,
        applyForce
    )
    // Add each body/planet to the tree
    for (const planet of planets) {
        tree.addBody(planet)
    }
    for (const planet of planets) {
        tree.calcForces(planet)
        planet.update()
        planet.draw()
    }
    // tree.draw()
}

function applyForce(affectedBody, body) {
    let force = p5.Vector.sub(body.pos, affectedBody.pos);
    let dist = force.mag()
    force.setMag((body.mass * affectedBody.mass) / dist)
    affectedBody.force.add(force)
}