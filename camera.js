function randomInUnitDisk() {
    do {
        var point = new Vec3(Utils.random(-1, 1), Utils.random(-1, 1), 0);
    } while (point.squaredLength >= 1);

    return point;
}

class Camera {
    constructor(lookFrom, lookAt, up, verticalFov, aspectRatio, aperture, focusDistance) {
        this.lensRadius = aperture * 0.5;
        this.origin = lookFrom;

        const halfHeight = Math.tan(verticalFov * 0.5);
        const halfWidth = aspectRatio * halfHeight;

        this.w = Vec3.subtract(lookFrom, lookAt).normalize();
        this.u = Vec3.cross(up, this.w).normalize();
        this.v = Vec3.cross(this.w, this.u);

        this.lowerLeftCorner = Vec3.subtract(Vec3.subtract(Vec3.subtract(this.origin,
            Vec3.multiply(this.u, halfWidth*focusDistance)), Vec3.multiply(this.v, halfHeight*focusDistance)),
            Vec3.multiply(this.w, focusDistance));
        this.horizontal = Vec3.multiply(this.u, 2*halfWidth*focusDistance);
        this.vertical = Vec3.multiply(this.v, 2*halfHeight*focusDistance);
    }

    getRay(s, t) {
        const localOffset = randomInUnitDisk().multiply(this.lensRadius);
        const offset = Vec3.add(Vec3.multiply(this.u, localOffset.x), Vec3.multiply(this.v, localOffset.y));

        return new Ray(
            Vec3.add(this.origin, offset),
            Vec3.add(this.lowerLeftCorner, Vec3.add(Vec3.multiply(this.horizontal, s),
                Vec3.subtract(Vec3.subtract(Vec3.multiply(this.vertical, t), this.origin), offset)))
        );
    }
}
