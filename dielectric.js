function refract(vector, normal, niOverNt) {
    const normalizedVector = vector.normalized;
    const dt = Vec3.dot(normalizedVector, normal);
    const discriminant = 1 - niOverNt*niOverNt * (1-dt*dt);

    if (discriminant > 0) {
        return {
            direction: Vec3.subtract(
                Vec3.multiply(Vec3.subtract(normalizedVector, Vec3.multiply(normal, dt)), niOverNt),
                Vec3.multiply(normal, Math.sqrt(discriminant))
            ),
            refracted: true
        }
    }

    return {
        refracted: false
    }
}

function schlick(cosine, refractiveIndex) {
    let r0 = (1-refractiveIndex) / (1+refractiveIndex);
    r0 *= r0;

    return r0 + (1-r0)*Math.pow(1-cosine, 5);
}

class Dielectric extends Material {
    constructor(refractiveIndex) {
        super();
        this.refractiveIndex = refractiveIndex;
    }

    scatter(ray, record) {
        const reflected = Vec3.reflect(ray.direction, record.normal);

        if (Vec3.dot(ray.direction, record.normal) > 0) {
            var outwardsNormal = Vec3.multiply(record.normal, -1);
            var niOverNt = this.refractiveIndex;
            var cosine = this.refractiveIndex * Vec3.dot(ray.direction, record.normal) / ray.direction.length;
        } else {
            var outwardsNormal = record.normal;
            var niOverNt = 1 / this.refractiveIndex;
            var cosine = -Vec3.dot(ray.direction, record.normal) / ray.direction.length;
        }

        const refraction = refract(ray.direction, outwardsNormal, niOverNt);

        const reflectProbability = refraction.refracted ? 
            schlick(cosine, this.refractiveIndex) : 1;
            
        if (Utils.random(0, 1) < reflectProbability) {
            var ray = new Ray(record.point, reflected);
        } else {
            var ray = new Ray(record.point, refraction.direction);
        }

        return {
            ray: ray,
            attenuation: new Vec3(1, 1, 1),
            scattered: true
        }
    }
}
