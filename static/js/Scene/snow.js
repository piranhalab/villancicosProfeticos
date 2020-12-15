import * as THREE from "../three/build/three.module.js";
export const addSnow = function (Scene) {

	const vertices = [];

for ( let i = 0; i < 10000; i ++ ) {

	const x = THREE.MathUtils.randFloatSpread( 500 );
	const y = THREE.MathUtils.randFloatSpread( 50 );
	const z = THREE.MathUtils.randFloatSpread( 500 );

	vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial( { color: 0xffffff, size:0.5} );

const points = new THREE.Points( geometry, material );
points.position.y = 10

Scene.scene.add( points );
return points
}
