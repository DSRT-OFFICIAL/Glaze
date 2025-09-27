import { ColorFactory } from '../core/math/Color/FullColorFactory.js';
import { Vector3 } from '../core/math/Vector3.js';

export class WebGLRenderer {
    constructor({canvas}) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        if(!this.gl) throw new Error('WebGL not supported');

        this.scene = null;
        this.camera = null;
    }

    setScene(scene){ this.scene = scene; }
    setCamera(camera){ this.camera = camera; }

    compileShader(src, type){
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            console.error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    createProgram(vertexSrc, fragmentSrc){
        const gl = this.gl;
        const vs = this.compileShader(vertexSrc, gl.VERTEX_SHADER);
        const fs = this.compileShader(fragmentSrc, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.error(gl.getProgramInfoLog(program));
        }
        return program;
    }

    render(){
        if(!this.scene || !this.camera) return;
        const gl = this.gl;
        gl.viewport(0,0,this.canvas.width,this.canvas.height);
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        for(const obj of this.scene.objects){
            obj.render(gl, this.camera, this.scene.lights);
        }
    }
}
