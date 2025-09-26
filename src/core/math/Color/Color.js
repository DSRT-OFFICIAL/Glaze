// Glaze/src/core/math/Color/Color.js
export class Color {

constructor(r = 1, g = 1, b = 1) {  
    if (typeof r === 'string') {  
        return this.setStyle(r);  
    } else if (r instanceof Color) {  
        return this.copy(r);  
    }  

    this.r = r;  
    this.g = g;  
    this.b = b;  
}  

// -----------------------  
// Set & get  
// -----------------------  
set(r, g, b) {  
    this.r = r;  
    this.g = g;  
    this.b = b;  
    return this;  
}  

copy(color) {  
    this.r = color.r;  
    this.g = color.g;  
    this.b = color.b;  
    return this;  
}  

clone() {  
    return new Color(this.r, this.g, this.b);  
}  

// -----------------------  
// Conversion  
// -----------------------  
setHex(hex) {  
    hex = Math.floor(hex);  
    this.r = ((hex >> 16) & 255) / 255;  
    this.g = ((hex >> 8) & 255) / 255;  
    this.b = (hex & 255) / 255;  
    return this;  
}  

getHex() {  
    return ((this.r * 255) << 16) ^ ((this.g * 255) << 8) ^ (this.b * 255);  
}  

setRGB(r, g, b) {  
    this.r = r;  
    this.g = g;  
    this.b = b;  
    return this;  
}  

setHSL(h, s, l) {  
    h = h % 1; // 0-1  
    s = Math.min(Math.max(s, 0), 1);  
    l = Math.min(Math.max(l, 0), 1);  

    if (s === 0) {  
        this.r = this.g = this.b = l; // achromatic  
    } else {  
        const hue2rgb = (p, q, t) => {  
            if (t < 0) t += 1;  
            if (t > 1) t -= 1;  
            if (t < 1/6) return p + (q - p) * 6 * t;  
            if (t < 1/2) return q;  
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;  
            return p;  
        };  

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;  
        const p = 2 * l - q;  

        this.r = hue2rgb(p, q, h + 1/3);  
        this.g = hue2rgb(p, q, h);  
        this.b = hue2rgb(p, q, h - 1/3);  
    }  
    return this;  
}  

getHSL() {  
    const r = this.r, g = this.g, b = this.b;  
    const max = Math.max(r, g, b);  
    const min = Math.min(r, g, b);  
    let h, s;  
    const l = (max + min) / 2;  

    if (max === min) {  
        h = s = 0; // achromatic  
    } else {  
        const d = max - min;  
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);  
        switch (max) {  
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;  
            case g: h = (b - r) / d + 2; break;  
            case b: h = (r - g) / d + 4; break;  
        }  
        h /= 6;  
    }  

    return { h, s, l };  
}  

setStyle(style) {  
    const hexColors = {  
        black: 0x000000,  
        white: 0xffffff,  
        red: 0xff0000,  
        green: 0x00ff00,  
        blue: 0x0000ff,  
        cyan: 0x00ffff,  
        magenta: 0xff00ff,  
        yellow: 0xffff00,  
        orange: 0xff8800,  
        brown: 0x885522,  
        purple: 0x800080,  
        pink: 0xffc0cb,  
        gray: 0x808080  
    };  

    if (hexColors[style.toLowerCase()]) {  
        this.setHex(hexColors[style.toLowerCase()]);  
    } else if (style.startsWith('#')) {  
        this.setHex(parseInt(style.slice(1), 16));  
    }  

    return this;  
}  

// -----------------------  
// Operations  
// -----------------------  
add(color) {  
    this.r += color.r;  
    this.g += color.g;  
    this.b += color.b;  
    return this;  
}  

multiply(color) {  
    this.r *= color.r;  
    this.g *= color.g;  
    this.b *= color.b;  
    return this;  
}  

lerp(color, alpha) {  
    this.r += (color.r - this.r) * alpha;  
    this.g += (color.g - this.g) * alpha;  
    this.b += (color.b - this.b) * alpha;  
    return this;  
}  

mix(color, alpha = 0.5) {  
    return this.lerp(color, alpha);  
}  

// -----------------------  
// Utility  
// -----------------------  
toString() {  
    return `rgb(${Math.round(this.r*255)}, ${Math.round(this.g*255)}, ${Math.round(this.b*255)})`;  
}  

    }

