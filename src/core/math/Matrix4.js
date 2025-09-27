export class Matrix4 {
    constructor(){
        this.elements = new Float32Array(16);
        this.identity();
    }

    identity(){
        const e = this.elements;
        e[0]=1; e[4]=0; e[8]=0; e[12]=0;
        e[1]=0; e[5]=1; e[9]=0; e[13]=0;
        e[2]=0; e[6]=0; e[10]=1; e[14]=0;
        e[3]=0; e[7]=0; e[11]=0; e[15]=1;
        return this;
    }

    multiply(m){
        const ae = this.elements;
        const be = m.elements;
        const te = new Float32Array(16);

        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                te[i*4+j] = ae[i*4+0]*be[0*4+j]+ae[i*4+1]*be[1*4+j]+
                            ae[i*4+2]*be[2*4+j]+ae[i*4+3]*be[3*4+j];
            }
        }
        this.elements = te;
        return this;
    }

    clone(){
        const m = new Matrix4();
        m.elements.set(this.elements);
        return m;
    }
}
