class Lambertian extends Material {
    constructor(albedo) {
        super();
        this.albedo = albedo;
    }

    scatter(ray, record) {
        const targetDirection = Vec3.add(record.normal, Vec3.randomInUnitSphere());

        return {
            ray: new Ray(record.point, targetDirection),
            attenuation: this.albedo,
            scattered: true
        };
    }
}
