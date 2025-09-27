import { Vector3 } from '../core/math/Vector3.js';
import { ColorFactory } from '../core/math/Color/FullColorFactory.js';

export class PointLight {
    constructor(color='white', intensity=1, position=new Vector3(0,0,0)) {
        this.color = ColorFactory(color);
        this.intensity = intensity;
        this.position = position.clone();
    }

    setPosition(x,y,z){
        this.position.set(x,y,z);
        return this;
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
