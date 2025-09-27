import { Vector3 } from '../core/math/Vector3.js';
import { ColorFactory } from '../core/math/Color/FullColorFactory.js';

export class Cube {
    constructor(size=1, color='cyan'){
        this.vertices = [
            // 12 triangles of cube
            -1,-1,1, 1,-1,1, 1,1,1, -1,-1,1, 1,1,1, -1,1,1,
            -1,-1,-1, -1,1,-1, 1,1,-1, -1,-1,-1, 1,1,-1, 1,-1,-1,
            -1,1,-1, -1,1,1, 1,1,1, -1,1,-1, 1,1,1, 1,1,-1,
            -1,-1,-1, 1,-1,-1, 1,-1,1, -1,-1,-1, 1,-1,1, -1,-1,1,
            1,-1,-1, 1,1,-1, 1,1,1, 1,-1,-1, 1,1,1, 1,-1,1,
            -1,-1,-1, -1,-1,1, -1,1,1, -1,-1,-1, -1,1,1, -1,1,-1
        ].map(v=>v*size/2);
        this.color = ColorFactory(color);

        // Flatten to Float32Array for WebGL
        this.buffer = null;
    }

    render(gl, camera, lights){
        if(!this.program){
            const vertexShaderSrc = `
                attribute vec3 aPosition;
                uniform mat4 uMVP;
                varying vec3 vPos;
                void main(){
                    vPos = aPosition;
                    gl_Position = uMVP * vec4(aPosition,1.0);
                }
            `;
            const fragmentShaderSrc = `
                precision mediump float;
                uniform vec3 uColor;
                uniform vec3 uLightPos;
                varying vec3 vPos;
                void main(){
                    vec3 lightDir = normalize(uLightPos - vPos);
                    float diff = max(dot(vec3(0,0,1), lightDir), 0.0);
                    gl_FragColor = vec4(uColor * diff,1.0);
                }
            `;
            this.program = gl.createProgram();
            const vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vertexShaderSrc);
            gl.compileShader(vs);
            const fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fragmentShaderSrc);
            gl.compileShader(fs);
            gl.attachShader(this.program, vs);
            gl.attachShader(this.program, fs);
            gl.linkProgram(this.program);

            // buffer
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        }

        gl.useProgram(this.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const aPosition = gl.getAttribLocation(this.program, 'aPosition');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,0,0);

        // uniform
        const uColor = gl.getUniformLocation(this.program,'uColor');
        gl.uniform3f(uColor,this.color.r,this.color.g,this.color.b);
        const uLightPos = gl.getUniformLocation(this.program,'uLightPos');
        if(lights.length>0){
            const lp = lights[0].position;
            gl.uniform3f(uLightPos,lp.x,lp.y,lp.z);
        } else {
            gl.uniform3f(uLightPos,0,0,5);
        }

        // MVP simplifikasi
        const uMVP = gl.getUniformLocation(this.program,'uMVP');
        const mvp = new Float32Array([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]);
        gl.uniformMatrix4fv(uMVP,false,mvp);

        gl.drawArrays(gl.TRIANGLES,0,this.vertices.length/3);
    }
}
