const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const imageData = ctx.createImageData(width, height);
const data = imageData.data;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const i = 4*(y*width + x);
        
        const r = x / width;
        const g = y / height;
        const b = 0.2;

        const col = new Vec3(x / width, y / height, 0.2).multiply(255.9).toInt();

        data[i+0] = col.r;
        data[i+1] = col.g;
        data[i+2] = col.b;
        data[i+3] = 255;
    }
}

ctx.putImageData(imageData, 0, 0);
