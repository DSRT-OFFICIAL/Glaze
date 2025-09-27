import { Vector3 } from '../core/math/Vector3.js';
import { ColorFactory } from '../core/math/Color/FullColorFactory.js';

export class DirectionalLight {
    constructor(color='white', intensity=1, direction=new Vector3(0,-1,0)){
        this.color = ColorFactory(color);
        this.intensity = intensity;
        this.direction = direction.clone().normalize();
    }

    setDirection(x,y,z){
        this.direction.set(x,y,z).normalize();
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
