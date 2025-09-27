export class Vector3 {
    constructor(x=0, y=0, z=0) { this.x = x; this.y = y; this.z = z; }

    set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
    copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
    clone() { return new Vector3(this.x, this.y, this.z); }

    add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
    sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
    multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
    divideScalar(s) { if(s!==0){ this.x/=s; this.y/=s; this.z/=s; } return this; }

    dot(v) { return this.x*v.x + this.y*v.y + this.z*v.z; }
    cross(v) { 
        return new Vector3(
            this.y*v.z - this.z*v.y,
            this.z*v.x - this.x*v.z,
            this.x*v.y - this.y*v.x
        ); 
    }

    length() { return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z); }
    normalize() { let l=this.length(); return l>0 ? this.divideScalar(l) : this; }
}
