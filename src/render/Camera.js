import { Vector3 } from '../core/math/Vector3.js';

export class Camera {
    constructor(fov=60, aspect=1, near=0.1, far=100){
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.position = new Vector3(0,0,5);
        this.target = new Vector3(0,0,0);
    }

    lookAt(target){
        this.target = target;
    }
}
