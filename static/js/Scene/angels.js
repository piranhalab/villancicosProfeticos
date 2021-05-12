import * as THREE from "../three/build/three.module.js";
import * as TWEEN from "../tween/tween.esm.js"
export const addAngels= function (Scene) {
	const mat = new THREE.SpriteMaterial( {map: new THREE.TextureLoader().load( '/img/angel.png' ), side: THREE.DoubleSide, transparent: true} );
	const ang = new THREE.Sprite( mat );
	
	window.TWEEN = TWEEN
	let angels = [
		[ -11.672324360683733, 140, 252.1108643849011,30],
		[ -14.086765604937918,  5, 3.2105417306031505, 7],
		[ -14.086765604937918,  5, 3.2105417306031505, 7],
	]
	angels = angels.map( p => {
		let angel = ang.clone()
		angel.position.set(p[0],p[1],p[2])
		angel.scale.setScalar(p[3])
		Scene.scene.add(angel)
		return angel
	})

                let map;
                if(detectMob()) {
                        map = new THREE.TextureLoader().load( '/img/but-mob.png' );
                }else{
                        map = new THREE.TextureLoader().load( '/img/but-pc.png' );
                }
                const material = new THREE.SpriteMaterial( { map: map } );

                const sprite = new THREE.Sprite( material );
                sprite.scale.x = 10

		sprite.position.set( -15.329134808540905, 7, 200.1092130221404)
		sprite.material.opacity = 0
                Scene.scene.add( sprite );


	let flag = false
	let regalo = false
	let choo
	function alarm(){
		let time = new Date().getUTCMinutes()
		if(time % 2 == 0){
			if( ! flag){
				flag = true
				bajar_del_pino()
			}
		}else{
			flag = false
			regalo = false
		}
		requestAnimationFrame(alarm)
	}

	function update(){
		TWEEN.update()
		requestAnimationFrame(update)
	}

	function bajar_del_pino(){
		let angPino = angels[0]
		let interp1 = new TWEEN.Tween(angPino.position)
		.to( {x: -15.329134808540905, y: 1.6999999999972453, z: 200.1092130221404}, 10000)
		.onUpdate(function(v){
			angels[0].position.set(v.x, v.y, v.z)
		})
		.onComplete(function(){
			let rx = ponerRegalo(Scene)
			choo = rx[1]
			regalo = true
			sprite.material.opacity = 1
			setTimeout(function(){
				rx[0].geometry.dispose()
				rx[0].material.dispose()
				Scene.scene.remove(rx[0])
				Scene.renderer.renderLists.dispose();
				regalo = false
				sprite.material.opacity = 0

			},15000)
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		
		let interp2 = new TWEEN.Tween(angPino.position)
		.to({x:-11.672324360683733, y: 140, z: 252.1108643849011}, 10000)
		.onUpdate(function(v){
			angels[0].position.set(v.x, v.y, v.z)
		})
		.easing(TWEEN.Easing.Quadratic.Out)


		interp1.chain(interp2).start()
			/*.onComplete(function(){
			setTimeOut(()=>{
				new TWEEN.Tween(angPino.position).to({x:-11.672324360683733, y: 140, z: 252.1108643849011}, 10000)
				.onUpdate(function(v){
					angels[0].position.set(v.x, v.y, v.z)
				}).start()
			},1000)
		})
		*/
		.easing(TWEEN.Easing.Quadratic.Out)
	}
	console.debug(bajar_del_pino)

	let ppos = [
		[-15.329134808540905,  200.1092130221404]
	]
	window.addEventListener("keyup", function(event){
		if(!regalo) return
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
				window.open(choo);
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
				window.open(choo);
                        }

                        event.preventDefault();
                }else {
                        timeout = setTimeout(function() {
                                clearTimeout(timeout);
                        }, 500);
                }
                lastTap = currentTime;
        });


	update()
	alarm()
}

let chefs = [
"/img/chef/136069-1413268443609.jpg",
"/img/chef/136070-1413268443359.jpg",
"/img/chef/136071-1413268443395.jpg",
"/img/chef/136072-1413268443319.jpg",
"/img/chef/136073-1413268443186.jpg",
"/img/chef/136074-1413268443076.jpg",
"/img/chef/136075-1413268442866.jpg",
"/img/chef/136076-1413268443125.jpg",
"/img/chef/136078-1413268442652.jpg",
"/img/chef/136080-1413268442596.jpg",
"/img/chef/136083-1413268442479.jpg",
"/img/chef/136085-1413268442321.jpg",
"/img/chef/136088-1413268441977.jpg",
"/img/chef/136090-1413268441723.jpg",
"/img/chef/136092-1413268441603.jpg",
"/img/chef/136094-1413268441554.jpg",
"/img/chef/136097-1413268441265.jpg"
]
let chefs2 = []

function ponerRegalo(Scene){
	if(chefs.length == 0){
		chefs = new Array(...chefs2)
		chefs2 = []
	}
	let choo = chefs.pop()
	chefs2.push(choo)
	const geom = new THREE.SphereBufferGeometry( 5, 32, 32 );
	const mat = new THREE.MeshBasicMaterial( {color: 0x8050F0, side: THREE.DoubleSide, transparent: true, opacity: 0.8});
	const regalo = new THREE.Mesh( geom, mat );

	regalo.position.set( -15.329134808540905, 1.6999999999972453, 200.1092130221404)
	Scene.scene.add( regalo )
	return [regalo, choo]
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
shuffle(chefs)


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
