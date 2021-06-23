class Sphere {
    constructor(center, radius, material) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    }

    hit(ray, tMin, tMax, record) {
        const oc = Vec3.subtract(ray.origin, this.center);
        const a = Vec3.dot(ray.direction, ray.direction);
        const b = Vec3.dot(oc, ray.direction);
        const c = Vec3.dot(oc, oc) - this.radius*this.radius;
        const discriminant = b*b - a*c;

        if (discriminant > 0) {
            let t = (-b - Math.sqrt(discriminant)) / a;
            if (t > tMax || t < tMin) t = (-b + Math.sqrt(discriminant)) / a;
            if (t > tMax || t < tMin) return false; 

            record.t = t;
            record.point = ray.pointAtParameter(record.t);
            record.normal = Vec3.subtract(record.point, this.center).divide(this.radius);
            record.material = this.material;

            return true;
        }

        return false;
    }
}
