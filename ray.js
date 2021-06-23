class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    pointAtParameter(t) {
        return Vec3.add(this.origin, Vec3.multiply(this.direction, t));
    }
}
