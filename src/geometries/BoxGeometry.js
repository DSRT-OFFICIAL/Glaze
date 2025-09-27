export class BoxGeometry {
    constructor(width=1, height=1, depth=1) {
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.vertices = [];
        this.faces = [];
        this.generate();
    }

    generate() {
        const w = this.width/2, h = this.height/2, d = this.depth/2;
        this.vertices = [
            [-w, -h,  d], [ w, -h,  d], [ w,  h,  d], [-w,  h,  d], // front
            [-w, -h, -d], [-w,  h, -d], [ w,  h, -d], [ w, -h, -d], // back
            [-w,  h, -d], [-w,  h,  d], [ w,  h,  d], [ w,  h, -d], // top
            [-w, -h, -d], [ w, -h, -d], [ w, -h,  d], [-w, -h,  d], // bottom
            [ w, -h, -d], [ w,  h, -d], [ w,  h,  d], [ w, -h,  d], // right
            [-w, -h, -d], [-w, -h,  d], [-w,  h,  d], [-w,  h, -d]  // left
        ];

        this.faces = [
            [0,1,2,3],[4,5,6,7],[8,9,10,11],
            [12,13,14,15],[16,17,18,19],[20,21,22,23]
        ];
    }
}
