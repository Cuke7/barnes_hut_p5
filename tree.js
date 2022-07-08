let theta = 0.5

class Node {
    constructor(topleft, topRight, bottomRight, bottomLeft, depth, applyForce) {
        this.topLeft = topleft // Coordinates of the top left corner
        this.topRight = topRight
        this.bottomLeft = bottomLeft
        this.bottomRight = bottomRight
        this.depth = depth
        this.center = this.topRight.copy().add(this.bottomLeft).div(2) // center of the node
        this.massCenter = createVector(0, 0)
        this.mass = 0
        this.width = this.topRight.copy().sub(this.topLeft).x / 2
        this.applyForce = applyForce
    }

    calcForces(affectedBody) {
        // If the node have no subnodes
        if (!this.bottomLeftNode) {
            // If the node has a body and that body is not the affected body
            if (this.body && affectedBody.index != this.body.index) {
                this.applyForce(affectedBody, this.body)
            }
        } else {
            // The node have sub nodes
            let d = dist(affectedBody.pos.x, affectedBody.pos.y, this.massCenter.x, this.massCenter.y);
            let ratio = this.width / d;
            // If the node is sufficiently far away 
            if (ratio < theta) {
                this.applyForce(affectedBody, { pos: this.massCenter, mass: this.mass })
            } else {
                // The node isn't far away enough, call calForce on all its subnodes
                this.topRightNode.calcForces(affectedBody);
                this.topLeftNode.calcForces(affectedBody);
                this.bottomRightNode.calcForces(affectedBody);
                this.bottomLeftNode.calcForces(affectedBody);
            }
        }
    }

    updateMassCenter(newBody) {
        let m = newBody.mass
        let pos = newBody.pos.copy()
        let wPos = pos.mult(m)
        this.massCenter.mult(this.mass).add(wPos).div(this.mass + m)
        this.mass += newBody.mass
    }


    draw() {
        textSize(12);
        fill('red')
        stroke('red')
        // If the node has NO subnodes
        if (!this.bottomLeftNode) text(this.depth, this.topRight.x - 15, this.topRight.y + 15)

        // If the node has subnodes, draw them and tell them to draw their eventual subnodes
        if (this.topRightNode) {
            noFill();
            stroke(255);
            rect(this.topRightNode.topLeft.x, this.topRightNode.topLeft.y, this.topRightNode.bottomRight.x, this.topRightNode.bottomRight.y)
            rect(this.topLeftNode.topLeft.x, this.topLeftNode.topLeft.y, this.topLeftNode.bottomRight.x, this.topLeftNode.bottomRight.y)
            rect(this.bottomRightNode.topLeft.x, this.bottomRightNode.topLeft.y, this.bottomRightNode.bottomRight.x, this.bottomRightNode.bottomRight.y)
            rect(this.bottomLeftNode.topLeft.x, this.bottomLeftNode.topLeft.y, this.bottomLeftNode.bottomRight.x, this.bottomLeftNode.bottomRight.y)
            this.topRightNode.draw();
            this.topLeftNode.draw();
            this.bottomRightNode.draw();
            this.bottomLeftNode.draw();
        }
    }


    addBody(newBody) {
        this.updateMassCenter(newBody)
        // If a body is present in the node
        if (this.body) {
            // Subdivide the node into 4 quadrants (4 sub nodes)
            // TOP LEFT
            this.topLeftNode = new Node(
                this.topLeft.copy(),
                this.topRight.copy().add(this.topLeft).div(2),
                this.center,
                this.bottomLeft.copy().add(this.topLeft).div(2),
                this.depth + 1,
                this.applyForce
            )
            // TOP RIGHT
            this.topRightNode = new Node(
                this.topRight.copy().add(this.topLeft).div(2),
                this.topRight.copy(),
                this.bottomRight.copy().add(this.topRight).div(2),
                this.center,
                this.depth + 1,
                this.applyForce
            )
            // BOTTOM RIGHT
            this.bottomRightNode = new Node(
                this.center,
                this.bottomRight.copy().add(this.topRight).div(2),
                this.bottomRight.copy(),
                this.bottomRight.copy().add(this.bottomLeft).div(2),
                this.depth + 1,
                this.applyForce
            )
            // BOTTOM LEFT
            this.bottomLeftNode = new Node(
                this.bottomLeft.copy().add(this.topLeft).div(2),
                this.center,
                this.bottomRight.copy().add(this.bottomLeft).div(2),
                this.bottomLeft.copy(),
                this.depth + 1,
                this.applyForce
            )
            // Place the new body in the correct subnode that we just created
            this.distributeBody(newBody)
            // Place the body already present in the node in the correct subnode that we just created
            this.distributeBody(this.body)
            this.body = null
        }
        // There is no body in the node
        else {
            // If the node already has sub nodes, go deeper in the tree
            if (this.bottomLeftNode) {
                // Place the body in the correct subnode
                this.distributeBody(newBody)
            } else {
                // The node dosen't have subnode and is empty so the new body belongs here
                this.body = newBody
            }
        }
    }


    // Compute in which sub node does a body belong, according to its position 
    distributeBody(body) {
        // If the body belongs in the TOP LEFT subnode
        if (body.pos.x < this.center.x && body.pos.y < this.center.y) this.topLeftNode.addBody(body)
        // ... TOP RIGHT subnode
        if (body.pos.x > this.center.x && body.pos.y < this.center.y) this.topRightNode.addBody(body)
        // ... BOTTOM RIGHT subnode
        if (body.pos.x > this.center.x && body.pos.y > this.center.y) this.bottomRightNode.addBody(body)
        // ... BOTTOM LEFT subnode
        if (body.pos.x < this.center.x && body.pos.y > this.center.y) this.bottomLeftNode.addBody(body)
    }
}