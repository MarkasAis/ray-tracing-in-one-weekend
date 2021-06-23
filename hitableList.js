class HitableList {
    constructor(list) {
        this.list = list;
    }

    hit(ray, tMin, tMax) {
        let record;
        let hitAnything = false;
        let closest = tMax;

        for (let i = 0; i < this.list.length; i++) {
           let tempRecord = {};
            if (this.list[i].hit(ray, tMin, closest, tempRecord)) {
                hitAnything = true;
                closest = tempRecord.t;
                record = tempRecord;
            }
        }

        return record;
    }
}
