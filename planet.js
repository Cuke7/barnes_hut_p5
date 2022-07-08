class Planet {
    constructor(index) {
        this.pos = createVector(random(canvaWidth), random(canvaHeight))
        this.index = index
        this.mass = 10
    }
    draw() {
        fill(255)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.mass)
    }
}