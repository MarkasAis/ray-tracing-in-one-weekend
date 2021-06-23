class Metal extends Material {
    constructor(albedo, roughness=0) {
        super();
        this.albedo = albedo;
        this.roughness = Utils.clamp(0, 1, roughness);
    }

    scatter(ray, record) {
        const reflected = Vec3.add(Vec3.reflect(ray.direction, record.normal, false), 
            Vec3.multiply(Vec3.randomInUnitSphere(), this.roughness));

        return {
            ray: new Ray(record.point, reflected),
            attenuation: this.albedo,
            scattered: (Vec3.dot(reflected, record.normal) > 0)
        };
    }
}
