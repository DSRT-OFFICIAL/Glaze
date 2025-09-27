import { Vector3 } from '../core/math/Vector3.js';

export class Ray {
    constructor(origin = new Vector3(), direction = new Vector3(0,0,-1)) {
        this.origin = origin.clone();
        this.direction = direction.clone().normalize();
    }

    at(t) {
        return this.origin.clone().add(this.direction.clone().multiplyScalar(t));
    }

    intersectPlane(planeNormal, planePoint) {
        const denom = planeNormal.dot(this.direction);
        if (Math.abs(denom) < 1e-6) return null; // parallel
        const t = planePoint.clone().sub(this.origin).dot(planeNormal) / denom;
        return t >= 0 ? this.at(t) : null;
    }

    intersectSphere(center, radius) {
        const oc = this.origin.clone().sub(center);
        const a = this.direction.dot(this.direction);
        const b = 2.0 * oc.dot(this.direction);
        const c = oc.dot(oc) - radius*radius;
        const discriminant = b*b - 4*a*c;
        if (discriminant < 0) return null;
        const t = (-b - Math.sqrt(discriminant)) / (2*a);
        return t >= 0 ? this.at(t) : null;
    }
}
