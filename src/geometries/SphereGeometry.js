export class SphereGeometry {
    constructor(radius=1, widthSegments=16, heightSegments=12){
        this.radius = radius;
        this.widthSegments = Math.max(3, Math.floor(widthSegments));
        this.heightSegments = Math.max(2, Math.floor(heightSegments));

        this.vertices = [];
        this.faces = [];
        this.generate();
    }

    generate(){
        for(let y=0;y<=this.heightSegments;y++){
            const v = y/this.heightSegments;
            const theta = v * Math.PI;
            for(let x=0;x<=this.widthSegments;x++){
                const u = x/this.widthSegments;
                const phi = u * 2 * Math.PI;

                const px = -this.radius * Math.cos(phi) * Math.sin(theta);
                const py = this.radius * Math.cos(theta);
                const pz = this.radius * Math.sin(phi) * Math.sin(theta);
                this.vertices.push([px, py, pz]);
            }
        }

        for(let y=0;y<this.heightSegments;y++){
            for(let x=0;x<this.widthSegments;x++){
                const a = (this.widthSegments+1)*y + x;
                const b = a + this.widthSegments +1;
                this.faces.push([a, b, b+1, a+1]);
            }
        }
    }
}
