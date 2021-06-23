class Utils {
    static lerp(a, b, t) {
        return (b-a) * t + a;
    }

    static inverseLerp(a, b, value) {
        return (value-a) / (b-a);
    }

    static map(fromA, fromB, toA, toB, value) {
        return this.lerp(toA, toB, this.inverseLerp(fromA, fromB, value));
    }

    static random(min, max) {
        return this.map(0, 1, min, max, Math.random());
    }

    static clamp(min, max, value) {
        return Math.min(Math.max(min, value), max);
    }
}
