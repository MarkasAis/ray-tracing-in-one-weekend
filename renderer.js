class Renderer {
    constructor(canvas, sampleNumber=50, maxBounceCount=10) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.sampleNumber = sampleNumber;
        this.maxBounceCount = maxBounceCount;
    }

    render(hitableList, camera) {
        const timer = new Timer();
        timer.start();

        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const i = 4*((this.height-1-y)*this.width + x);
                let col = new Vec3(0, 0, 0);

                for (let s = 0; s < this.sampleNumber; s++) {
                    const s = (x + Utils.random(-1, 1)) / this.width;
                    const t = (y + Utils.random(-1, 1)) / this.height;
            
                    const ray = camera.getRay(s, t);

                    col.add(this.color(ray, hitableList));
                }

                col.divide(this.sampleNumber);

                // Gama correction
                col = new Vec3(Math.sqrt(col.x), Math.sqrt(col.y), Math.sqrt(col.z));

                col.multiply(255.99).toInt();

                data[i+0] = col.r;
                data[i+1] = col.g;
                data[i+2] = col.b;
                data[i+3] = 255;
            }

            timer.update(y / this.height);
            timer.print();
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    
    color(ray, hitableList, depth=0) {
        const record = hitableList.hit(ray, 0.001, 1000);

        if (record) {
            if (depth <= this.maxBounceCount) {
                const scatter = record.material.scatter(ray, record);

                if (scatter.scattered) {
                    return Vec3.multiply(scatter.attenuation, this.color(scatter.ray, hitableList, depth+1));
                }
            }

            return new Vec3(0, 0, 0);
        }

        return this.skyColor(ray);
    }

    skyColor(ray) {
        const white = new Vec3(1, 1, 1);
        const blue = new Vec3(0.5, 0.7, 1);

        const t = 0.5 * (ray.direction.normalized.y + 1);

        return Vec3.add(Vec3.multiply(white, 1-t), Vec3.multiply(blue, t));
    }
}

