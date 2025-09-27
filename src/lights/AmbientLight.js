import { ColorFactory } from '../core/math/Color/FullColorFactory.js';

export class AmbientLight {
    constructor(color='white', intensity=1){
        this.color = ColorFactory(color);
        this.intensity = intensity;
    }

    setColor(color){
        this.color = ColorFactory(color);
        return this;
    }

    setIntensity(intensity){
        this.intensity = intensity;
        return this;
    }
}
