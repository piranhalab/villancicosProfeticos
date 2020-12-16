import * as THREE from "../three/build/three.module.js";

export const addZordon  = function(Scene){
		let zordonGeometry = new THREE.CylinderGeometry(30,30,27, 32, 1, true, 0, Math.PI );
                //let zordonTexture = new THREE.VideoTexture(  document.querySelector( '#streaming-video' ) );
                let zordonMaterial = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        //metalness: 0.2,
                        //roughness: 0.6,
                        //map: zordonTexture,
                        side: THREE.DoubleSide,
                        //castShadow: false,
                        //receiveShadow: false
                });

		zordonMaterial.name = "Screen"

                const zordonMesh = new THREE.Mesh(zordonGeometry, zordonMaterial);

                zordonMesh.position.z = 100;
                zordonMesh.position.y = 27/2;
                zordonMesh.rotation.y = Math.PI/2;

                Scene.scene.add( zordonMesh );
	return zordonMesh
}
