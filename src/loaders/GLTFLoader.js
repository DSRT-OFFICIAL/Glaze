export class GLTFLoader {
    constructor() {}

    async load(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to load ${url}`);
            const data = await res.json();
            // Sederhana: hanya parsing basic nodes
            return this.parse(data);
        } catch (err) {
            console.error('GLTFLoader error:', err);
            return null;
        }
    }

    parse(gltf) {
        // Contoh sederhana: parsing mesh, materials
        const meshes = [];
        if (gltf.meshes) {
            for (const mesh of gltf.meshes) {
                meshes.push({
                    name: mesh.name,
                    primitives: mesh.primitives
                });
            }
        }
        return { scenes: gltf.scenes || [], meshes };
    }
}
