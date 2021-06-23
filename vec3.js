class Vec3 {
    constructor(x, y, z) {
        this.values = [x, y, z];
    }

    add(xOrVector, y, z) {
        if (xOrVector instanceof Vec3) {
            this.values[0] += xOrVector.values[0];
            this.values[1] += xOrVector.values[1];
            this.values[2] += xOrVector.values[2];
        } else {
            this.values[0] += xOrVector;
            this.values[1] += y;
            this.values[2] += z;
        }

        return this;
    }

    subtract(xOrVector, y, z) {
        if (xOrVector instanceof Vec3) {
            this.values[0] -= xOrVector.values[0];
            this.values[1] -= xOrVector.values[1];
            this.values[2] -= xOrVector.values[2];
        } else {
            this.values[0] -= xOrVector;
            this.values[1] -= y;
            this.values[2] -= z;
        }

        return this;
    }

    multiply(scalarOrVector) {
        if (scalarOrVector instanceof Vec3) {
            this.values[0] *= scalarOrVector.values[0];
            this.values[1] *= scalarOrVector.values[1];
            this.values[2] *= scalarOrVector.values[2];
        } else {
            this.values[0] *= scalarOrVector;
            this.values[1] *= scalarOrVector;
            this.values[2] *= scalarOrVector;
        }

        return this;
    }

    divide (scalar) {
        this.values[0] /= scalar;
        this.values[1] /= scalar;
        this.values[2] /= scalar;

        return this;
    }

    dot(vector) {
        return this.values[0]*vector.values[0] + 
               this.values[1]*vector.values[1] + 
               this.values[2]*vector.values[2];
    }

    cross(vector) {
        return new Vec3(
            this.values[1]*vector.values[2] - this.values[2]*vector.values[1],
            this.values[2]*vector.values[0] - this.values[0]*vector.values[2],
            this.values[0]*vector.values[1] - this.values[1]*vector.values[0]
        );
    }

    normalize() {
        this.divide(this.length);

        return this;
    }

    reflect(target, normalized=false) {
        const normalizedTarget = normalized ? target : target.normalized;

        this.subtract(Vec3.multiply(Vec3.multiply(normalizedTarget, Vec3.dot(this, normalizedTarget)), 2));

        return this;
    }

    toInt() {
        this.values[0] = ~~(this.values[0]);
        this.values[1] = ~~(this.values[1]);
        this.values[2] = ~~(this.values[2]);
   
        return this;
    }

    clone() {
        return new Vec3(...this.values);
    }

    get x() {
        return this.values[0];
    }

    set x(x) {
        this.values[0] = x;
    }

    get y() {
        return this.values[1];
    }

    set (y) {
        this.values[1] = y;
    }

    get z() {
        return this.values[2];
    }

    set (z) {
        this.values[2] = z;
    }

    get r() {
        return this.values[0];
    }

    set r(r) {
        this.values[0] = r;
    }

    get g() {
        return this.values[1];
    }

    set g(g) {
        this.values[1] = g;
    }

    get b() {
        return this.values[2];
    }

    set b(b) {
        this.values[2] = b;
    }

    get squaredLength() {
        return this.values[0]*this.values[0] + 
               this.values[1]*this.values[1] + 
               this.values[2]*this.values[2];
    }

    get length() {
        return Math.sqrt(this.squaredLength);
    }

    get normalized() {
        return this.clone().normalize();
    }

    static add(vectorA, vectorB) {
        return vectorA.clone().add(vectorB);
    }

    static subtract(vectorA, vectorB) {
        return vectorA.clone().subtract(vectorB);
    }

    static multiply(vector, scalarOrVector) {
        return vector.clone().multiply(scalarOrVector);
    }

    static divide(vector, scalar) {
        return vector.clone().divide(scalar);
    }

    static dot(vectorA, vectorB) {
        return vectorA.dot(vectorB);
    }

    static cross(vectorA, vectorB) {
        return vectorA.cross(vectorB);
    }

    static reflect(vector, target, normalized=false) {
        return vector.clone().reflect(target, normalized);
    }

    static randomInUnitSphere() {
        do {
            var point = new Vec3(Utils.random(-1, 1), Utils.random(-1, 1), Utils.random(-1, 1));
        } while (point.squaredLength >= 1);

        return point;
    }
}
