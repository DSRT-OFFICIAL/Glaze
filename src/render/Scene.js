export class Scene {
    constructor(){
        this.objects = [];
        this.lights = [];
    }

    add(object){
        if(object.isLight) this.lights.push(object);
        else this.objects.push(object);
    }

    remove(object){
        this.objects = this.objects.filter(o=>o!==object);
        this.lights = this.lights.filter(l=>l!==object);
    }
}
