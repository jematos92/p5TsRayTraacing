class Ray {
    position : p5.Vector;
    direction : p5.Vector;
    constructor(startPos : p5.Vector, angle : number) {
        this.position = startPos;
        this.direction = p5.Vector.fromAngle(angle);
    }

    setAngle(angle : number) {
        this.direction = p5.Vector.fromAngle(angle);
    }
    // Debug function to redirect the ray to passed x and y coordinates.
    lookAt(x : number, y : number) {
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y;
        this.direction.normalize();
    }
    show() {
        stroke(255);
        push();
        translate(this.position.x, this.position.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }

    cast(boundary : Boundary): p5.Vector | null {
        // Denormalize the x and y values to make the formulas
        // more readable.
        const x1 = boundary.pointA.x;
        const y1 = boundary.pointA.y;

        const x2 = boundary.pointB.x;
        const y2 = boundary.pointB.y;

        const x3 = this.position.x;
        const y3 = this.position.y;

        const x4 = this.position.x + this.direction.x;
        const y4 = this.position.y + this.direction.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        // This only happens if the two lines, (Boundary and the ray) are parallel
        // to each other, meaning that they dont intersect
        if (den == 0) {
            return null;
        }

        const numt = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
        const numu = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);
        const t = numt / den;
        const u = - numu / den;

        // The ray and the boundary intersects.
        if (t > 0 && t < 1 && u > 0) {
            const crashPoint = createVector();
            crashPoint.x = x1 + t * (x2 - x1)
            crashPoint.y = y1 + t * (y2 - y1)
            return crashPoint;

        }
        return null;
    }
}
