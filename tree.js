
class Node {
    constructor(topleft, topRight, bottomRight, bottomLeft, depth) {
        this.topLeft = topleft // Coordinates of the top left corner
        this.topRight = topRight
        this.bottomLeft = bottomLeft
        this.bottomRight = bottomRight
        this.depth = depth
        this.center = this.topRight.copy().add(this.bottomLeft).div(2) // center of the node
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

        // If there is a body the node, draw it
        if (this.body) {
            this.body.draw()
        }
    }


    addBody(newBody) {
        // If a body is present in the node
        if (this.body) {
            // Subdivide the node into 4 quadrants (4 sub nodes)
            // TOP LEFT
            this.topLeftNode = new Node(
                this.topLeft.copy(),
                this.topRight.copy().add(this.topLeft).div(2),
                this.center,
                this.bottomLeft.copy().add(this.topLeft).div(2),
                this.depth + 1
            )
            // TOP RIGHT
            this.topRightNode = new Node(
                this.topRight.copy().add(this.topLeft).div(2),
                this.topRight.copy(),
                this.bottomRight.copy().add(this.topRight).div(2),
                this.center,
                this.depth + 1
            )
            // BOTTOM RIGHT
            this.bottomRightNode = new Node(
                this.center,
                this.bottomRight.copy().add(this.topRight).div(2),
                this.bottomRight.copy(),
                this.bottomRight.copy().add(this.bottomLeft).div(2),
                this.depth + 1
            )
            // BOTTOM LEFT
            this.bottomLeftNode = new Node(
                this.bottomLeft.copy().add(this.topLeft).div(2),
                this.center,
                this.bottomRight.copy().add(this.bottomLeft).div(2),
                this.bottomLeft.copy(),
                this.depth + 1
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