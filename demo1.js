const canvas = document.getElementById('canvas');

const spheres = [];

spheres.push(new Sphere(new Vec3(0, -1000, 0), 1000, new Lambertian(new Vec3(0.5, 0.5, 0.5))));

for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
        const center = new Vec3(a + Utils.random(0, 0.9), 0.2, b + Utils.random(0, 0.9));

        if (Vec3.subtract(center, new Vec3(4, 0.2, 0).length > 0.9)) {
            const chooseMaterial = Utils.random(0, 1);

            if (chooseMaterial < 0.65) {
                var material = new Lambertian(new Vec3(
                    Utils.random(0, 1)*Utils.random(0, 1),
                    Utils.random(0, 1)*Utils.random(0, 1),
                    Utils.random(0, 1)*Utils.random(0, 1)));
            } else if (chooseMaterial < 0.85) {
                var material = new Metal(new Vec3(
                    Utils.random(0.5, 1),
                    Utils.random(0.5, 1),
                    Utils.random(0.5, 1)), Utils.random(0, 0.5));
            } else {
                var material = new Dielectric(1.5);
            }

            spheres.push(new Sphere(center, 0.2, material));
        }
    }
}

spheres.push(new Sphere(new Vec3(0, 1, 0), 1, new Dielectric(1.5)));
spheres.push(new Sphere(new Vec3(-4, 1, 0), 1, new Lambertian(new Vec3(0.4, 0.2, 0.1))));
spheres.push(new Sphere(new Vec3(4, 1, 0), 1, new Metal(new Vec3(0.7, 0.6, 0.5), 0)));

const hitableList = new HitableList(spheres);

const lookFrom = new Vec3(10, 2, 2.5);
const lookAt = new Vec3(0, 0, -1);
const fov = 0.5;
const distToFocus = Vec3.subtract(lookFrom, lookAt).length;
const aperture = 0.025;

const camera = new Camera(lookFrom, lookAt, new Vec3(0, 1, 0), fov, canvas.width/canvas.height, aperture, distToFocus);

const renderer = new Renderer(canvas, 50, 5);

renderer.render(hitableList, camera);
