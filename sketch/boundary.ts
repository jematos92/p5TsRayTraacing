class Boundary {
    pointA : p5.Vector;
    pointB : p5.Vector;
    constructor(x1 : number, y1 : number, x2 : number, y2 : number) {
        this.pointA = createVector(x1, y1);
        this.pointB = createVector(x2, y2);
    }

    show() {
        stroke(255);
        line(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y)
    }
}
