// Glaze/src/core/math/Color/Color.js
export class Color {
    constructor(r = 1, g = 1, b = 1, a = 1) {
        if (r instanceof Color) return this.copy(r);
        if (typeof r === 'string') return this.setStyle(r);

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    // ==============================
    // Setters
    // ==============================
    set(r, g, b, a = this.a) {
        this.r = r; this.g = g; this.b = b; this.a = a;
        return this;
    }

    setRGB(r, g, b, a = this.a) { return this.set(r, g, b, a); }
    setHex(hex, a = this.a) {
        this.r = ((hex >> 16) & 255) / 255;
        this.g = ((hex >> 8) & 255) / 255;
        this.b = (hex & 255) / 255;
        this.a = a;
        return this;
    }

    copy(c) {
        this.r = c.r; this.g = c.g; this.b = c.b; this.a = c.a;
        return this;
    }

    clone() { return new Color(this.r, this.g, this.b, this.a); }

    // ==============================
    // Getters
    // ==============================
    getHex() { return ((this.r*255)<<16)|((this.g*255)<<8)|(this.b*255); }
    getHexString() { return `#${this.getHex().toString(16).padStart(6,'0')}`; }
    toArray(includeAlpha=false) { return includeAlpha?[this.r,this.g,this.b,this.a]:[this.r,this.g,this.b]; }
    toString() { return `Color(r=${this.r.toFixed(3)},g=${this.g.toFixed(3)},b=${this.b.toFixed(3)},a=${this.a.toFixed(3)})`; }

    // ==============================
    // Operations
    // ==============================
    add(c) { this.r+=c.r; this.g+=c.g; this.b+=c.b; return this; }
    multiply(c){ this.r*=c.r; this.g*=c.g; this.b*=c.b; return this; }
    lerp(c, alpha){ this.r+=(c.r-this.r)*alpha; this.g+=(c.g-this.g)*alpha; this.b+=(c.b-this.b)*alpha; this.a+=(c.a-this.a)*alpha; return this; }
    equals(c, eps=1e-6){ return Math.abs(this.r-c.r)<eps && Math.abs(this.g-c.g)<eps && Math.abs(this.b-c.b)<eps && Math.abs(this.a-c.a)<eps; }

    // ==============================
    // Utility
    // ==============================
    setStyle(style){
        const hexColors = {
            black:0x000000,white:0xffffff,red:0xff0000,green:0x00ff00,blue:0x0000ff,
            cyan:0x00ffff,magenta:0xff00ff,yellow:0xffff00,orange:0xff8800,brown:0x885522,
            purple:0x800080,pink:0xffc0cb,gray:0x808080
        };
        if(hexColors[style.toLowerCase()]) this.setHex(hexColors[style.toLowerCase()]);
        else if(style.startsWith('#')) this.setHex(parseInt(style.slice(1),16));
        return this;
    }
}
