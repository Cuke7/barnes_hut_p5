class Planet {
    constructor(x, y, index) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.force = createVector(0, 0)
        this.index = index
        this.mass = 10

    }
    draw() {
        fill(255)
        noStroke()
        ellipse(this.pos.x, this.pos.y, 10)
    }

    update() {
        this.acc = this.force.div(this.mass)
        this.acc.limit(0.5)
        this.vel.add(this.acc)
        this.vel.limit(20)
        this.pos.add(this.vel)
        if (this.pos.x > canvaWidth) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = canvaWidth
        if (this.pos.y > canvaHeight) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = canvaHeight
    }
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}