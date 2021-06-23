const canvas = document.getElementById('canvas');

const hitableList = new HitableList([
    new Sphere(new Vec3(0, 0, -1), 0.5, new Lambertian(new Vec3(0.8, 0.3, 0.3))), 
    new Sphere(new Vec3(0, -100.5, -1), 100, new Lambertian(new Vec3(0.8, 0.8, 0))),
    new Sphere(new Vec3(1, 0, -1), 0.5, new Metal(new Vec3(0.8, 0.6, 0.2), 0)),
    new Sphere(new Vec3(-1, 0, -1), 0.5, new Dielectric(1.5)),
    new Sphere(new Vec3(-1, 0, -1), -0.45, new Dielectric(1.5))
//    new Sphere(new Vec3(-Math.PI/4, 0, -1), Math.PI/4, new Lambertian(new Vec3(0, 0, 1))),
//    new Sphere(new Vec3(Math.PI/4, 0, -1), Math.PI/4, new Lambertian(new Vec3(1, 0, 0)))
]);

const lookFrom = new Vec3(3, 3, 2);
const lookAt = new Vec3(0, 0, -1);
const fov = 0.35;
const distToFocus = Vec3.subtract(lookFrom, lookAt).length;
const aperture = 0.5;

const camera = new Camera(lookFrom, lookAt, new Vec3(0, 1, 0), fov, canvas.width/canvas.height, aperture, distToFocus);

const renderer = new Renderer(canvas);

renderer.render(hitableList, camera);
