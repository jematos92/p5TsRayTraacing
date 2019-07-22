class Particle {
    position : p5.Vector;
    rays : Ray[];
    // Field of View angle in Degrees.
    fieldOfView : number = 60;
    particleSize = 4;
    // heading
    heading = 0;
    constructor() {
        this.position = createVector(sceneW / 2, sceneH / 2);
        this.rays = [];
        for (let i = -(this.fieldOfView / 2); i < (this.fieldOfView / 2); i += 1) {
            this.rays.push(new Ray(this.position, radians(i) + this.heading))
        }
    }

    rotate(angle : number) {
        this.heading += angle;
        let index = 0;
        for (let i = -(this.fieldOfView / 2); i < (this.fieldOfView / 2); i += 1) {
            this.rays[index].setAngle(radians(i) + this.heading)
            index++
        }
    }
    move(steps : number) {
        let velocity = p5.Vector.fromAngle(this.heading);
        velocity.setMag(steps);
        this.position.add(velocity);
    }
    lookAt(x : number, y : number) {
        this.position.x = x;
        this.position.y = y;
    }

    cast(boundaries : Boundary[]): number[]{
        var distanceArray: number[] = [];
        for (let i = 0; i < this.rays.length; i++) {
            let ray = this.rays[i];
            var recordDistance = Infinity
            var recordCrashPoint: p5.Vector = null;
            for (var boundary of boundaries) {
                var crashPoint = ray.cast(boundary);
                if (crashPoint != null) {
                    var crashDistance = p5.Vector.dist(this.position, crashPoint)
                    const rayAngleToParticle = ray.direction.heading() - this.heading;
                    crashDistance *= cos(rayAngleToParticle)
                    if (crashDistance < recordDistance) {
                        recordDistance = crashDistance;
                        recordCrashPoint = crashPoint;
                    }
                }
            }
            if (recordCrashPoint != null) {
                stroke(255, 200)
                line(this.position.x, this.position.y, recordCrashPoint.x, recordCrashPoint.y)
            }
            distanceArray[i] = recordDistance
        }
        return distanceArray;
    }

    show() {
        fill(255)
        ellipse(this.position.x, this.position.y, this.particleSize, this.particleSize);
        for (var ray of this.rays) {
            ray.show();
        }
    }
}
