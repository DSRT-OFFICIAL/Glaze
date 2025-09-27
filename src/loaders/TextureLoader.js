export class TextureLoader {
    constructor() {}

    load(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = url;
        });
    }
}
