import * as THREE from "../three/build/three.module.js";
import {Fire} from "../three/examples/jsm/objects/Fire.js";

export const addFire = function(Scene){
	let clock = new THREE.Clock();

        let fireLoader = new THREE.TextureLoader();
        //fireLoader.crossOrigin = '';

        let fireTex = fireLoader.load("/img/mor.png");

            let wireframeMat = new THREE.MeshBasicMaterial({
                color : new THREE.Color(0xffffff),
                wireframe : true
            });

	let fire = new Fire(fireTex);

        var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
        fire.add(wireframe);
        wireframe.visible = true;
        wireframe.visible = false;

        console.info(fire);
        //this.fire.position.set(0, 0, 0);
        fire.position.y = 160;
        fire.position.x = -200;
        fire.scale.x = 180;
        fire.scale.y = 300;
        fire.scale.z = 180;

        fire.matrixWorldNeedsUpdate = true;

        Scene.scene.add(fire);

        let fire2 = new Fire(fireTex);

        var wireframe = new THREE.Mesh(fire2.geometry, wireframeMat.clone());
        fire2.add(wireframe);
        wireframe.visible = true;
        wireframe.visible = false;

        console.log(fire2);
        //this.fire.position.set(0, 0, 0);
        fire2.position.y = 160;
        fire2.position.x = 200;
        fire2.scale.x = 180;
        fire2.scale.y = 300;
        fire2.scale.z = 180;

        fire2.matrixWorldNeedsUpdate = true;

        Scene.scene.add(fire2);


}
