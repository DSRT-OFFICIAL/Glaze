export class PlaneGeometry {
    constructor(width=1, height=1, widthSegments=1, heightSegments=1){
        this.width = width;
        this.height = height;
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;

        this.vertices = [];
        this.faces = [];
        this.generate();
    }

    generate(){
        const wStep = this.width / this.widthSegments;
        const hStep = this.height / this.heightSegments;
        for(let i=0;i<=this.heightSegments;i++){
            for(let j=0;j<=this.widthSegments;j++){
                const x = j*wStep - this.width/2;
                const y = i*hStep - this.height/2;
                this.vertices.push([x, -y, 0]);
            }
        }

        for(let i=0;i<this.heightSegments;i++){
            for(let j=0;j<this.widthSegments;j++){
                const a = i*(this.widthSegments+1)+j;
                const b = a+this.widthSegments+1;
                this.faces.push([a,b,b+1,a+1]);
            }
        }
    }
}
