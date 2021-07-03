import * as THREE from "../three/build/three.module.js";
import * as TWEEN from "../tween/tween.esm.js"
export const addPortal = function (Scene) {
	const geom = new THREE.SphereBufferGeometry(7, 32, 32 );
	const mat = new THREE.MeshBasicMaterial( {color: 0xffff00,transparent:true, opacity:0.3, side: THREE.DoubleSide} );
	const portal = new THREE.Mesh( geom, mat);
	
	const geom2 = new THREE.PlaneBufferGeometry( 8, 4, 32 );
	const mat2 = new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( '/img/portal.jpg' ), side: THREE.DoubleSide} );
	const plano= new THREE.Mesh( geom2, mat2);

	let ppos = [
		[-72.26539441729798, 30.93752089850709],
		[66.3040720964083, 53.0993690774124],
		[111.23869091927719, 308.759332389478],
	]

	ppos.forEach( (p)=>{
		let pportal = portal.clone()
		let pplano = plano.clone()
		
		pportal.position.set(p[0], 3.5, p[1])
		pplano.position.set(p[0], 3.5, p[1])

		Scene.scene.add( pportal );
		Scene.scene.add( pplano);
	
		setInterval(function(){
			pplano.rotation.y += 1e-2
		},200)

	})
	Scene.spts =  ppos.map( (p) =>{
		let map; 
		if(detectMob()) {
			map = new THREE.TextureLoader().load( '/img/but-mob.png' );
		}else{
			map = new THREE.TextureLoader().load( '/img/but-pc.png' );
		}
		const material = new THREE.SpriteMaterial( { map: map } );

		const sprite = new THREE.Sprite( material );
		sprite.scale.x = 10

		sprite.position.set(p[0], 7, p[1])
		Scene.scene.add( sprite );
		return sprite
	})

        window.addEventListener("keyup", function(event){
                let key = event.key
                let lvl = Users.me.level
                let pos = Scene.camera.position

                if(key=="Enter" || key=="x" || key=="X"){
			let res = ppos.map( x=>{
				let vrtx = [
					[x[0]+7, x[1]+7],
					[x[0]+7, x[1]-7],
					[x[0]-7, x[1]-7],
					[x[0]-7, x[1]+7]
				]
				return inside([pos.x, pos.z], vrtx)
			})
			if(res.some(x => x)){
				window.location.href = "https://fiestasdezapote.glitch.me/zapote.html";
			}
                }
        })
	let timeout;
        let lastTap = 0;
        window.addEventListener('touchend', function(event) {
                if(document.querySelector(".chat-body").classList.contains("show")) return
                let currentTime = new Date().getTime();
                let tapLength = currentTime - lastTap;
                clearTimeout(timeout);
                if (tapLength < 500 && tapLength > 0) {

                let lvl = Users.me.level
                let pos = Scene.camera.position

                        let res = ppos.map( x=>{
                                let vrtx = [
                                        [x[0]+7, x[1]+7],
                                        [x[0]+7, x[1]-7],
                                        [x[0]-7, x[1]-7],
                                        [x[0]-7, x[1]+7]
                                ]
                                return inside([pos.x, pos.z], vrtx)
                        })
                        if(res.some(x => x)){
                                window.location.href = "https://fiestasdezapote.glitch.me/";
                        }

                        event.preventDefault();
                }else {
                        timeout = setTimeout(function() {
                                clearTimeout(timeout);
                        }, 500);
                }
                lastTap = currentTime;
        });


}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
