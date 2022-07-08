class Planet {
    constructor(x, y, index) {
        this.pos = createVector(x, y)
        this.vel = p5.Vector.random2D()
        this.vel.setMag(random(2))
        this.index = index
        this.mass = 10
    }
    draw() {
        fill(255)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.mass)
    }

    update() {
        // this.pos.add(this.vel)
        if (this.pos.x > canvaWidth) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = canvaWidth
        if (this.pos.y > canvaHeight) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = canvaHeight
    }
}