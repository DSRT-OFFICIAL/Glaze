import { Vector3 } from '../core/math/Vector3.js';

export class OrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement || window;

        this.target = new Vector3(0, 0, 0);

        // Sensitivitas
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.2;
        this.panSpeed = 0.3;

        // Internal state
        this.state = null;
        this.prevMouse = { x: 0, y: 0 };

        this._bindEvents();
    }

    _bindEvents() {
        this.domElement.addEventListener('mousedown', (e) => this._onMouseDown(e));
        this.domElement.addEventListener('wheel', (e) => this._onMouseWheel(e));
    }

    _onMouseDown(event) {
        event.preventDefault();
        this.state = 'rotate';
        this.prevMouse.x = event.clientX;
        this.prevMouse.y = event.clientY;

        const moveHandler = (e) => this._onMouseMove(e);
        const upHandler = (e) => {
            this.state = null;
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
    }

    _onMouseMove(event) {
        if (this.state !== 'rotate') return;

        const dx = (event.clientX - this.prevMouse.x) * 0.005 * this.rotateSpeed;
        const dy = (event.clientY - this.prevMouse.y) * 0.005 * this.rotateSpeed;

        this.rotate(dx, dy);

        this.prevMouse.x = event.clientX;
        this.prevMouse.y = event.clientY;
    }

    _onMouseWheel(event) {
        const delta = event.deltaY * 0.001 * this.zoomSpeed;
        this.zoom(delta);
    }

    rotate(dx, dy) {
        // Simplified orbit rotation around target
        const offset = this.camera.position.clone().sub(this.target);
        const spherical = this._cartesianToSpherical(offset);

        spherical.theta -= dx;
        spherical.phi -= dy;
        spherical.phi = Math.max(0.01, Math.min(Math.PI - 0.01, spherical.phi));

        const newPos = this._sphericalToCartesian(spherical).add(this.target);
        this.camera.position.set(newPos.x, newPos.y, newPos.z);
        this.camera.lookAt(this.target);
    }

    zoom(delta) {
        const offset = this.camera.position.clone().sub(this.target);
        offset.multiplyScalar(1 + delta);
        const newPos = offset.add(this.target);
        this.camera.position.set(newPos.x, newPos.y, newPos.z);
    }

    _cartesianToSpherical(v) {
        const r = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
        const theta = Math.atan2(v.x, v.z);
        const phi = Math.acos(v.y / r);
        return { r, theta, phi };
    }

    _sphericalToCartesian(s) {
        const sinPhi = Math.sin(s.phi);
        return new Vector3(
            s.r * sinPhi * Math.sin(s.theta),
            s.r * Math.cos(s.phi),
            s.r * sinPhi * Math.cos(s.theta)
        );
    }
}
