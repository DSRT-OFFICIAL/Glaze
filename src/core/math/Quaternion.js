export class Quaternion {
    constructor(x=0, y=0, z=0, w=1){
        this.x=x; this.y=y; this.z=z; this.w=w;
    }

    setFromEuler(euler){
        const c1=Math.cos(euler.x/2);
        const c2=Math.cos(euler.y/2);
        const c3=Math.cos(euler.z/2);
        const s1=Math.sin(euler.x/2);
        const s2=Math.sin(euler.y/2);
        const s3=Math.sin(euler.z/2);

        this.w = c1*c2*c3 - s1*s2*s3;
        this.x = s1*c2*c3 + c1*s2*s3;
        this.y = c1*s2*c3 - s1*c2*s3;
        this.z = c1*c2*s3 + s1*s2*c3;
        return this;
    }

    multiply(q){
        const x=this.x, y=this.y, z=this.z, w=this.w;
        const qx=q.x, qy=q.y, qz=q.z, qw=q.w;
        this.x = w*qx + x*qw + y*qz - z*qy;
        this.y = w*qy - x*qz + y*qw + z*qx;
        this.z = w*qz + x*qy - y*qx + z*qw;
        this.w = w*qw - x*qx - y*qy - z*qz;
        return this;
    }

    clone(){ return new Quaternion(this.x,this.y,this.z,this.w); }
}
