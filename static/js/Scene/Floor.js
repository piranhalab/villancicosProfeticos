import * as THREE from "../three/build/three.module.js";
export const addFloor = function (Scene) {
	let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 400, 400 );
                /*let wetfloorGeometry = new THREE.PlaneGeometry( 2000, 2000, 200, 200 );
                let pilaresMaterial = new THREE.MeshBasicMaterial( {
                        color: 0xffffff,
                        envMap: Scene.scene.background,
                        refractionRatio: 0.75
                });
*/
                floorGeometry.rotateX( - Math.PI / 2 );
    //            wetfloorGeometry.rotateX( - Math.PI / 2 );

                floorGeometry.computeVertexNormals();
                floorGeometry.computeFaceNormals();


                for (let i = 0; i < floorGeometry.vertices.length; i++) {
                        floorGeometry.vertices[i].y += (Math.random()*3)-3;
                }

                //var texture = new THREE.TextureLoader().load( 'img/texture.jpg' );

                //texture.wrapS = THREE.RepeatWrapping;
                //texture.wrapT = THREE.RepeatWrapping;


                var floorTexture = new THREE.TextureLoader().load( 'img/texture.jpg', function ( floorTexture ) {
                        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
                        floorTexture.offset.set( 0, 0 );
                        floorTexture.repeat.set( 4, 4 );
                });

                let floorMaterial = new THREE.MeshStandardMaterial( {
                        color: 0xffffff,
                        metalness: 0.5,
                        roughness: 0.85,
                        map: floorTexture,
                        //transparent: true,
                        //opacity: 0.75,
                });

                let floor = new THREE.Mesh( floorGeometry, floorMaterial );
       //         let wetfloor = new THREE.Mesh( wetfloorGeometry, pilaresMaterial);
	//	wetfloor.position.y = -4;
                floor.position.y = 0;

                Scene.scene.add( floor );
            // this.scene.add (wetfloor);
	return floor
};
